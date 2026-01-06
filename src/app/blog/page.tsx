"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    Loader2,
    Calendar
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import ImageUpload from "@/components/ImageUpload";

interface BlogPost {
    id?: string;
    title: string;
    summary: string;
    content: string;
    author: string;
    category: string;
    read_time: string;
    image_url?: string;
    created_at?: string;
}

const categories = ["Mühendislik", "Sürdürülebilirlik", "İş Güvenliği", "Yönetim", "Teknoloji"];

export default function BlogAdminPage() {
    const [posts, setPosts] = useState<BlogPost[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingItem, setEditingItem] = useState<BlogPost | null>(null);
    const [formData, setFormData] = useState<BlogPost>({
        title: "",
        summary: "",
        content: "",
        author: "",
        category: "Mühendislik",
        read_time: "5 dk",
        image_url: ""
    });
    const [saving, setSaving] = useState(false);

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("blog_posts")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching posts:", error);
        } else {
            setPosts(data || []);
        }
        setLoading(false);
    };

    const handleSave = async () => {
        setSaving(true);
        const { id, ...data } = formData;

        let error;
        if (editingItem?.id) {
            const { error: updateError } = await supabase
                .from("blog_posts")
                .update(data)
                .eq("id", editingItem.id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("blog_posts")
                .insert([data]);
            error = insertError;
        }

        if (error) {
            alert("Hata oluştu: " + error.message);
        } else {
            fetchPosts();
            closeModal();
        }
        setSaving(false);
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu blog yazısını silmek istediğinize emin misiniz?")) return;

        const { error } = await supabase
            .from("blog_posts")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Silme hatası: " + error.message);
        } else {
            setPosts(posts.filter(p => p.id !== id));
        }
    };

    const openModal = (item?: BlogPost) => {
        if (item) {
            setEditingItem(item);
            setFormData(item);
        } else {
            setEditingItem(null);
            setFormData({ title: "", summary: "", content: "", author: "", category: "Mühendislik", read_time: "5 dk", image_url: "" });
        }
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
        setEditingItem(null);
        setFormData({ title: "", summary: "", content: "", author: "", category: "Mühendislik", read_time: "5 dk", image_url: "" });
    };

    const filteredPosts = posts.filter(p =>
        p.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.summary.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.author.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout title="Blog Yönetimi">
            <div className="flex flex-col gap-10">
                {/* Header */}
                <div className="flex items-center justify-between gap-4">
                    <div className="relative flex-1 max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={18} />
                        <input
                            type="text"
                            placeholder="Blog yazısı ara..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="w-full h-11 pl-10 pr-4 border border-slate-200 rounded-lg focus:border-primary focus:outline-none"
                        />
                    </div>
                    <button
                        onClick={() => openModal()}
                        className="flex items-center gap-2 h-11 px-6 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors"
                    >
                        <Plus size={18} />
                        Yeni Yazı
                    </button>
                </div>

                {/* Table */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    {loading ? (
                        <div className="flex items-center justify-center py-20">
                            <Loader2 className="animate-spin text-primary" size={32} />
                        </div>
                    ) : filteredPosts.length === 0 ? (
                        <div className="text-center py-20 text-slate-400">
                            Henüz blog yazısı bulunmuyor
                        </div>
                    ) : (
                        <table className="w-full">
                            <thead className="bg-slate-50 border-b border-slate-200">
                                <tr>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Görsel</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Başlık</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Yazar</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Kategori</th>
                                    <th className="text-left px-6 py-4 text-xs font-semibold text-slate-500 uppercase">Tarih</th>
                                    <th className="text-right px-6 py-4 text-xs font-semibold text-slate-500 uppercase">İşlemler</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredPosts.map((item) => (
                                    <tr key={item.id} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                        <td className="px-6 py-4">
                                            {item.image_url ? (
                                                <img src={item.image_url} alt="" className="w-16 h-12 object-cover rounded" />
                                            ) : (
                                                <div className="w-16 h-12 bg-slate-200 rounded" />
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-700">{item.title}</div>
                                            <div className="text-sm text-slate-400 line-clamp-1">{item.summary}</div>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-600">{item.author}</td>
                                        <td className="px-6 py-4">
                                            <span className="px-2 py-1 bg-primary/10 text-primary text-xs font-medium rounded">
                                                {item.category}
                                            </span>
                                        </td>
                                        <td className="px-6 py-4 text-sm text-slate-500">
                                            {item.created_at ? new Date(item.created_at).toLocaleDateString('tr-TR') : '-'}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="flex items-center justify-end gap-2">
                                                <button onClick={() => openModal(item)} className="p-2 text-slate-400 hover:text-primary transition-colors">
                                                    <Edit2 size={16} />
                                                </button>
                                                <button onClick={() => handleDelete(item.id!)} className="p-2 text-slate-400 hover:text-red-500 transition-colors">
                                                    <Trash2 size={16} />
                                                </button>
                                            </div>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            {/* Modal */}
            <AnimatePresence>
                {isModalOpen && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
                        onClick={closeModal}
                    >
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 0.9, opacity: 0 }}
                            className="bg-white rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                            onClick={(e) => e.stopPropagation()}
                        >
                            <div className="p-6 border-b border-slate-200">
                                <h2 className="text-xl font-bold text-slate-700">
                                    {editingItem ? "Blog Yazısı Düzenle" : "Yeni Blog Yazısı"}
                                </h2>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Başlık</label>
                                    <input
                                        type="text"
                                        value={formData.title}
                                        onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                                        className="w-full h-11 px-4 border border-slate-200 rounded-lg focus:border-primary focus:outline-none"
                                    />
                                </div>
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-2">Yazar</label>
                                        <input
                                            type="text"
                                            value={formData.author}
                                            onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                                            className="w-full h-11 px-4 border border-slate-200 rounded-lg focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                    <div>
                                        <label className="block text-sm font-medium text-slate-600 mb-2">Okuma Süresi</label>
                                        <input
                                            type="text"
                                            value={formData.read_time}
                                            onChange={(e) => setFormData({ ...formData, read_time: e.target.value })}
                                            placeholder="5 dk"
                                            className="w-full h-11 px-4 border border-slate-200 rounded-lg focus:border-primary focus:outline-none"
                                        />
                                    </div>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Kategori</label>
                                    <select
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                        className="w-full h-11 px-4 border border-slate-200 rounded-lg focus:border-primary focus:outline-none"
                                    >
                                        {categories.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Özet</label>
                                    <textarea
                                        value={formData.summary}
                                        onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                                        rows={2}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-primary focus:outline-none resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">İçerik</label>
                                    <textarea
                                        value={formData.content}
                                        onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                                        rows={8}
                                        className="w-full px-4 py-3 border border-slate-200 rounded-lg focus:border-primary focus:outline-none resize-none"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-slate-600 mb-2">Görsel</label>
                                    <ImageUpload
                                        value={formData.image_url || ""}
                                        onChange={(url) => setFormData({ ...formData, image_url: url })}
                                    />
                                </div>
                            </div>
                            <div className="p-6 border-t border-slate-200 flex justify-end gap-3">
                                <button onClick={closeModal} className="px-6 py-2 text-slate-600 hover:bg-slate-100 rounded-lg transition-colors">
                                    İptal
                                </button>
                                <button
                                    onClick={handleSave}
                                    disabled={saving || !formData.title}
                                    className="px-6 py-2 bg-primary text-white font-medium rounded-lg hover:bg-primary/90 transition-colors disabled:opacity-50"
                                >
                                    {saving ? "Kaydediliyor..." : "Kaydet"}
                                </button>
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </DashboardLayout>
    );
}
