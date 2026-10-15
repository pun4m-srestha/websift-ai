# WebSift AI

**Turn long web articles into clear, AI-generated summaries.**

WebSift AI is a full-stack web application that extracts readable content from a webpage and uses AI to generate a concise summary. Instead of reading an entire article, users can paste a URL and get its key points in one place.

**[Live Demo](https://websift-ai.vercel.app) · [GitHub Repository](https://github.com/pun4m-srestha/websift-ai)**

## Features

- **URL-Based Summarization:** Paste a webpage or article URL to generate a summary.
- **Web Scraping:** Uses Cheerio to parse HTML and extract readable page content.
- **AI-Powered Summaries:** Uses the Groq API with the `openai/gpt-oss-20b` model to generate summaries.
- **Content Validation:** Checks extracted content and handles pages that don't contain enough readable text.
- **URL Security:** Validates submitted URLs and includes protections against requests to private or reserved network addresses.
- **API Integration:** Connects the React frontend to a separate Express backend through REST API endpoints.
- **Error Handling:** Provides meaningful feedback when a URL is invalid, content extraction fails, or summarization encounters an error.
- **Deployed Application:** Frontend hosted on Vercel and backend hosted on Render.

## Tech Stack

| Area | Technologies |
|---|---|
| Frontend | React, Vite, JavaScript |
| Backend | Node.js, Express.js |
| Web Scraping | Cheerio |
| AI Integration | Groq API, `openai/gpt-oss-20b` |
| API Communication | REST API, Fetch API |
| Deployment | Vercel, Render |

## How It Works

1. The user enters a webpage URL in the frontend.
2. The frontend sends the URL to the Express backend through the `/api/summarize` endpoint.
3. The backend validates the URL and fetches the webpage HTML.
4. Cheerio extracts the readable text and page title.
5. The extracted content is passed to the Groq API for summarization.
6. The backend returns the page title, source URL, summary, and word count as JSON.
7. The frontend displays the generated summary to the user.

## Live Deployment

- **Frontend:** https://websift-ai.vercel.app
- **Backend:** https://websift-ai.onrender.com
- **Health Check:** https://websift-ai.onrender.com/api/health

The backend health endpoint returns a JSON response indicating whether the API is running.

## API Endpoints

### `GET /api/health`

Checks the backend service status.

Example response:

```json
{
  "status": "ok",
  "service": "WebSift AI API"
}
```

### `POST /api/summarize`

Accepts a webpage URL and returns its AI-generated summary.

Request body:

```json
{
  "url": "https://example.com/article"
}
```

The response includes the source URL, page title, generated summary, and extracted word count.

## Run Locally

### Prerequisites

- Node.js and npm
- A Groq API key

### 1. Clone the repository

```bash
git clone https://github.com/pun4m-srestha/websift-ai.git
cd websift-ai
```

### 2. Install dependencies

Install the frontend and backend dependencies in their respective project directories, according to the repository structure.

```bash
npm install
```

Run this command in each application directory that has its own `package.json`.

### 3. Configure environment variables

Configure the backend environment with the following variables:

```env
GROQ_API_KEY=your_groq_api_key
FRONTEND_ORIGIN=http://localhost:5173
```

Configure the frontend environment with:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Use the appropriate frontend origin for your local development port. Keep API keys on the backend and never expose them through frontend environment variables.

### 4. Start the applications

Run the frontend and backend using the development scripts defined in their respective `package.json` files.

The frontend typically runs on `http://localhost:5173`, while the backend runs on `http://localhost:5000` during local development.

## Deployment Configuration

WebSift AI uses separate frontend and backend deployments.

- **Vercel:** Hosts the production frontend. Set `VITE_API_BASE_URL` to the deployed Render backend URL.
- **Render:** Hosts the Express API. Configure `GROQ_API_KEY` and `FRONTEND_ORIGIN` in the service environment variables.
- **CORS:** Configure the backend to allow requests from the intended frontend origin.
- **Production Build:** Build the Vite frontend with `npm run build`.

Environment variables must be configured separately for each deployment platform. Never commit API keys or other secrets to the repository.

## What I Learned

Building WebSift AI gave me practical experience with full-stack development, including:

- Integrating a third-party AI API into a web application.
- Scraping and extracting readable content from HTML pages.
- Connecting a React frontend to an Express REST API.
- Validating URLs and handling unreliable external webpages.
- Deploying frontend and backend services independently.
- Debugging production API connectivity, environment variables, and CORS configuration.

## Future Improvements

- Add options for short, medium, and detailed summaries.
- Improve content extraction for websites with complex layouts.
- Add summary history and the ability to revisit previous results.
- Improve the presentation and readability of generated summaries.

---

**Built by Punam Srestha**

[GitHub](https://github.com/pun4m-srestha) · [Project Repository](https://github.com/pun4m-srestha/websift-ai)
