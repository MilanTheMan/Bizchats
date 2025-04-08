import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import sqlService from '../../services/sqlService';
import { UserContext } from '../../context/UserContext';
import { FaFolder, FaTrash, FaUpload, FaDownload, FaEye } from "react-icons/fa";

const ProfessionalDoccuments = () => {
    const { channelId } = useParams();
    const { user } = useContext(UserContext);
    const [categories, setCategories] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState(null);
    const [documents, setDocuments] = useState([]);
    const [newCategoryName, setNewCategoryName] = useState('');
    const [file, setFile] = useState(null);
    const [previewFile, setPreviewFile] = useState(null);
    const [previewError, setPreviewError] = useState(false);

    useEffect(() => {
        fetchCategories();
    }, [channelId]);

    useEffect(() => {
        if (selectedCategory) {
            fetchDocuments(selectedCategory.id);
        }
    }, [selectedCategory]);

    const fetchCategories = async () => {
        try {
            const data = await sqlService.getDocumentCategories(channelId);
            setCategories(data.data);
        } catch (err) {
            console.error("Failed to fetch categories:", err);
        }
    };

    const fetchDocuments = async (categoryId) => {
        try {
            const data = await sqlService.getChannelDocuments(channelId, categoryId);
            setDocuments(data.data);
        } catch (err) {
            console.error("Failed to fetch documents:", err);
        }
    };

    const handleCreateCategory = async () => {
        try {
            await sqlService.createDocumentCategory({ channelId, categoryName: newCategoryName });
            fetchCategories();
            setNewCategoryName('');
        } catch (err) {
            console.error("Failed to create category:", err);
        }
    };

    const handleFileUpload = async () => {
        try {
            if (!file || !selectedCategory) return;

            const fileType = file.type.split('/')[1];
            const base64 = await toBase64(file);
            const uploadResponse = await sqlService.uploadAttachment({
                base64,
                fileType,
                folder: `documents/${channelId}/${selectedCategory.id}`
            });

            await sqlService.uploadChannelDocument({
                channelId,
                categoryId: selectedCategory.id,
                userId: user.id,
                fileLink: uploadResponse.file_url
            });

            fetchDocuments(selectedCategory.id);
            setFile(null);
        } catch (err) {
            console.error("Failed to upload file:", err);
        }
    };

    const handleDeleteFile = async (documentId) => {
        try {
            await sqlService.deleteChannelDocument({ documentId });
            fetchDocuments(selectedCategory.id);
        } catch (err) {
            console.error("Failed to delete file:", err);
        }
    };

    const handlePreviewFile = (doc) => {
        const fileUrl = doc.file_link;
        const previewableExtensions = /\.(jpeg|jpg|png|gif|webp|pdf|txt)$/i;

        if (fileUrl.match(previewableExtensions)) {
            setPreviewFile(doc);
            setPreviewError(false);
        } else {
            setPreviewFile(doc);
            setPreviewError(true);
        }
    };

    const toBase64 = (file) =>
        new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = () => resolve(reader.result.split(',')[1]);
            reader.onerror = (error) => reject(error);
        });

    const userRole = user?.channels?.find((c) => c.id === parseInt(channelId))?.role;

    return (
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Professional Documents</h2>

            {/* Categories Section */}
            <div className="mb-6">
                <h3 className="text-lg font-semibold mb-2">Categories</h3>
                <div className="flex gap-4 flex-wrap">
                    {categories.map((category) => (
                        <div
                            key={category.id}
                            className={`p-4 bg-gray-100 rounded-lg shadow cursor-pointer ${selectedCategory?.id === category.id ? 'bg-blue-200' : ''}`}
                            onClick={() => setSelectedCategory(category)}
                        >
                            <FaFolder className="text-blue-500 text-2xl mb-2" />
                            <p className="text-center">{category.catagory_name}</p>
                        </div>
                    ))}
                </div>
                {(userRole === 1 || userRole === 2) && (
                    <div className="mt-4 flex items-center gap-2">
                        <input
                            type="text"
                            value={newCategoryName}
                            onChange={(e) => setNewCategoryName(e.target.value)}
                            placeholder="New Category Name"
                            className="p-2 border rounded"
                        />
                        <button
                            onClick={handleCreateCategory}
                            className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                        >
                            Add Category
                        </button>
                    </div>
                )}
            </div>

            {/* Documents Section */}
            {selectedCategory && (
                <div>
                    <h3 className="text-lg font-semibold mb-2">Documents in "{selectedCategory.catagory_name}"</h3>
                    <div className="flex gap-4 flex-wrap">
                        {documents.map((doc) => (
                            <div
                                key={doc.id}
                                className="p-4 bg-gray-100 rounded-lg shadow cursor-pointer"
                                onClick={() => handlePreviewFile(doc)}
                            >
                                <FaEye className="text-blue-500 text-2xl mb-2" />
                                <p className="text-center truncate">{doc.file_link.split('/').pop()}</p>
                            </div>
                        ))}
                    </div>
                    {(userRole === 1 || userRole === 2) && (
                        <div className="mt-4 flex items-center gap-2">
                            <input
                                type="file"
                                onChange={(e) => setFile(e.target.files[0])}
                                className="p-2 border rounded"
                            />
                            <button
                                onClick={handleFileUpload}
                                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 transition"
                            >
                                <FaUpload className="inline mr-2" /> Upload File
                            </button>
                        </div>
                    )}
                </div>
            )}

            {/* File Preview Section */}
            {previewFile && (
                <div className="mt-6 p-4 bg-white rounded-lg shadow">
                    <div className="flex justify-between items-center mb-4">
                        <h3 className="text-lg font-semibold">File Preview</h3>
                        <div className="flex gap-4">
                            <a
                                href={previewFile.file_link}
                                download
                                className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 transition"
                            >
                                <FaDownload className="inline mr-2" /> Download
                            </a>
                            {(userRole === 1 || userRole === 2) && (
                                <button
                                    onClick={() => handleDeleteFile(previewFile.id)}
                                    className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition"
                                >
                                    <FaTrash className="inline mr-2" /> Delete
                                </button>
                            )}
                        </div>
                    </div>
                    <div className="file-preview-box">
                        {!previewError ? (
                            <iframe
                                src={previewFile.file_link}
                                title="File Preview"
                                className="w-full h-full"
                            ></iframe>
                        ) : (
                            <div className="preview-error">Cannot be previewed</div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfessionalDoccuments;
