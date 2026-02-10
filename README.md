# BFHL Backend API

This project is a simple backend REST API built using **Node.js and Express** as part of the BFHL assignment.

The application exposes two APIs:

* A health check endpoint
* A single POST endpoint that performs calculations or returns an AI-based answer based on the input

The code is kept clean, readable, and easy to test.

---

## What this project does

* Accepts requests in JSON format
* Performs one operation per request
* Returns responses in a fixed structure
* Handles invalid inputs properly
* Integrates Google Gemini for AI-based questions
* Can be deployed publicly

---

## Tech Stack Used

* Node.js (v18 or above)
* Express.js
* Native `fetch` (no extra HTTP libraries)
* Google Gemini API
* Render (for deployment)

---

## API Overview

### 1. GET `/health`

This endpoint is used to check whether the server is running.

#### Response

```json
{
  "is_success": true,
  "official_email": "yourname@chitkara.edu.in"
}
```

* Always returns HTTP status `200`
* Useful for testing and deployment checks

---

### 2. POST `/bfhl`

This is the main API.

Rules:

* The request body must contain **exactly one key**
* Only supported keys are allowed
* Any invalid request returns an error

#### Supported Operations

| Key         | Expected Input | Output                |
| ----------- | -------------- | --------------------- |
| `fibonacci` | Integer        | Fibonacci series      |
| `prime`     | Integer array  | Prime numbers only    |
| `lcm`       | Integer array  | LCM value             |
| `hcf`       | Integer array  | HCF value             |
| `AI`        | String         | Single-word AI answer |

---

## Example Requests and Responses

### Fibonacci

**Request**

```json
{
  "fibonacci": 7
}
```

**Response**

```json
{
  "is_success": true,
  "official_email": "yourname@chitkara.edu.in",
  "data": [0, 1, 1, 2, 3, 5, 8]
}
```

---

### Prime Numbers

**Request**

```json
{
  "prime": [2, 4, 7, 9, 11]
}
```

**Response**

```json
{
  "is_success": true,
  "official_email": "yourname@chitkara.edu.in",
  "data": [2, 7, 11]
}
```

---

### LCM

**Request**

```json
{
  "lcm": [12, 18, 24]
}
```

**Response**

```json
{
  "is_success": true,
  "official_email": "yourname@chitkara.edu.in",
  "data": 72
}
```

---

### HCF

**Request**

```json
{
  "hcf": [24, 36, 60]
}
```

**Response**

```json
{
  "is_success": true,
  "official_email": "yourname@chitkara.edu.in",
  "data": 12
}
```

---

### AI Question (Gemini)

**Request**

```json
{
  "AI": "What is the capital city of Maharashtra?"
}
```

**Response**

```json
{
  "is_success": true,
  "official_email": "yourname@chitkara.edu.in",
  "data": "Mumbai"
}
```

Only a **clean single-word answer** is returned.

---

## Error Handling

* Invalid requests return HTTP `400`
* Response structure is consistent
* No server crashes or stack traces are exposed

**Example**

```json
{
  "is_success": false,
  "official_email": "yourname@chitkara.edu.in",
  "error": "Invalid request"
}
```

---

## Running the Project Locally

### 1. Install dependencies

```bash
npm install
```

---

### 2. Make sure `node-fetch` is not installed

```bash
npm uninstall node-fetch
```

Node 18+ already provides `fetch`, so no extra library is needed.

---

### 3. Create `.env` file

In the project root, create a file named `.env`:

```env
GEMINI_API_KEY=your_gemini_api_key_here
```

Do not commit this file.

---

### 4. Update your email in code

In `index.js`:

```js
const EMAIL = "yourname@chitkara.edu.in";
```

---

### 5. Start the server

```bash
npm run dev
```

The server will run on:

```
http://localhost:3001
```

---

## Testing the APIs

### Health API

Open in browser:

```
http://localhost:3001/health
```

---

### POST API using curl

```bash
curl -X POST http://localhost:3001/bfhl \
-H "Content-Type: application/json" \
-d '{"fibonacci":7}'
```

You can test other inputs by changing the JSON body.

---

## Setting up Google Gemini API Key

1. Go to [https://aistudio.google.com](https://aistudio.google.com)
2. Sign in with your Google account
3. Open **API Keys**
4. Create a new key
5. Copy the key and add it to `.env`

Make sure the Gemini API is enabled.

---

## GitHub Setup

```bash
git init
git add .
git commit -m "BFHL backend API"
git branch -M main
git remote add origin https://github.com/<your-username>/bfhl-api.git
git push -u origin main
```

The repository must be **public**.

---

## Deployment on Render

1. Go to [https://render.com](https://render.com)
2. Click **New → Web Service**
3. Connect your GitHub repository
4. Choose **Node** as runtime

### Build Command

```bash
npm install
```

### Start Command

```bash
npm start
```

---

### Environment Variable on Render

Add this in Render dashboard:

* **Key:** `GEMINI_API_KEY`
* **Value:** your Gemini API key

---

After deployment, you’ll get a public URL like:

```
https://your-app.onrender.com
```

---

## Final Submission Links

* POST API
  `https://your-app.onrender.com/bfhl`

* Health API
  `https://your-app.onrender.com/health`

* GitHub Repository
  `https://github.com/your-username/bfhl-api`

* Hosting Platform
  `Render`

---

## Why this implementation works well

* Stateless and simple
* Strict validation
* Clear request/response format
* Secure handling of secrets
* Easy to deploy and test
* Matches assignment requirements

---

## Final Notes

* No database is required
* APIs are publicly accessible
* Suitable for evaluation and interviews
* Designed to pass edge cases and hidden tests

---
