# 🎙️ AudioBook AI (Smart Story Teller)

A powerful AI tool that turns PDF stories/novels into engaging Audiobooks with **Multi-Character Voices**.

![UI Screenshot](https://via.placeholder.com/800x400?text=AudioBook+AI+Preview)

## ✨ Features

- **📄 PDF to Audio:** Upload any PDF story.
- **🧠 Smart Character Detection:** Uses **Google Gemini AI** to identify who is speaking (Narrator vs Characters).
- **🗣️ Multi-Voice TTS:** Automatically switches voices (Child, Old Man, Woman) based on the character.
- **💸 Free & Open Source:** Uses free tiers (Gemini API) and open-source models (`edge-tts`).

## 🛠️ Setup Guide

### prerequisites
- A Google Account (for Gemini API Key).
- Python 3.8+.
- Node.js 18+.

### 1. Get Your Free API Key
1. Go to [Google AI Studio](https://aistudio.google.com/app/apikey).
2. Click **Create API Key**.
3. Copy the key.

### 2. Backend Setup
1. Navigate to the `backend` folder:
   ```bash
   cd story-teller-bot/backend
   ```
2. Create `venv` (if possible) or run commands directly. Install dependencies:
   ```bash
   pip install -r requirements.txt --break-system-packages
   ```
3. Set up your API Key:
   - Rename `.env.example` to `.env`.
   - Open `.env` and paste your key: `GEMINI_API_KEY=your_copied_key_here`.
4. Start the server:
   ```bash
   uvicorn main:app --reload
   ```

### 3. Frontend Setup
1. Navigate to the `frontend` folder:
   ```bash
   cd story-teller-bot/frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the app:
   ```bash
   npm run dev
   ```
4. Open [http://localhost:5173](http://localhost:5173).

## 🚀 How It Works
1. **Upload:** You drop a PDF.
2. **Extract:** Python reads the text.
3. **Analyze:** Gemini AI looks at each line: *"Ah, this is the 8-year-old protagonist speaking!"*
4. **Generate:** `edge-tts` generates that specific line in a "Child" voice.
5. **Stitch:** All audio clips are merged into one MP3.
6. **Download:** You get the final audiobook!

## 🤝 Contribution
Feel free to fork and add more voice models!
