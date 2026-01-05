"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    MapPin,
    Loader2,
    Image as ImageIcon
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface Work {
    id?: string;
    title: string;
    category: string;
    description: string;
    image_url: string;
    location: string;
    is_featured: boolean;
    order_index: number;
}

const emptyWork: Work = {
    title: "",
    category: "",
    description: "",
    image_url: "",
    location: "",
    is_featured: false,
    order_index: 0
};

export default function WorksAdminPage() {
    const [works, setWorks] = useState<Work[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingWork, setEditingWork] = useState<Work | null>(null);
    const [formData, setFormData] = useState<Work>(emptyWork);
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchWorks();
    }, []);

    const fetchWorks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("works")
            .select("*")
            .order("order_index", { ascending: true });

        if (error) {
            console.error("Error fetching works:", error);
        } else {
            setWorks(data || []);
        }
        setLoading(false);
    };

    const openModal = (work?: Work) => {
        if (work) {
            setEditingWork(work);
            setFormData(work);
        } else {
            setEditingWork(null);
            setFormData(emptyWork);
        }
        setIsModalOpen(true);
    };

    const handleSave = async () => {
        setSaving(true);
        const { id, ...data } = formData;

        let error;
        if (editingWork?.id) {
            const { error: updateError } = await supabase
                .from("works")
                .update(data)
                .eq("id", editingWork.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("works")
                .insert([data]);
            error = insertError;
        }

        if (error) {
            alert("Hata oluştu: " + error.message);
        } else {
            fetchWorks();
            setIsModalOpen(false);
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu çalışmayı silmek istediğinize emin misiniz?")) return;

        const { error } = await supabase
            .from("works")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Silme hatası: " + error.message);
        } else {
            setWorks(works.filter(w => w.id !== id));
        }
    };

    const filteredWorks = works.filter(w =>
        w.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.location?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        w.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout title="Son Çalışmalarımız">
            <div className="p-8 lg:p-12 min-h-screen">
                {/* Header */}
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6 mb-12">
                    <div>
                        <h1 className="text-3xl font-bold text-foreground mb-2">
                            Son Çalışmalarımız
                        </h1>
                        <p className="text-text-secondary">
                            {works.length} çalışma kayıtlı
                        </p>
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-3 bg-primary text-white px-6 py-3 font-semibold hover:bg-primary/90 transition-colors shadow-lg"
                    >
                        <Plus size={18} />
                        Yeni Çalışma Ekle
                    </button>
                </div>

                {/* Search Bar */}
                <div className="relative mb-8">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-text-secondary" size={18} />
                    <input
                        type="text"
                        placeholder="Çalışma ara..."
                        className="w-full h-12 pl-12 pr-4 bg-surface border border-border-brand focus:border-primary outline-none transition-colors"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Works Grid */}
                {loading ? (
                    <div className="flex items-center justify-center py-20">
                        <Loader2 className="animate-spin text-primary" size={32} />
                    </div>
                ) : filteredWorks.length === 0 ? (
                    <div className="text-center py-20 bg-surface border border-border-brand">
                        <ImageIcon className="mx-auto mb-4 text-text-secondary" size={48} />
                        <p className="text-text-secondary">Henüz çalışma eklenmemiş</p>
                    </div>
                ) : (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredWorks.map((work) => (
                            <motion.div
                                key={work.id}
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                className="bg-surface border border-border-brand overflow-hidden group hover:shadow-lg transition-shadow"
                            >
                                <div className="relative aspect-video bg-surface-secondary">
                                    {work.image_url ? (
                                        <Image
                                            src={work.image_url}
                                            alt={work.title}
                                            fill
                                            className="object-cover"
                                        />
                                    ) : (
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <ImageIcon className="text-text-secondary" size={40} />
                                        </div>
                                    )}
                                    {work.is_featured && (
                                        <div className="absolute top-3 left-3 px-3 py-1 bg-primary text-white text-xs font-bold">
                                            ÖNE ÇIKAN
                                        </div>
                                    )}
                                </div>
                                <div className="p-6">
                                    <span className="text-xs font-bold text-primary uppercase tracking-wider">
                                        {work.category}
                                    </span>
                                    <h3 className="text-lg font-bold mt-2 mb-2">{work.title}</h3>
                                    {work.location && (
                                        <div className="flex items-center gap-2 text-text-secondary text-sm">
                                            <MapPin size={14} />
                                            {work.location}
                                        </div>
                                    )}
                                    <div className="flex gap-2 mt-4">
                                        <button
                                            onClick={() => openModal(work)}
                                            className="flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary hover:bg-primary/20 transition-colors text-sm font-medium"
                                        >
                                            <Edit2 size={14} />
                                            Düzenle
                                        </button>
                                        <button
                                            onClick={() => work.id && handleDelete(work.id)}
                                            className="flex items-center gap-2 px-4 py-2 bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
                                        >
                                            <Trash2 size={14} />
                                            Sil
                                        </button>
                                    </div>
                                </div>
                            </motion.div>
                        ))}
                    </div>
                )}

                {/* Modal */}
                <AnimatePresence>
                    {isModalOpen && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                            onClick={() => setIsModalOpen(false)}
                        >
                            <motion.div
                                initial={{ scale: 0.95, opacity: 0 }}
                                animate={{ scale: 1, opacity: 1 }}
                                exit={{ scale: 0.95, opacity: 0 }}
                                className="bg-surface w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto"
                                onClick={(e) => e.stopPropagation()}
                            >
                                <h2 className="text-2xl font-bold mb-6">
                                    {editingWork ? "Çalışmayı Düzenle" : "Yeni Çalışma Ekle"}
                                </h2>

                                <div className="space-y-4">
                                    <div>
                                        <label className="block text-sm font-medium mb-2">Başlık *</label>
                                        <input
                                            type="text"
                                            className="w-full h-12 px-4 bg-background border border-border-brand focus:border-primary outline-none"
                                            value={formData.title}
                                            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Kategori *</label>
                                        <select
                                            className="w-full h-12 px-4 bg-background border border-border-brand focus:border-primary outline-none"
                                            value={formData.category}
                                            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        >
                                            <option value="">Kategori Seçin</option>
                                            <option value="Konut">Konut</option>
                                            <option value="Ticari">Ticari</option>
                                            <option value="Altyapı">Altyapı</option>
                                            <option value="Endüstriyel">Endüstriyel</option>
                                            <option value="Restorasyon">Restorasyon</option>
                                        </select>
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Lokasyon</label>
                                        <input
                                            type="text"
                                            className="w-full h-12 px-4 bg-background border border-border-brand focus:border-primary outline-none"
                                            value={formData.location}
                                            onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Görsel URL</label>
                                        <input
                                            type="text"
                                            className="w-full h-12 px-4 bg-background border border-border-brand focus:border-primary outline-none"
                                            value={formData.image_url}
                                            onChange={(e) => setFormData({ ...formData, image_url: e.target.value })}
                                            placeholder="https://..."
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Açıklama</label>
                                        <textarea
                                            className="w-full h-24 px-4 py-3 bg-background border border-border-brand focus:border-primary outline-none resize-none"
                                            value={formData.description}
                                            onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                                        />
                                    </div>

                                    <div>
                                        <label className="block text-sm font-medium mb-2">Sıra</label>
                                        <input
                                            type="number"
                                            className="w-full h-12 px-4 bg-background border border-border-brand focus:border-primary outline-none"
                                            value={formData.order_index}
                                            onChange={(e) => setFormData({ ...formData, order_index: parseInt(e.target.value) || 0 })}
                                        />
                                    </div>

                                    <div className="flex items-center gap-3">
                                        <input
                                            type="checkbox"
                                            id="is_featured"
                                            checked={formData.is_featured}
                                            onChange={(e) => setFormData({ ...formData, is_featured: e.target.checked })}
                                            className="w-5 h-5"
                                        />
                                        <label htmlFor="is_featured" className="text-sm font-medium">Öne Çıkan</label>
                                    </div>
                                </div>

                                <div className="flex gap-4 mt-8">
                                    <button
                                        onClick={() => setIsModalOpen(false)}
                                        className="flex-1 h-12 border border-border-brand hover:bg-background transition-colors font-medium"
                                    >
                                        İptal
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving || !formData.title || !formData.category}
                                        className="flex-1 h-12 bg-primary text-white hover:bg-primary/90 transition-colors font-medium disabled:opacity-50"
                                    >
                                        {saving ? "Kaydediliyor..." : "Kaydet"}
                                    </button>
                                </div>
                            </motion.div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </DashboardLayout>
    );
}
