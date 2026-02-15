import { useState } from 'react';
import PDFUploader from './components/PDFUploader';
import StoryPlayer from './components/StoryPlayer';
import { Sparkles, FileText, CheckCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import './App.css';

function App() {
  const [step, setStep] = useState('upload'); // 'upload', 'processing', 'result'
  const [story, setStory] = useState('');
  const [audioUrl, setAudioUrl] = useState(null);
  const [error, setError] = useState(null);

  const handleUpload = async (file) => {
    setStep('processing');
    setError(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await fetch('http://localhost:8000/convert-pdf', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`Server Error: ${response.statusText}`);
      }

      const data = await response.json();
      setStory(data.preview_text);
      setAudioUrl(data.audio_url);
      setStep('result');

    } catch (err) {
      console.error("Upload failed:", err);
      setError("Failed to process PDF. Is the backend running?");
      setStep('upload');
    }
  };

  const handleReset = () => {
    setStep('upload');
    setStory('');
    setAudioUrl(null);
    setError(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-indigo-900 to-blue-900 text-white flex flex-col items-center justify-center p-4">

      <header className="absolute top-0 w-full p-6 flex justify-between items-center max-w-7xl mx-auto z-20">
        <div className="flex items-center gap-2 cursor-pointer" onClick={handleReset}>
          <Sparkles className="text-cyan-400" />
          <h1 className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-purple-500">
            AudioBook AI
          </h1>
        </div>
      </header>

      <main className="w-full max-w-4xl flex flex-col items-center justify-center relative z-10 mt-16">
        <AnimatePresence mode="wait">
          {step === 'upload' && (
            <motion.div
              key="upload"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="text-center w-full flex flex-col items-center"
            >
              <h2 className="text-4xl md:text-5xl font-extrabold mb-4 leading-tight">
                Turn PDFs into <span className="text-cyan-400">Audiobooks</span>
              </h2>
              <p className="text-gray-300 mb-12 text-lg max-w-md">
                Upload your stories, novels, or documents. We'll humanize them and read them out to you.
              </p>
              <PDFUploader onUpload={handleUpload} />

              {error && (
                <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="mt-4 p-3 bg-red-500/20 text-red-300 rounded-lg">
                  {error}
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 'processing' && (
            <motion.div
              key="processing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center"
            >
              <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-cyan-500 mb-6"></div>
              <h3 className="text-2xl font-semibold animate-pulse">Humanizing Text... 🤖➡️🗣️</h3>
              <p className="text-gray-400 mt-2">Converting PDF to natural speech...</p>
            </motion.div>
          )}

          {step === 'result' && (
            <motion.div
              key="result"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full flex justify-center"
            >
              <StoryPlayer story={story} audioUrl={audioUrl} onReset={handleReset} />
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      {/* Background Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-cyan-600/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-600/10 rounded-full blur-3xl"></div>
      </div>
    </div>
  );
}

export default App;
