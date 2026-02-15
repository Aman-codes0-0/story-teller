from fastapi import FastAPI, UploadFile, File, HTTPException, BackgroundTasks
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import FileResponse
import shutil
import os
import uuid
# Services (to be implemented)
from services.pdf_processor import extract_text_from_pdf
from services.audio_director import generate_audiobook

app = FastAPI()

# Enable CORS for Frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

UPLOAD_DIR = "uploads"
OUTPUT_DIR = "outputs"
os.makedirs(UPLOAD_DIR, exist_ok=True)
os.makedirs(OUTPUT_DIR, exist_ok=True)

@app.get("/")
def read_root():
    return {"message": "AudioBook AI Backend is Running"}

@app.post("/convert-pdf")
async def convert_pdf(file: UploadFile = File(...)):
    if not file.filename.endswith(".pdf"):
        raise HTTPException(status_code=400, detail="Invalid file type. Please upload a PDF.")

    # 1. Save uploaded file
    file_id = str(uuid.uuid4())
    file_path = os.path.join(UPLOAD_DIR, f"{file_id}.pdf")
    with open(file_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    # 2. Extract Text
    try:
        text = extract_text_from_pdf(file_path)
    except Exception as e:
        os.remove(file_path)
        raise HTTPException(status_code=500, detail=f"Failed to parse PDF: {str(e)}")

    if not text.strip():
         raise HTTPException(status_code=400, detail="PDF contains no readable text.")

    # 3. Generate Audio (Async - for now blocking for simplicity in demo)
    # in production use background tasks
    try:
        output_filename = f"{file_id}.mp3"
        output_path = os.path.join(OUTPUT_DIR, output_filename)
        
        await generate_audiobook(text, output_path)
        
        # Return URL (In real deployment, this would be a static file URL)
        # For localhost, we can serve it directly or return a download path
        return {"audio_url": f"http://localhost:8000/download/{output_filename}", "preview_text": text[:500] + "..."}

    except Exception as e:
        raise HTTPException(status_code=500, detail=f"Audio generation failed: {str(e)}")

@app.get("/download/{filename}")
async def download_file(filename: str):
    file_path = os.path.join(OUTPUT_DIR, filename)
    if os.path.exists(file_path):
        return FileResponse(file_path, media_type="audio/mpeg", filename="audiobook.mp3")
    raise HTTPException(status_code=404, detail="File not found")

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("main:app", host="0.0.0.0", port=8000, reload=True)
