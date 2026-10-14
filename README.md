# WebSift AI

WebSift AI is a full-stack web application that extracts readable content from a webpage and uses AI to generate a concise summary.

## Features

- Accepts a webpage URL as input.
- Extracts readable text using Cheerio.
- Generates AI-powered summaries using the Groq API.
- Includes a React-based frontend.
- Uses an Express.js backend to handle requests.

## Tech Stack

**Frontend:** React, Vite, CSS

**Backend:** Node.js, Express.js, Cheerio

**AI:** Groq API

## Run Locally

### 1. Install dependencies

From the project root:

```bash
npm install
```

### 2. Configure environment variables

Create `backend/.env` and add your Groq API key:

```env
GROQ_API_KEY=your_groq_api_key
GROQ_MODEL=openai/gpt-oss-20b
PORT=5000
FRONTEND_ORIGIN=http://localhost:5173
```

Create `frontend/.env`:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Replace the placeholder with your own API key. Never commit actual secrets.

### 3. Start the application

```bash
npm run dev
```

Open `http://localhost:5173` in your browser.

## Security

The Groq API key belongs on the backend and must not be exposed in frontend code or committed to Git.

## Status

Currently working locally. Deployment is in progress.