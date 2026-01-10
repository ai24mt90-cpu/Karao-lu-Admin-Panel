"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    Mail,
    Trash2,
    Loader2,
    Eye,
    EyeOff,
    Phone,
    Calendar,
    User
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";

interface ContactMessage {
    id: string;
    name: string;
    email: string;
    phone?: string;
    subject: string;
    message: string;
    is_read: boolean;
    created_at: string;
}

export default function MessagesPage() {
    const [messages, setMessages] = useState<ContactMessage[]>([]);
    const [loading, setLoading] = useState(true);
    const [selectedMessage, setSelectedMessage] = useState<ContactMessage | null>(null);

    useEffect(() => {
        fetchMessages();
    }, []);

    const fetchMessages = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from("contact_messages")
            .select("*")
            .order("created_at", { ascending: false });

        if (error) {
            console.error("Error fetching messages:", error);
        } else {
            setMessages(data || []);
        }
        setLoading(false);
    };

    const markAsRead = async (id: string, is_read: boolean) => {
        const { error } = await supabase
            .from("contact_messages")
            .update({ is_read })
            .eq("id", id);

        if (!error) {
            setMessages(messages.map(m => m.id === id ? { ...m, is_read } : m));
        }
    };

    const handleDelete = async (id: string) => {
        if (!confirm("Bu mesajı silmek istediğinize emin misiniz?")) return;

        const { error } = await supabase
            .from("contact_messages")
            .delete()
            .eq("id", id);

        if (!error) {
            setMessages(messages.filter(m => m.id !== id));
            if (selectedMessage?.id === id) setSelectedMessage(null);
        }
    };

    const formatDate = (dateStr: string) => {
        return new Date(dateStr).toLocaleDateString("tr-TR", {
            day: "2-digit",
            month: "2-digit",
            year: "numeric",
            hour: "2-digit",
            minute: "2-digit"
        });
    };

    const unreadCount = messages.filter(m => !m.is_read).length;

    return (
        <DashboardLayout title="İletişim Mesajları">
            <div className="flex flex-col gap-6">

                {/* Stats */}
                <div className="flex gap-4">
                    <div className="bg-primary/10 px-6 py-3 rounded-lg">
                        <span className="text-2xl font-bold text-primary">{messages.length}</span>
                        <span className="text-sm text-text-secondary ml-2">Toplam Mesaj</span>
                    </div>
                    <div className="bg-yellow-50 px-6 py-3 rounded-lg">
                        <span className="text-2xl font-bold text-yellow-600">{unreadCount}</span>
                        <span className="text-sm text-text-secondary ml-2">Okunmamış</span>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Messages List */}
                    <div className="bg-white rounded-2xl border border-border-brand overflow-hidden">
                        <div className="p-4 border-b border-border-brand">
                            <h3 className="font-bold text-foreground">Gelen Mesajlar</h3>
                        </div>

                        <div className="max-h-[600px] overflow-y-auto">
                            {loading ? (
                                <div className="flex items-center justify-center py-20">
                                    <Loader2 className="animate-spin text-primary" size={32} />
                                </div>
                            ) : messages.length === 0 ? (
                                <div className="text-center py-20 text-text-secondary">
                                    <Mail size={48} className="mx-auto mb-4 opacity-30" />
                                    <p>Henüz mesaj yok</p>
                                </div>
                            ) : (
                                <AnimatePresence mode="popLayout">
                                    {messages.map((msg) => (
                                        <motion.div
                                            key={msg.id}
                                            layout
                                            initial={{ opacity: 0 }}
                                            animate={{ opacity: 1 }}
                                            exit={{ opacity: 0 }}
                                            onClick={() => {
                                                setSelectedMessage(msg);
                                                if (!msg.is_read) markAsRead(msg.id, true);
                                            }}
                                            className={`p-4 border-b border-border-brand cursor-pointer hover:bg-slate-50 transition-colors ${selectedMessage?.id === msg.id ? "bg-slate-50" : ""
                                                } ${!msg.is_read ? "bg-primary/5" : ""}`}
                                        >
                                            <div className="flex items-start justify-between gap-3">
                                                <div className="flex-1 min-w-0">
                                                    <div className="flex items-center gap-2 mb-1">
                                                        {!msg.is_read && (
                                                            <span className="w-2 h-2 bg-primary rounded-full flex-shrink-0" />
                                                        )}
                                                        <h4 className="font-semibold text-foreground truncate">{msg.name}</h4>
                                                    </div>
                                                    <p className="text-sm text-primary font-medium mb-1">{msg.subject}</p>
                                                    <p className="text-xs text-text-secondary truncate">{msg.message}</p>
                                                </div>
                                                <span className="text-[10px] text-text-secondary whitespace-nowrap">
                                                    {formatDate(msg.created_at)}
                                                </span>
                                            </div>
                                        </motion.div>
                                    ))}
                                </AnimatePresence>
                            )}
                        </div>
                    </div>

                    {/* Message Detail */}
                    <div className="bg-white rounded-2xl border border-border-brand overflow-hidden">
                        <div className="p-4 border-b border-border-brand">
                            <h3 className="font-bold text-foreground">Mesaj Detayı</h3>
                        </div>

                        {selectedMessage ? (
                            <div className="p-6">
                                <div className="flex items-start justify-between mb-6">
                                    <div>
                                        <h4 className="text-xl font-bold text-foreground mb-1">{selectedMessage.subject}</h4>
                                        <p className="text-sm text-text-secondary">{formatDate(selectedMessage.created_at)}</p>
                                    </div>
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => markAsRead(selectedMessage.id, !selectedMessage.is_read)}
                                            className="p-2 border border-border-brand rounded-lg hover:bg-slate-50 transition-colors"
                                            title={selectedMessage.is_read ? "Okunmadı işaretle" : "Okundu işaretle"}
                                        >
                                            {selectedMessage.is_read ? <EyeOff size={16} /> : <Eye size={16} />}
                                        </button>
                                        <button
                                            onClick={() => handleDelete(selectedMessage.id)}
                                            className="p-2 border border-border-brand rounded-lg hover:bg-red-50 hover:text-red-500 transition-colors"
                                        >
                                            <Trash2 size={16} />
                                        </button>
                                    </div>
                                </div>

                                <div className="space-y-4 mb-6">
                                    <div className="flex items-center gap-3 text-sm">
                                        <User size={16} className="text-text-secondary" />
                                        <span className="font-medium">{selectedMessage.name}</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-sm">
                                        <Mail size={16} className="text-text-secondary" />
                                        <a href={`mailto:${selectedMessage.email}`} className="text-primary hover:underline">
                                            {selectedMessage.email}
                                        </a>
                                    </div>
                                    {selectedMessage.phone && (
                                        <div className="flex items-center gap-3 text-sm">
                                            <Phone size={16} className="text-text-secondary" />
                                            <a href={`tel:${selectedMessage.phone}`} className="text-primary hover:underline">
                                                {selectedMessage.phone}
                                            </a>
                                        </div>
                                    )}
                                </div>

                                <div className="bg-slate-50 p-4 rounded-lg">
                                    <p className="text-foreground whitespace-pre-wrap">{selectedMessage.message}</p>
                                </div>

                                <div className="mt-6">
                                    <a
                                        href={`mailto:${selectedMessage.email}?subject=Re: ${selectedMessage.subject}`}
                                        className="inline-flex items-center gap-2 bg-primary text-white px-6 py-3 font-semibold hover:bg-primary-dark transition-colors rounded-lg"
                                    >
                                        <Mail size={16} />
                                        Yanıtla
                                    </a>
                                </div>
                            </div>
                        ) : (
                            <div className="flex items-center justify-center h-[400px] text-text-secondary">
                                <div className="text-center">
                                    <Mail size={48} className="mx-auto mb-4 opacity-30" />
                                    <p>Görüntülemek için bir mesaj seçin</p>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </DashboardLayout>
    );
}
