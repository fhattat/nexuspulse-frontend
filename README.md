# NexusPulse AI - Frontend

React dashboard for the NexusPulse AI e-commerce analytics platform.

## Quick Start

```bash
cd nexuspulse-frontend
npm install
npm run dev
```

Opens at `http://localhost:5173`. The Vite proxy forwards `/api` requests to `http://localhost:8000` (backend).

## Prerequisites

- Node.js 18+
- Backend running at port 8000

## Tech Stack

- React 18 + Vite
- Tailwind CSS v4
- react-plotly.js (interactive charts)
- react-dropzone (file upload)
- lucide-react (icons)
- axios (API client)

## Project Structure

```
src/
├── components/
│   ├── layout/      Sidebar, Header
│   ├── upload/      FileUploader (drag & drop)
│   ├── chat/        ChatPanel, MessageBubble
│   ├── dashboard/   KPICard, ChartContainer
│   └── common/      LoadingSpinner
├── services/
│   └── api.js       Axios instance + endpoints
├── pages/
│   ├── UploadPage.jsx
│   └── DashboardPage.jsx
├── App.jsx          Main app + routing
├── main.jsx         Entry point
└── index.css        Tailwind + custom styles
```

## User Flow

1. **Upload** → Drag & drop CSV file
2. **Chat** → Ask questions in natural language
3. **Results** → See KPIs, charts, and text analysis inline
