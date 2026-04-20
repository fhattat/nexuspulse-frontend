# NexusPulse AI — Frontend

<div align="center">

![React](https://img.shields.io/badge/React-18-61DAFB?style=flat&logo=react&logoColor=black)
![Vite](https://img.shields.io/badge/Vite-6-646CFF?style=flat&logo=vite&logoColor=white)
![Tailwind](https://img.shields.io/badge/Tailwind-4-06B6D4?style=flat&logo=tailwindcss&logoColor=white)
![Plotly](https://img.shields.io/badge/Plotly.js-5-3F4F75?style=flat)
![Vercel](https://img.shields.io/badge/Deploy-Vercel-000000?style=flat&logo=vercel&logoColor=white)

**React dashboard for NexusPulse AI — E-Commerce Analytics Platform**

[Live App](https://nexuspulse-frontend.vercel.app) · [Backend Repo](https://github.com/fhattat/nexuspulse-backend)

</div>

---

## Overview

NexusPulse AI Frontend is a dark-themed React dashboard that connects to the NexusPulse AI backend. Users can upload e-commerce CSV datasets, ask natural language questions, and receive instant analysis with interactive Plotly visualizations — all in a clean, responsive chat interface.

## Features

- **Drag & Drop Upload** — CSV, PDF, and XLSX support
- **AI Chat Interface** — Natural language queries with suggested prompts
- **Inline Visualizations** — Interactive Plotly charts rendered inside chat messages
- **KPI Cards** — Key metrics displayed alongside analysis results
- **New Chat** — Reset conversation while keeping the active session
- **Dark Theme** — Navy/coral color scheme with DM Sans typography

## Tech Stack

| Technology | Version | Purpose |
|---|---|---|
| React | 18 | UI framework |
| Vite | 6 | Build tool & dev server |
| Tailwind CSS | 4 | Styling |
| react-plotly.js | 2 | Interactive charts |
| react-dropzone | 14 | File upload |
| lucide-react | 0.468 | Icons |
| axios | 1.7 | API client |

## Project Structure

```
nexuspulse-frontend/
├── index.html
├── vite.config.js          # Vite config + API proxy
├── vercel.json             # Vercel deploy + API rewrites
├── package.json
└── src/
    ├── App.jsx              # Main app + routing + state
    ├── main.jsx             # React entry point
    ├── index.css            # Tailwind + custom styles
    ├── services/
    │   └── api.js           # Axios instance + all endpoints
    ├── components/
    │   ├── layout/
    │   │   ├── Sidebar.jsx  # Navigation + session info + New Chat
    │   │   └── Header.jsx   # Page title + user avatar
    │   ├── upload/
    │   │   └── FileUploader.jsx  # Drag & drop with status states
    │   ├── chat/
    │   │   └── ChatPanel.jsx     # Chat UI + message bubbles
    │   └── dashboard/
    │       ├── KPICard.jsx       # Metric card with trend indicator
    │       └── ChartContainer.jsx # Plotly dark-themed wrapper
    └── pages/
        ├── UploadPage.jsx   # File upload page
        └── DashboardPage.jsx # Chat/dashboard page
```

## Local Development

```bash
git clone https://github.com/fhattat/nexuspulse-frontend
cd nexuspulse-frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`. The Vite proxy forwards `/api/*` requests to the backend at `http://localhost:8000`.

**Prerequisites:** Backend must be running at port 8000. See [nexuspulse-backend](https://github.com/fhattat/nexuspulse-backend).

## User Flow

```
1. Upload         Drop CSV file on upload page
      │
      ▼
2. Auto-navigate  Chat page opens with active session
      │
      ▼
3. Ask questions  Click suggested queries or type your own
      │
      ▼
4. Get insights   Text analysis + KPI cards + Plotly charts inline
      │
      ▼
5. New Chat       Reset conversation, keep session, ask more
```

## Suggested Queries

The chat interface includes 6 preset queries:

- Generate an executive summary for this dataset
- Which product category has the most cancellations?
- Show products with stock level below 10
- Show revenue distribution by region
- What is the sales forecast for next month?
- What does the return policy say?

## API Integration

All API calls go through `src/services/api.js`:

```javascript
// Upload a file
const data = await uploadFile(file);

// Send a natural language query
const result = await sendQuery("Show revenue by region", sessionId);

// result.charts → Plotly JSON → rendered by ChartContainer
// result.kpis   → KPI data   → rendered by KPICard
// result.text   → Analysis   → rendered in message bubble
```

In production, the `vercel.json` rewrites `/api/*` to the Railway backend URL, so no CORS issues.

## Deployment

The app is deployed on **Vercel** with automatic deploys from the `main` branch.

```bash
# Build for production
npm run build

# Preview production build locally
npm run preview
```

`vercel.json` handles API proxy to Railway backend — no environment variables needed for the API URL.

## Author

**Dr. Fatih Hattatoğlu**  
GitHub: [@fhattat](https://github.com/fhattat) · Medium: [@fhattat](https://medium.com/@fhattat)

---

<div align="center">
Built with React · Vite · Tailwind CSS · Plotly.js · Vercel
</div>
