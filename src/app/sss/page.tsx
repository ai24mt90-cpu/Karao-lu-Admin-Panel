"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
    MessageSquare,
    HelpCircle,
    GripVertical
} from "lucide-react";
import { motion } from "framer-motion";

const faqs = [
    {
        id: 1,
        question: "Karaoğlu Universal Mühendislik hangi alanlarda faaliyet göstermektedir?",
        answer: "Firmamız kamu binaları inşaatı, altyapı projeleri, sağlık kampüsleri ve eğitim binaları başta olmak üzere geniş bir yelpazede mühendislik ve inşaat çözümleri sunmaktadır.",
        category: "Genel"
    },
    {
        id: 2,
        question: "Sosyal sorumluluk projelerine nasıl başvurabiliriz?",
        answer: "Eğitim ve spor odaklı desteklerimiz için kurumsal web sitemizdeki iletişim formu üzerinden veya sosyal sorumluluk birimimize doğrudan e-posta göndererek başvuruda bulunabilirsiniz.",
        category: "Destek"
    },
    {
        id: 3,
        question: "Projelerinizde sürdürülebilirlik standartlarınız nelerdir?",
        answer: "Tüm projelerimizde uluslararası yeşil bina standartlarını (LEED) ve enerji verimliliği protokollerini en üst düzeyde uygulamaktayız.",
        category: "Teknik"
    }
];

export default function FAQAdminPage() {
    return (
        <DashboardLayout title="Sıkça Sorulan Sorular">
            <div className="flex flex-col gap-10">

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-white/5 pb-10">
                    <div className="relative w-full max-w-md group">
                        <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-white/20 group-focus-within:text-white transition-colors" />
                        <input
                            type="text"
                            placeholder="SORU ARA..."
                            className="h-16 w-full bg-white/[0.02] border border-white/5 px-14 text-[10px] font-black uppercase tracking-[0.2em] outline-none focus:border-white/20 transition-all font-sans"
                        />
                    </div>

                    <button className="h-16 px-10 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white/90 shrink-0">
                        <Plus size={16} /> Yeni Madde Ekle
                    </button>
                </div>

                {/* FAQ List */}
                <div className="flex flex-col gap-4">
                    {faqs.map((faq, idx) => (
                        <motion.div
                            key={faq.id}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: idx * 0.05 }}
                            className="p-8 border border-white/5 bg-white/[0.01] hover:border-white/10 transition-all flex items-start gap-8 group"
                        >
                            <div className="mt-1 text-white/10 group-hover:text-white/40 transition-colors cursor-grab active:cursor-grabbing">
                                <GripVertical size={20} />
                            </div>

                            <div className="flex-1 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 border border-white/10 px-2 py-1">#{faq.category}</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h4 className="text-lg font-black uppercase tracking-tight leading-tight">{faq.question}</h4>
                                    <p className="text-sm font-medium text-white/40 leading-relaxed max-w-3xl italic">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button title="Düzenle" className="size-12 flex items-center justify-center border border-white/5 text-white/20 hover:text-white hover:border-white/20 transition-all">
                                    <Edit2 size={16} />
                                </button>
                                <button title="Sil" className="size-12 flex items-center justify-center border border-white/5 text-white/10 hover:text-red-500 hover:border-red-500/20 transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-white/10">
                        Toplam 12 soru maddesi yönetiliyor
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}
