"use client";

import { useState, useRef } from "react";
import { Upload, X, Loader2, Image as ImageIcon } from "lucide-react";
import Image from "next/image";
import { uploadImage } from "@/lib/storage";

interface ImageUploadProps {
    value?: string;
    onChange: (url: string) => void;
    label?: string;
}

export default function ImageUpload({ value, onChange, label = "Görsel Yükle" }: ImageUploadProps) {
    const [loading, setLoading] = useState(false);
    const [isDragging, setIsDragging] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);

    const handleFileChange = async (file: File) => {
        if (!file) return;

        setLoading(true);
        try {
            const url = await uploadImage(file);
            onChange(url);
        } catch (error) {
            console.error("Upload error:", error);
            alert("Görsel yüklenirken bir hata oluştu. Lütfen 'images' bucket'ının Supabase'de oluşturulduğundan ve public olduğundan emin olun.");
        } finally {
            setLoading(false);
        }
    };

    const onDrop = (e: React.DragEvent) => {
        e.preventDefault();
        setIsDragging(false);
        const file = e.dataTransfer.files?.[0];
        if (file) handleFileChange(file);
    };

    return (
        <div className="flex flex-col gap-3">
            <label className="text-[10px] font-bold uppercase tracking-[0.2em] text-text-secondary">{label}</label>

            <div
                onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
                onDragLeave={() => setIsDragging(false)}
                onDrop={onDrop}
                className={`relative aspect-video w-full border border-dashed transition-all flex flex-col items-center justify-center gap-4 overflow-hidden bg-surface group
          ${isDragging ? 'border-primary bg-primary/5' : 'border-border-brand hover:border-primary/20'}
          ${value ? 'border-solid' : ''}`}
            >
                {value ? (
                    <>
                        <Image src={value} alt="Preview" fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-700" />
                        <div className="absolute inset-0 bg-background/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center gap-4">
                            <button
                                type="button"
                                onClick={() => fileInputRef.current?.click()}
                                className="size-12 bg-white text-primary border border-primary/20 shadow-lg flex items-center justify-center hover:scale-110 transition-transform rounded-xl"
                            >
                                <Upload size={18} />
                            </button>
                            <button
                                type="button"
                                onClick={() => onChange("")}
                                className="size-12 bg-white text-red-500 border border-red-100 shadow-lg flex items-center justify-center hover:scale-110 transition-transform rounded-xl"
                            >
                                <X size={18} />
                            </button>
                        </div>
                    </>
                ) : (
                    <div
                        onClick={() => fileInputRef.current?.click()}
                        className="flex flex-col items-center gap-4 cursor-pointer p-10 text-center"
                    >
                        <div className="size-16 border border-border-brand flex items-center justify-center text-text-secondary group-hover:text-primary group-hover:border-primary/20 transition-all rounded-2xl">
                            {loading ? <Loader2 className="animate-spin" size={24} /> : <ImageIcon size={24} />}
                        </div>
                        <div className="flex flex-col gap-1">
                            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">Görsel Seç veya Sürükle</span>
                            <span className="text-[8px] font-medium uppercase tracking-[0.2em] text-text-secondary">PNG, JPG, WEBP (Max. 5MB)</span>
                        </div>
                    </div>
                )}

                {loading && (
                    <div className="absolute inset-0 bg-background/60 backdrop-blur-sm flex flex-col items-center justify-center gap-3">
                        <Loader2 className="animate-spin text-primary" size={32} />
                        <span className="text-[9px] font-bold uppercase tracking-widest text-slate-600">Yükleniyor...</span>
                    </div>
                )}

                <input
                    type="file"
                    ref={fileInputRef}
                    className="hidden"
                    accept="image/*"
                    onChange={(e) => {
                        const file = e.target.files?.[0];
                        if (file) handleFileChange(file);
                    }}
                />
            </div>
        </div>
    );
}
