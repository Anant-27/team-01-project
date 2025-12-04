# AutoCad – Python Backend + React Frontend (No Auth)

This is the same AutoCad automated dashboard project, but using a **Python FastAPI**
backend instead of Node/Express. Frontend remains React + Vite + Recharts, with:

- Navbar (AutoCad, Home, Upload, About, Logout label)
- Landing page (hero)
- Upload page with sidebar and drag & drop
- About page with your team
- No authentication — everything is open

## 1. Backend (Python) – how to run

```bash
cd backend_py
pip install -r requirements.txt
uvicorn main:app --reload --host 0.0.0.0 --port 8000
```

Backend runs at: `http://localhost:8000`

Endpoint used by frontend:

- `POST /api/data/upload` — accepts Excel/CSV file as `file` in form-data

## 2. Frontend (React) – how to run

```bash
cd frontend
npm install
npm run dev
```

Frontend runs at: `http://localhost:5173`

Make sure the backend is running first, then open the frontend URL in your browser.

## 3. Team structure

Frontend components are split so each of the 5 teammates can own an area:

- Navbar & layout → `src/components/Navbar.jsx`, `src/App.jsx`
- Landing page → `src/pages/HomePage.jsx`, `src/components/Hero.jsx`
- Dashboard & upload → `src/pages/DashboardPage.jsx`, `src/components/UploadCard.jsx`, `src/components/FilterSidebar.jsx`
- Charts → `src/components/ChartGrid.jsx`, `src/components/ChartWrapper.jsx`
- About page → `src/pages/AboutPage.jsx`