# 🎙️ AudioBook AI (Smart Story Teller)

A powerful AI tool that turns PDF stories/novels into engaging Audiobooks with **Multi-Character Voices**.

![UI Screenshot](https://via.placeholder.com/800x400?text=AudioBook+AI+Preview)

## ✨ Features

- **📄 PDF to Audio:** Upload any PDF story.
- **🧠 Smart Character Detection:** Uses **Google Gemini AI** to identify who is speaking (Narrator vs Characters).
- **🗣️ Multi-Voice TTS:** Automatically switches voices (Child, Old Man, Woman) based on the character.
- **💸 Free & Open Source:** Uses free tiers (Gemini API) and open-source models (`edge-tts`).

## 📚 Documentation

For detailed instructions on architecture, API keys, and deployment, please refer to the **[DOCUMENTATION.md](DOCUMENTATION.md)** file.

## 🚀 Quick Start

### Prerequisites
- **Python** (v3.10+)
- **Node.js** (v18+)
- **Git**
- **Google Gemini API Key** (Get it [here](https://aistudio.google.com/app/apikey))

### 1. Backend Setup
```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
cp .env.example .env
# Edit .env and add your GOOGLE_API_KEY
uvicorn main:app --reload
```

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view the app.

## 🤝 Contribution
Feel free to fork and add more voice models!
