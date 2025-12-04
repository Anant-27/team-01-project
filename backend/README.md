# AutoCad Python Backend

## Install dependencies

```bash
cd backend_py
pip install -r requirements.txt
```

## Run backend

```bash
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend URL: `http://localhost:8000`

Endpoint:

- `POST /api/data/upload` — accepts CSV/XLSX `file` and returns:
  - `columns`
  - `suggested_charts`
  - `filterable_fields`
  - `data`