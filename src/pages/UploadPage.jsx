import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function UploadPage() {
    const navigate = useNavigate();
    const [selectedFile, setSelectedFile] = useState(null);
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = (event) => {
        const file = event.target.files[0];
        if (file && file.type.startsWith('video/')) {
            setSelectedFile(file);
        } else {
            alert('Please select a valid video file');
        }
    };

    const handleUpload = async () => {
        if (!selectedFile || !title) {
            alert('Please select a video file and enter a title');
            return;
        }

        setIsUploading(true);

        // Simulate upload process
        setTimeout(() => {
            setIsUploading(false);
            alert('Video uploaded successfully!');
            navigate('/user');
        }, 2000);
    };

    return (
        <div className="bg-[#2A324B] text-white min-h-screen p-6">
            <div className="max-w-md mx-auto">
                {/* Header */}
                <div className="flex items-center mb-6">
                    <button
                        onClick={() => navigate('/user')}
                        className="text-white text-2xl mr-4 hover:text-gray-300"
                    >
                        ←
                    </button>
                    <h1 className="text-2xl font-bold text-[#E1E5EE]">Upload Video</h1>
                </div>

                {/* Upload Form */}
                <div className="space-y-6">
                    {/* File Upload Area */}
                    <div className="border-2 border-dashed border-gray-400 rounded-lg p-8 text-center">
                        {selectedFile ? (
                            <div className="space-y-4">
                                <div className="text-green-400 text-xl">✓</div>
                                <p className="text-[#E1E5EE]">{selectedFile.name}</p>
                                <p className="text-sm text-gray-300">
                                    Size: {(selectedFile.size / (1024 * 1024)).toFixed(2)} MB
                                </p>
                                <button
                                    onClick={() => setSelectedFile(null)}
                                    className="text-red-400 hover:text-red-300 text-sm"
                                >
                                    Remove file
                                </button>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                <div className="text-4xl text-gray-400">📹</div>
                                <p className="text-[#E1E5EE]">Select a video to upload</p>
                                <p className="text-sm text-gray-300">
                                    Supported formats: MP4, MOV, AVI
                                </p>
                            </div>
                        )}
                        <input
                            type="file"
                            accept="video/*"
                            onChange={handleFileSelect}
                            className="hidden"
                            id="video-upload"
                        />
                        <label
                            htmlFor="video-upload"
                            className="inline-block mt-4 bg-[#718bab] text-white px-6 py-2 rounded cursor-pointer hover:bg-[#5a7194] transition"
                        >
                            {selectedFile ? 'Change Video' : 'Choose Video'}
                        </label>
                    </div>

                    {/* Title Input */}
                    <div>
                        <label className="block text-[#E1E5EE] text-sm font-semibold mb-2">
                            Title *
                        </label>
                        <input
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            placeholder="Enter video title"
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-[#718bab] focus:outline-none"
                            maxLength={100}
                        />
                        <p className="text-xs text-gray-400 mt-1">{title.length}/100</p>
                    </div>

                    {/* Description Input */}
                    <div>
                        <label className="block text-[#E1E5EE] text-sm font-semibold mb-2">
                            Description
                        </label>
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Tell us about your video..."
                            rows={4}
                            className="w-full px-4 py-2 bg-gray-700 text-white rounded border border-gray-600 focus:border-[#718bab] focus:outline-none resize-none"
                            maxLength={500}
                        />
                        <p className="text-xs text-gray-400 mt-1">{description.length}/500</p>
                    </div>

                    {/* Upload Button */}
                    <div className="space-y-4">
                        <button
                            onClick={handleUpload}
                            disabled={!selectedFile || !title || isUploading}
                            className={`w-full py-3 rounded font-semibold transition ${!selectedFile || !title || isUploading
                                ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
                                : 'bg-[#F9D9C2] text-[#2A324B] hover:bg-[#f0c7a8]'
                                }`}
                        >
                            {isUploading ? (
                                <div className="flex items-center justify-center space-x-2">
                                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-[#2A324B]"></div>
                                    <span>Uploading...</span>
                                </div>
                            ) : (
                                'Upload Video'
                            )}
                        </button>

                        <button
                            onClick={() => navigate('/user')}
                            className="w-full py-3 rounded font-semibold bg-gray-700 text-gray-300 hover:bg-gray-600 transition"
                        >
                            Cancel
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UploadPage;
