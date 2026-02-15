from pypdf import PdfReader
import logging

logging.basicConfig(level=logging.INFO)

def extract_text_from_pdf(pdf_path: str) -> str:
    """
    Extracts text from a PDF file.
    """
    try:
        reader = PdfReader(pdf_path)
        text = ""
        for page in reader.pages:
            content = page.extract_text()
            if content:
                text += content + "\n"
        
        logging.info(f"Extracted {len(text)} characters from {pdf_path}")
        return text
    except Exception as e:
        logging.error(f"Error reading PDF: {e}")
        raise e
