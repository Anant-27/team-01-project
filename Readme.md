👤 1. KANISHKA — Project Layout, Routing & Navbar (LEAD UI STRUCTURE)
You own (only these):
src/main.jsx
src/pages/App.jsx
src/components/Navbar.jsx
src/pages/styles.css   (global layout styles)

Your responsibilities:

Add React Router to project

Define all routes:

/ → HomePage

/dashboard → DashboardPage

/about → AboutPage

Build and style the Navbar

Maintain global layout, spacing, colors, fonts

Ensure every page is reachable and well-structured

Components you integrate:

<Navbar />

<Outlet /> or <Routes />

👤 2. DIVYA RAJ VARSHNEY — Dashboard Logic (Core Functionality)
You own:
src/pages/DashboardPage.jsx
src/components/UploadCard.jsx (only file upload handling)

Your responsibilities:

Backend → Frontend data pipeline:

✔ Choose API base:

API_BASE = "http://localhost:8000"


✔ When a file is uploaded:

Send file to:

POST /api/data/upload


(using axios + multipart form)

✔ Save backend response into state:

schema

filterableFields

charts

data (rawData)

✔ Apply filters (Rinki’s component output)
✔ Pass filtered data to ChartGrid

You integrate components:

<UploadCard />

<FilterSidebar />

<ChartGrid />

👤 3. RINKI JHA — Filters + Sidebar UX (FILTER ENGINE)
You own:
src/components/FilterSidebar.jsx

Your responsibilities:

Build filtering UI for:

✔ Category fields → checkbox filters
✔ Date fields → From / To
✔ Call:

onChange(updatedFilters)

Filter structure you define:
filters = {
    categoryField1: ["A", "B"],
    categoryField2: ["X"],
    dateField: { from: "...", to: "..." }
}

Collaboration with Divya:

You output filters

Divya applies them to data

👤 4. AMAN KHUSHWAH — Home Page + About Page + Branding
You own:
src/pages/HomePage.jsx
src/pages/AboutPage.jsx
src/components/Hero.jsx
src/pages/styles.css   (only your section styles)

Your responsibilities:
Home Page

✔ Big hero title
✔ Subheading
✔ Buttons:

“Get started” → /dashboard

“Meet the team” → /about

About Page

Include:

Project mission

Team list:

Kanishka

Divya Raj Varshney

Rinki Jha

Anant

Aman Khushwah

Logo placeholder

Clean layout

Branding

Maintain color theme consistency

Make landing page visually attractive

👤 5. ANANT SETH — Charts & Visualization + Backend (Optional)
Frontend (Charts) — Your Ownership:
src/components/ChartWrapper.jsx
src/components/ChartGrid.jsx

Your responsibilities:

Use Recharts to render charts based on:

chart.type = "bar" | "line" | "pie"
chart.x_field
chart.y_field


✔ Build ChartWrapper
✔ Aggregate data by:

groupBy

date grouping

summation

✔ ChartGrid → loop through all charts, show in cards

🟢 Backend_py (Python) — If you also own it
backend_py/main.py
backend_py/requirements.txt

Backend Provides API:

/api/data/upload → handles file upload

/api/data/schema → returns table headers

/api/data/charts → returns chart suggestions

🔥 COLLABORATION RULES (FINAL SETUP)
Branches
kanishka/layout
divya/dashboard
rinki/filters
aman/landing
anant/charts
backend/kanishka or backend/anant

Rules
