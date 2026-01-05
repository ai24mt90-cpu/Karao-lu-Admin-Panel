"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    GripVertical,
    Loader2
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import FAQModal from "@/components/FAQModal";

interface FAQ {
    id?: string;
    question: string;
    answer: string;
    category: string;
    order_index?: number;
}

export default function FAQAdminPage() {
    const [faqs, setFaqs] = useState<FAQ[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingFaq, setEditingFaq] = useState<FAQ | null>(null);

    useEffect(() => {
        fetchFaqs();
    }, []);

    const fetchFaqs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("faqs")
            .select("*")
            .order("order_index", { ascending: true });

        if (error) {
            console.error("Error fetching FAQs:", error);
        } else {
            setFaqs(data || []);
        }
        setLoading(false);
    };

    const handleSave = async (faqData: FAQ) => {
        const { id, ...data } = faqData;

        let error;
        if (id) {
            const { error: updateError } = await supabase
                .from("faqs")
                .update(data)
                .eq("id", id);
            error = updateError;
        } else {
            const { error: insertError } = await supabase
                .from("faqs")
                .insert([data]);
            error = insertError;
        }

        if (error) {
            alert("Hata oluştu: " + error.message);
            throw error;
        } else {
            fetchFaqs();
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu soruyu silmek istediğinize emin misiniz?")) return;

        const { error } = await supabase
            .from("faqs")
            .delete()
            .eq("id", id);

        if (error) {
            alert("Silme hatası: " + error.message);
        } else {
            setFaqs(faqs.filter(f => f.id !== id));
        }
    };

    const filteredFaqs = faqs.filter(f =>
        f.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.answer.toLowerCase().includes(searchQuery.toLowerCase()) ||
        f.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <DashboardLayout title="Sıkça Sorulan Sorular">
            <div className="flex flex-col gap-10">

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-border-brand pb-10">
                    <div className="relative w-full max-w-md group">
                        <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors" />
                        <input
                            type="text"
                            placeholder="SORU ARA..."
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            className="input-field uppercase"
                        />
                    </div>

                    <button
                        onClick={() => {
                            setEditingFaq(null);
                            setIsModalOpen(true);
                        }}
                        className="btn-primary"
                    >
                        <Plus size={16} className="mr-3" /> Yeni Madde Ekle
                    </button>
                </div>

                {/* FAQ List */}
                <div className="flex flex-col gap-4 min-h-[400px]">
                    {loading ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-text-secondary py-20">
                            <Loader2 className="animate-spin" size={32} />
                            <p className="text-[10px] font-bold uppercase tracking-widest">Veriler Yükleniyor...</p>
                        </div>
                    ) : filteredFaqs.length === 0 ? (
                        <div className="flex-1 flex flex-col items-center justify-center gap-4 text-text-secondary py-20 border border-dashed border-border-brand">
                            <p className="text-[10px] font-bold uppercase tracking-widest">Soru Bulunamadı</p>
                        </div>
                    ) : (
                        <AnimatePresence mode="popLayout">
                            {filteredFaqs.map((faq, idx) => (
                                <motion.div
                                    key={faq.id}
                                    layout
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, scale: 0.95 }}
                                    className="p-8 border border-border-brand bg-white hover:bg-slate-50 transition-all flex items-start gap-8 group rounded-3xl hover:shadow-xl"
                                >
                                    <div className="mt-1 text-slate-200 group-hover:text-primary transition-colors cursor-grab active:cursor-grabbing">
                                        <GripVertical size={20} />
                                    </div>

                                    <div className="flex-1 flex flex-col gap-4">
                                        <div className="flex items-center gap-3">
                                            <span className="text-[9px] font-bold uppercase tracking-widest text-primary border border-primary/20 px-3 py-1 rounded-full">#{faq.category}</span>
                                        </div>

                                        <div className="flex flex-col gap-3">
                                            <h4 className="text-lg font-bold uppercase tracking-tight leading-tight text-slate-700">{faq.question}</h4>
                                            <p className="text-sm font-medium text-slate-500 leading-relaxed max-w-3xl italic">
                                                {faq.answer}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-2">
                                        <button
                                            onClick={() => {
                                                setEditingFaq(faq);
                                                setIsModalOpen(true);
                                            }}
                                            className="size-11 flex items-center justify-center border border-border-brand text-slate-400 hover:text-primary hover:border-primary/20 transition-all rounded-xl"
                                        >
                                            <Edit2 size={16} />
                                        </button>
                                        <button
                                            onClick={() => faq.id && handleDelete(faq.id)}
                                            className="size-11 flex items-center justify-center border border-border-brand text-slate-300 hover:text-red-500 hover:border-red-500/20 transition-all rounded-xl"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </motion.div>
                            ))}
                        </AnimatePresence>
                    )}
                </div>

                {!loading && filteredFaqs.length > 0 && (
                    <div className="mt-8 flex justify-center">
                        <p className="text-[10px] font-bold uppercase tracking-widest text-text-secondary/30">
                            Toplam {filteredFaqs.length} Soru Maddesi Yönetiliyor
                        </p>
                    </div>
                )}
            </div>

            <FAQModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSave={handleSave}
                editingFaq={editingFaq}
            />
        </DashboardLayout>
    );
}
