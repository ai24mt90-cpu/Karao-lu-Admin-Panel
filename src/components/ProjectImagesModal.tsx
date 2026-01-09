"use client";

import { useState, useEffect } from "react";
import { X, Plus, Trash2, Star, Loader2, Upload } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { supabase } from "@/lib/supabase";

interface ProjectImage {
    id: string;
    project_id: string;
    image_url: string;
    is_cover: boolean;
    order_index: number;
}

interface ProjectImagesModalProps {
    isOpen: boolean;
    onClose: () => void;
    projectId: string;
    projectTitle: string;
}

export default function ProjectImagesModal({ isOpen, onClose, projectId, projectTitle }: ProjectImagesModalProps) {
    const [images, setImages] = useState<ProjectImage[]>([]);
    const [loading, setLoading] = useState(false);
    const [uploading, setUploading] = useState(false);

    useEffect(() => {
        if (isOpen && projectId) {
            fetchImages();
        }
    }, [isOpen, projectId]);

    const fetchImages = async () => {
        setLoading(true);
        const { data } = await supabase
            .from("project_images")
            .select("*")
            .eq("project_id", projectId)
            .order("order_index", { ascending: true });

        setImages(data || []);
        setLoading(false);
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const files = e.target.files;
        if (!files?.length) return;

        setUploading(true);

        for (let i = 0; i < files.length; i++) {
            const file = files[i];
            const fileExt = file.name.split(".").pop();
            const fileName = `${projectId}/${Date.now()}_${i}.${fileExt}`;

            // Upload to Supabase Storage
            const { error: uploadError } = await supabase.storage
                .from("project-images")
                .upload(fileName, file);

            if (!uploadError) {
                const { data: urlData } = supabase.storage
                    .from("project-images")
                    .getPublicUrl(fileName);

                // Insert into project_images table
                await supabase.from("project_images").insert({
                    project_id: projectId,
                    image_url: urlData.publicUrl,
                    is_cover: images.length === 0 && i === 0,
                    order_index: images.length + i
                });
            }
        }

        await fetchImages();
        setUploading(false);
    };

    const handleDelete = async (imageId: string) => {
        if (!confirm("Bu fotoğrafı silmek istediğinize emin misiniz?")) return;

        await supabase.from("project_images").delete().eq("id", imageId);
        await fetchImages();
    };

    const handleSetCover = async (imageId: string) => {
        // Remove cover from all
        await supabase
            .from("project_images")
            .update({ is_cover: false })
            .eq("project_id", projectId);

        // Set new cover
        await supabase
            .from("project_images")
            .update({ is_cover: true })
            .eq("id", imageId);

        // Also update main project image_url
        const image = images.find(img => img.id === imageId);
        if (image) {
            await supabase
                .from("projects")
                .update({ image_url: image.image_url })
                .eq("id", projectId);
        }

        await fetchImages();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.95, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.95, opacity: 0 }}
                    className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden"
                    onClick={e => e.stopPropagation()}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b">
                        <div>
                            <h2 className="text-xl font-bold text-slate-800">Proje Fotoğrafları</h2>
                            <p className="text-sm text-slate-500">{projectTitle}</p>
                        </div>
                        <button onClick={onClose} className="p-2 hover:bg-slate-100 rounded-lg">
                            <X size={20} />
                        </button>
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[60vh]">
                        {loading ? (
                            <div className="flex items-center justify-center py-12">
                                <Loader2 className="animate-spin text-primary" size={32} />
                            </div>
                        ) : (
                            <>
                                {/* Upload Button */}
                                <div className="mb-6">
                                    <label className="flex items-center justify-center gap-2 p-8 border-2 border-dashed border-slate-300 rounded-xl cursor-pointer hover:border-primary hover:bg-primary/5 transition-colors">
                                        <input
                                            type="file"
                                            accept="image/*"
                                            multiple
                                            onChange={handleImageUpload}
                                            className="hidden"
                                            disabled={uploading}
                                        />
                                        {uploading ? (
                                            <>
                                                <Loader2 className="animate-spin" size={24} />
                                                <span>Yükleniyor...</span>
                                            </>
                                        ) : (
                                            <>
                                                <Upload size={24} />
                                                <span>Fotoğraf Yükle</span>
                                            </>
                                        )}
                                    </label>
                                </div>

                                {/* Images Grid */}
                                {images.length > 0 ? (
                                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                                        {images.map((image) => (
                                            <div key={image.id} className="relative group aspect-square rounded-lg overflow-hidden border">
                                                <Image
                                                    src={image.image_url}
                                                    alt="Project image"
                                                    fill
                                                    className="object-cover"
                                                />

                                                {/* Cover Badge */}
                                                {image.is_cover && (
                                                    <div className="absolute top-2 left-2 bg-yellow-500 text-white text-xs px-2 py-1 rounded-full flex items-center gap-1">
                                                        <Star size={12} fill="white" />
                                                        Kapak
                                                    </div>
                                                )}

                                                {/* Actions Overlay */}
                                                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-2">
                                                    {!image.is_cover && (
                                                        <button
                                                            onClick={() => handleSetCover(image.id)}
                                                            className="p-2 bg-yellow-500 text-white rounded-full hover:bg-yellow-600"
                                                            title="Kapak Yap"
                                                        >
                                                            <Star size={16} />
                                                        </button>
                                                    )}
                                                    <button
                                                        onClick={() => handleDelete(image.id)}
                                                        className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                                                        title="Sil"
                                                    >
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                ) : (
                                    <div className="text-center py-12 text-slate-500">
                                        <p>Henüz fotoğraf yüklenmemiş</p>
                                    </div>
                                )}
                            </>
                        )}
                    </div>

                    {/* Footer */}
                    <div className="flex justify-end gap-3 p-6 border-t bg-slate-50">
                        <button
                            onClick={onClose}
                            className="px-6 py-2.5 text-slate-600 hover:bg-slate-200 rounded-lg transition-colors"
                        >
                            Kapat
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </AnimatePresence>
    );
}
