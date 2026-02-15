import { motion } from 'framer-motion';
import { Volume2, VolumeX, Download, Play, Pause } from 'lucide-react';
import { useState, useRef, useEffect } from 'react';

const StoryPlayer = ({ story, audioUrl, onReset }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) audioRef.current.play();
            else audioRef.current.pause();
        }
    }, [isPlaying]);

    const toggleAudio = () => setIsPlaying(!isPlaying);

    const handleDownload = () => {
        if (!audioUrl) return;
        const link = document.createElement('a');
        link.href = audioUrl;
        link.download = 'my-story-audiobook.mp3';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="w-full max-w-3xl bg-gray-800/80 backdrop-blur-md p-8 rounded-3xl shadow-xl border border-gray-700"
        >
            <div className="flex justify-between items-center mb-6 border-b border-gray-700 pb-4">
                <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400">
                    Your Humanized Audiobook 🎧
                </h2>
                <div className="flex gap-2">
                    <button
                        onClick={toggleAudio}
                        className={`p-3 rounded-full transition-all ${isPlaying ? 'bg-green-500 text-white shadow-lg shadow-green-500/30' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                    >
                        {isPlaying ? <Pause size={24} /> : <Play size={24} />}
                    </button>

                    {audioUrl && (
                        <button
                            onClick={handleDownload}
                            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-full transition-all shadow-lg hover:shadow-blue-500/30"
                        >
                            <Download size={20} />
                            <span className="hidden sm:inline">Download MP3</span>
                        </button>
                    )}
                </div>
            </div>

            {/* Audio Element (Hidden or Visualized) */}
            <audio ref={audioRef} src={audioUrl} onEnded={() => setIsPlaying(false)} />

            <div className="prose prose-invert max-w-none text-lg leading-relaxed text-gray-200 h-96 overflow-y-auto pr-4 custom-scrollbar bg-gray-900/50 p-6 rounded-xl border border-gray-700/50">
                <p className="whitespace-pre-wrap font-serif tracking-wide">{story}</p>
            </div>

            <div className="mt-8 flex justify-center">
                <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    onClick={onReset}
                    className="px-8 py-3 bg-gray-700 hover:bg-gray-600 rounded-full font-bold text-gray-300 transition-all border border-gray-600 hover:border-gray-500"
                >
                    Convert Another PDF 🔄
                </motion.button>
            </div>
        </motion.div>
    );
};

export default StoryPlayer;
