# WebSift AI

**Turn long web articles into clear, AI-generated summaries.**

WebSift AI is a full-stack web application that extracts readable content from webpages and uses AI to generate concise summaries. Users can paste an article URL and get its key information without having to read the entire page.

**[🚀 Live Demo](https://websift-1gp9zydpv-pun4m-srestha.vercel.app/) · [💻 GitHub Repository](https://github.com/pun4m-srestha/websift-ai)**

## Features

- **URL-Based Summarization:** Generate summaries from article and webpage URLs.
- **Web Scraping:** Uses Cheerio to extract readable text and page titles from HTML.
- **AI-Powered Summaries:** Integrates the Groq API to generate concise summaries.
- **URL Validation:** Validates submitted URLs and blocks requests to private or reserved network addresses.
- **Content Validation:** Handles webpages with insufficient readable text.
- **REST API Integration:** Connects the React frontend to the Express backend.
- **Error Handling:** Handles invalid URLs, scraping failures, and AI API errors.
- **Separate Deployment:** Frontend hosted on Vercel and backend hosted on Render.

## Tech Stack

| Technology | Purpose |
|---|---|
| React | Frontend UI |
| Vite | Frontend development and production builds |
| JavaScript | Application logic |
| Node.js | Backend runtime |
| Express.js | REST API |
| Cheerio | HTML parsing and text extraction |
| Groq API | AI-powered summarization |
| Fetch API | Frontend-to-backend communication |
| Vercel | Frontend deployment |
| Render | Backend deployment |

## Live Deployment

- **Frontend:** [Open WebSift AI](https://websift-1gp9zydpv-pun4m-srestha.vercel.app/)
- **Backend API:** https://websift-ai.onrender.com
- **Backend Health Check:** [Check API Status](https://websift-ai.onrender.com/api/health)

The backend is an API service, not a standalone website. Opening its root URL may display `Cannot GET /` because no homepage route is defined. Use the health-check endpoint to verify the service.

## How It Works

1. The user enters an article or webpage URL.
2. The React frontend sends the URL to the backend through the `/api/summarize` endpoint.
3. Express validates the submitted URL.
4. The backend fetches the webpage HTML and uses Cheerio to extract readable content.
5. The extracted text is sent to the Groq API for summarization.
6. The backend returns the title, source URL, generated summary, and extracted word count.
7. The frontend displays the result.

## API Endpoints

### `GET /api/health`

Checks whether the backend service is running.

Example response:

```json
{
  "status": "ok",
  "service": "WebSift AI API"
}
```

### `POST /api/summarize`

Accepts a webpage URL and returns the generated summary.

Example request body:

```json
{
  "url": "https://example.com/article"
}
```

The response contains the source URL, page title, summary, and extracted word count.

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

Install the dependencies in the frontend and backend directories containing their respective `package.json` files.

```bash
npm install
```

Run the command in each directory if the project uses separate frontend and backend packages.

### 3. Configure environment variables

For the backend, create an environment file containing:

```env
GROQ_API_KEY=your_groq_api_key
FRONTEND_ORIGIN=http://localhost:5173
```

For the frontend, configure:

```env
VITE_API_BASE_URL=http://localhost:5000
```

Use the appropriate local frontend origin if your development server runs on a different port. Never expose your Groq API key in frontend code or commit secrets to GitHub.

### 4. Start the application

Run the development commands defined in the frontend and backend `package.json` files.

The typical local URLs are:

- Frontend: `http://localhost:5173`
- Backend: `http://localhost:5000`

## Deployment Configuration

- **Vercel:** Hosts the frontend. Configure `VITE_API_BASE_URL` with `https://websift-ai.onrender.com`.
- **Render:** Hosts the Express API and runs the backend entry point.
- **CORS:** Configure `FRONTEND_ORIGIN` with the exact frontend origin permitted to access the API.
- **Production Build:** Use `npm run build` for the Vite frontend.

Configure environment variables separately on each deployment platform. Redeploy the frontend after changing Vite environment variables.

## What I Learned

Through this project, I gained practical experience with:

- Integrating third-party AI APIs into a full-stack application.
- Scraping webpages and extracting readable content from HTML.
- Building REST API endpoints with Express.
- Validating URLs and handling external webpage failures.
- Deploying frontend and backend services separately.
- Debugging production API requests, environment variables, and CORS issues.

## Future Improvements

- Add multiple summary lengths.
- Improve extraction for complex webpage layouts.
- Add summary history.
- Improve the presentation of generated summaries.

---

**Built by Punam Srestha**

[GitHub Profile](https://github.com/pun4m-srestha) · [WebSift AI Repository](https://github.com/pun4m-srestha/websift-ai)
