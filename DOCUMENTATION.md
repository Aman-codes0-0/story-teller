# Story Teller Bot Documentation

## Project Overview
This project is an AI-powered Story Teller Bot that converts PDF documents into audiobooks or generates stories based on prompts. It features a React frontend and a FastAPI backend, utilizing AI services for text processing and audio generation.

## Prerequisites
Before you begin, ensure you have the following installed:
- **Python** (v3.10 or higher)
- **Node.js** (v18 or higher) and npm
- **Git**

## Installation & Setup

### 1. Clone the Repository
```bash
git clone https://github.com/Aman-codes0-0/story-teller.git
cd story-teller
```

### 2. Backend Setup
Navigate to the backend directory and set up the Python environment.

```bash
cd backend
# Create a virtual environment
python -m venv venv

# Activate the virtual environment
# On Windows:
venv\Scripts\activate
# On macOS/Linux:
source venv/bin/activate

# Install dependencies
pip install -r requirements.txt
```

### 3. Frontend Setup
Navigate to the frontend directory and install Node.js dependencies.

```bash
cd ../frontend
npm install
```

## Configuration (API Keys)

To use the AI features (like Story Generation or detailed Image Analysis), you need to configure API keys. The project uses environment variables for security.

1.  **Create a `.env` file** in the `backend/` directory. You can use the provided `.env.example` as a template.
    ```bash
    cp .env.example .env
    ```
2.  **Add your API Keys** to the `.env` file.
    Open `.env` in a text editor and add the following (depending on which services you enable):

    ```env
    # OpenAI API Key (for GPT-based story generation)
    OPENAI_API_KEY=your_openai_api_key_here

    # Google Gemini API Key (if using Gemini)
    GOOGLE_API_KEY=your_gemini_api_key_here

    # DeepFace / Other Service Keys (if applicable)
    # DEEPFACE_METRIC=cosine
    ```

    *   **How to get OpenAI Key**: Sign up at [platform.openai.com](https://platform.openai.com/), go to API Keys, and create a new secret key.
    *   **How to get Gemini Key**: Go to [Google AI Studio](https://aistudio.google.com/), and create an API key.

## Running the Project

You need to run both the backend and frontend servers simultaneously (using two terminal windows).

### Start Backend
In your **first terminal**:
```bash
cd backend
# Ensure venv is active
source venv/bin/activate  # or venv\Scripts\activate on Windows
uvicorn main:app --reload
```
The backend will run at `http://127.0.0.1:8000`.

### Start Frontend
In your **second terminal**:
```bash
cd frontend
npm run dev
```
The frontend will run at `http://localhost:5173` (or similar). Open this link in your browser to use the app.

## Project Logic ("How it Works")

The application follows a client-server architecture:

1.  **Frontend (React)**:
    *   The user interface is built with React and Tailwind CSS.
    *   Users can upload PDF files or interact with the story generation UI.
    *   When a file is uploaded, the frontend sends a `POST` request to the backend API.

2.  **Backend (FastAPI)**:
    *   **`main.py`**: The entry point. Handles incoming HTTP requests (like file uploads).
    *   **Text Extraction**: When a PDF is received, `pypdf` is used to extract text content from the file.
    *   **Processing**:
        *   **Detector**: Analyzes inputs (like images) using libraries like `deepface` (placeholder logic currently).
        *   **Story Generator**: Uses LLMs (like OpenAI GPT or Gemini) to generate creative text based on prompts or extracted content.
    *   **Audio Generation**: The processed text is sent to a Text-to-Speech (TTS) engine (like `edge-tts`) to generate an MP3 file.
    *   **Response**: The backend returns the URL of the generated audio file to the frontend.

3.  **Dependencies**:
    *   `fastapi`, `uvicorn`: For building the high-performance web API.
    *   `python-multipart`: For handling file uploads.
    *   `pypdf`: For reading PDF files.
    *   `openai`, `google-generativeai`: Client libraries for connecting to AI models.
    *   `edge-tts`: For free, high-quality text-to-speech.

## Deployment (Free Options)

You can deploy this project for free using the following services:

### 1. Frontend (Vercel or Netlify)
*   **Vercel**:
    1.  Push your code to GitHub.
    2.  Go to [Vercel.com](https://vercel.com/) and sign up.
    3.  "Import Project" and select your GitHub repository.
    4.  Select `vite` as the framework (it usually detects this automatically).
    5.  Set the `Root Directory` to `frontend`.
    6.  Deploy.

### 2. Backend (Render or Railway)
*   **Render**:
    1.  Sign up at [render.com](https://render.com/).
    2.  Create a new "Web Service".
    3.  Connect your GitHub repo.
    4.  Set `Root Directory` to `backend`.
    5.  Set `Build Command` to `pip install -r requirements.txt`.
    6.  Set `Start Command` to `uvicorn main:app --host 0.0.0.0 --port 10000`.
    7.  **Important**: Add your Environment Variables (API Keys) in the "Environment" tab on the Render dashboard.

## Requirements File

The `backend/requirements.txt` file contains all necessary Python libraries.
```text
fastapi
uvicorn
python-multipart
openai
pypdf
python-dotenv
requests
edge-tts
google-generativeai
```
To generate/update this file based on your current environment, run:
```bash
pip freeze > requirements.txt
```
