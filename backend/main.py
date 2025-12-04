from fastapi import FastAPI, UploadFile, File, HTTPException
from fastapi.middleware.cors import CORSMiddleware
import pandas as pd
import io
from typing import List, Dict, Any

app = FastAPI(
    title="AutoCad Backend (Python)",
    description="Python FastAPI backend for auto dashboard (no auth)",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # for dev; restrict in prod
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


def infer_column_type(series: pd.Series) -> str:
    s = series.dropna()
    if s.empty:
        return "text"

    # numeric first
    numeric_ratio = pd.to_numeric(s, errors="coerce").notna().mean()
    if numeric_ratio > 0.9:
        return "number"

    # date detection
    parsed = pd.to_datetime(s, errors="coerce", infer_datetime_format=True)
    date_ratio = parsed.notna().mean()
    if date_ratio > 0.8:
        return "date"

    # category detection
    unique_ratio = s.nunique() / len(s)
    if unique_ratio < 0.5 and s.nunique() < 100:
        return "category"

    return "text"


def suggest_charts(schema: List[Dict[str, Any]]) -> List[Dict[str, Any]]:
    date_cols = [c["name"] for c in schema if c["type"] == "date"]
    num_cols = [c["name"] for c in schema if c["type"] == "number"]
    cat_cols = [c["name"] for c in schema if c["type"] == "category"]

    charts: List[Dict[str, Any]] = []
    cid = 1

    if date_cols and num_cols:
        charts.append({
            "id": f"chart_{cid}",
            "title": f"{num_cols[0]} over time",
            "type": "line",
            "xField": date_cols[0],
            "yField": num_cols[0],
            "aggregation": "sum",
        })
        cid += 1

    for cat in cat_cols[:2]:
        if num_cols:
            charts.append({
                "id": f"chart_{cid}",
                "title": f"{num_cols[0]} by {cat}",
                "type": "bar",
                "xField": cat,
                "yField": num_cols[0],
                "aggregation": "sum",
            })
            cid += 1

    if cat_cols and num_cols:
        charts.append({
            "id": f"chart_{cid}",
            "title": f"{num_cols[0]} share by {cat_cols[0]}",
            "type": "pie",
            "labelField": cat_cols[0],
            "valueField": num_cols[0],
            "aggregation": "sum",
        })

    return charts


@app.get("/")
def root():
    return {"status": "ok", "message": "AutoCad Python backend running"}


@app.post("/api/data/upload")
async def upload_data(file: UploadFile = File(...)):
    try:
        content = await file.read()
        if not content:
            raise HTTPException(status_code=400, detail="Empty file")

        filename = file.filename.lower()

        if filename.endswith(".csv"):
            df = pd.read_csv(io.BytesIO(content))
        elif filename.endswith(".xlsx") or filename.endswith(".xls"):
            df = pd.read_excel(io.BytesIO(content))
        else:
            # try CSV as fallback
            try:
                df = pd.read_csv(io.BytesIO(content))
            except Exception:
                raise HTTPException(status_code=400, detail="Unsupported file format")

        df = df.dropna(how="all")
        if df.empty:
            raise HTTPException(status_code=400, detail="No data rows found in file")

        schema = []
        for col in df.columns:
            col_type = infer_column_type(df[col])
            schema.append({"name": col, "type": col_type})

        filterable_fields = [
            col for col in schema if col["type"] in ("category", "date")
        ]
        charts = suggest_charts(schema)
        records = df.to_dict(orient="records")

        return {
            "columns": schema,
            "suggested_charts": charts,
            "filterable_fields": filterable_fields,
            "data": records,
        }
    except HTTPException:
        raise
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Error processing file: {e}")
