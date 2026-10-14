# WebSift AI

WebSift AI turns an ordinary webpage into a short, readable summary. Paste an article or documentation URL, and the Express backend fetches the page, extracts useful text with Cheerio, and asks Google's Gemini API to summarize it.

## Features

- React + Vite interface with loading and error states
- Express API endpoint: `POST /api/summarize`
- HTML text extraction with Cheerio
- Gemini summarization using a server-side API key
- URL validation, request timeout, response-size limit, and basic private-host blocking
- Responsive layout and copy-summary action

## Tech stack

- Frontend: React, Vite, plain CSS
- Backend: Node.js, Express, Cheerio
- AI: Google Gemini API

## Prerequisites

- Node.js 20 or later
- npm
- A Gemini API key from [Google AI Studio](https://aistudio.google.com/apikey)

The Gemini API has a free tier, but availability, supported models, and rate limits can change. Check Google's [current pricing and limits](https://ai.google.dev/gemini-api/docs/pricing) before submitting or demoing.

## Project structure

```text
websift-ai/
├── backend/
│   ├── src/server.js
│   ├── package.json
│   └── .env.example
├── frontend/
│   ├── src/App.jsx
│   ├── src/main.jsx
│   ├── src/styles.css
│   ├── index.html
│   └── package.json
├── .gitignore
└── README.md
```

## Run locally

### 1. Install dependencies

From the project root:

```bash
npm install
npm run install:all
```

### 2. Configure the backend environment

Create a file named `.env` inside the **`backend/` directory** by copying `backend/.env.example`.

```env
GEMINI_API_KEY=replace_with_your_key
GEMINI_MODEL=gemini-2.5-flash
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
```

Keep this key private. Do not put it in the frontend environment or commit your `.env` file. The `.gitignore` already excludes it.

### 3. Configure the frontend

Create `frontend/.env` from `frontend/.env.example`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Only the API base URL belongs in this file—never put the Gemini key here.

### 4. Start both apps

From the root directory:

```bash
npm run dev
```

- Frontend: http://localhost:5173
- Backend health check: http://localhost:5000/api/health

You can also start each app in a separate terminal with `npm --prefix backend run dev` and `npm --prefix frontend run dev`.

## API

### `POST /api/summarize`

Request body:

```json
{ "url": "https://example.com/article" }
```

Successful response:

```json
{
  "url": "https://example.com/article",
  "title": "Example article",
  "summary": "A concise summary of the page...",
  "wordCount": 1234
}
```

The API returns a helpful error message for invalid URLs, pages that cannot be fetched, pages with too little text, and AI API failures.

## Deploy

This project is designed for separate frontend and backend deployments.

### Backend on Render

1. Push this repository to GitHub.
2. In Render, create a **Web Service** and connect the repository.
3. Set **Root Directory** to `backend`.
4. Set **Build Command** to `npm install` and **Start Command** to `npm start`.
5. Add environment variables in Render's Environment settings:
   - `GEMINI_API_KEY`: your Gemini key
   - `GEMINI_MODEL`: `gemini-2.5-flash` (or a currently supported model available to your key)
   - `FRONTEND_ORIGIN`: your deployed Vercel frontend URL
6. Deploy and copy the Render service URL, for example `https://your-service.onrender.com`.

### Frontend on Vercel

1. Import the same GitHub repository into Vercel.
2. Set **Root Directory** to `frontend`.
3. Add `VITE_API_BASE_URL` with your deployed Render backend URL (no trailing slash).
4. Deploy. If you change the variable, redeploy the frontend.
5. Update the Render `FRONTEND_ORIGIN` value to the Vercel URL and redeploy the backend.

Free hosting plans may sleep or have usage limits, so allow a first request to take longer while the backend wakes up.

## Notes and limitations

- This is a simple HTML scraper. It does not execute JavaScript, sign in to websites, or bypass bot protection.
- Some websites block automated requests or have terms that restrict scraping. Only scrape pages you are allowed to access and respect the site's terms and robots guidance.
- The backend rejects localhost and common private-network IP targets and does not follow redirects, reducing server-side request forgery (SSRF) risk. This is a learning project, not a hardened public scraping service.
- Do not send sensitive/private page content to an AI provider without permission.
