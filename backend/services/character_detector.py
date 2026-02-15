import google.generativeai as genai
import os
import re
import json
from dotenv import load_dotenv

load_dotenv()

API_KEY = os.getenv("GEMINI_API_KEY")

if API_KEY:
    genai.configure(api_key=API_KEY)
else:
    print("Warning: GEMINI_API_KEY not found. Using simple heuristics.")

def analyze_character_with_llm(text_segment: str):
    """
    Uses Gemini to identify the speaker and tone.
    """
    if not API_KEY:
        return None

    model = genai.GenerativeModel('gemini-pro')
    prompt = f"""
    Analyze the following text segment from a story. Identify the speaker (character) and their gender/age group.
    
    Text: "{text_segment}"
    
    Return ONLY a JSON object with these keys: 
    - "speaker": "narrator" OR character name
    - "voice_type": "child", "teen", "adult", "senior"
    - "gender": "male", "female"
    
    If it's narration, return speaker="narrator".
    """
    
    try:
        response = model.generate_content(prompt)
        text = response.text
        # Clean up code blocks if Gemini returns them
        text = text.replace("```json", "").replace("```", "")
        return json.loads(text)
    except Exception as e:
        print(f"Gemini Error: {e}")
        return None

def segment_text(text: str):
    """
    Splits text and assigns voices.
    """
    # 1. Simple split by newlines or quotes (improved)
    # For a real robust solution, we'd send larger chunks to Gemini to split
    # But to save tokens/complexity, we'll split by paragraphs/quotes first.
    
    segments = []
    
    # Simple regex to split by quotes
    parts = re.split('(".*?")', text)
    
    for part in parts:
        part = part.strip()
        if not part:
            continue
            
        role = "narrator"
        voice_profile = {"voice_type": "adult", "gender": "male"} # Default Narrator
        
        if part.startswith('"') and part.endswith('"'):
            # It's dialogue! Let's ask Gemini or use heuristics
            if API_KEY:
                # Context is minimal here, usually you send previous lines too.
                analysis = analyze_character_with_llm(part)
                if analysis:
                    if analysis.get("speaker") != "narrator":
                         role = "character"
                         voice_profile = {
                             "voice_type": analysis.get("voice_type", "adult"),
                             "gender": analysis.get("gender", "male")
                         }
            else:
                 # Fallback Heuristics
                 lower = part.lower()
                 if "child" in lower or "boy" in lower:
                     voice_profile = {"voice_type": "child", "gender": "male"}
                 elif "girl" in lower:
                     voice_profile = {"voice_type": "child", "gender": "female"}
                 role = "character"

        segments.append({
            "text": part,
            "role": role,
            "profile": voice_profile
        })
        
    return segments
