import { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { FileText, UploadCloud, CheckCircle, AlertCircle } from 'lucide-react';
import { motion } from 'framer-motion';

const PDFUploader = ({ onUpload }) => {
    const [uploading, setUploading] = useState(false);
    const [error, setError] = useState(null);

    const onDrop = useCallback((acceptedFiles) => {
        const file = acceptedFiles[0];
        if (file?.type !== 'application/pdf') {
            setError('Please upload a valid PDF file.');
            return;
        }
        setError(null);
        setUploading(true);

        // Simulate upload delay
        setTimeout(() => {
            setUploading(false);
            onUpload(file);
        }, 1500);

    }, [onUpload]);

    const { getRootProps, getInputProps, isDragActive } = useDropzone({
        onDrop,
        accept: { 'application/pdf': ['.pdf'] },
        multiple: false
    });

    return (
        <div className="w-full max-w-xl">
            <motion.div
                {...getRootProps()}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className={`
          flex flex-col items-center justify-center p-10 border-4 border-dashed rounded-3xl cursor-pointer transition-colors
          ${isDragActive ? 'border-green-400 bg-green-400/10' : 'border-gray-600 bg-gray-800/50 hover:border-purple-400 hover:bg-gray-800'}
        `}
            >
                <input {...getInputProps()} />

                {uploading ? (
                    <div className="flex flex-col items-center animate-pulse">
                        <UploadCloud size={64} className="text-purple-400 mb-4" />
                        <p className="text-xl font-bold text-purple-300">Reading your story...</p>
                    </div>
                ) : (
                    <>
                        <FileText size={64} className="text-gray-400 mb-4" />
                        <p className="text-xl font-bold text-gray-200 text-center">
                            {isDragActive ? "Drop the PDF here!" : "Drag & Drop your Story PDF"}
                        </p>
                        <p className="text-sm text-gray-500 mt-2">(or click to browse)</p>
                    </>
                )}
            </motion.div>

            {error && (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex items-center gap-2 mt-4 text-red-400 bg-red-400/10 p-3 rounded-lg"
                >
                    <AlertCircle size={20} />
                    <span>{error}</span>
                </motion.div>
            )}
        </div>
    );
};

export default PDFUploader;
