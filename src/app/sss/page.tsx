"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    Search,
    Plus,
    Edit2,
    Trash2,
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
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-border-brand pb-10">
                    <div className="relative w-full max-w-md group">
                        <Search size={16} className="absolute left-6 top-1/2 -translate-y-1/2 text-text-secondary group-focus-within:text-foreground transition-colors" />
                        <input
                            type="text"
                            placeholder="SORU ARA..."
                            className="h-16 w-full bg-surface border border-border-brand px-14 text-[10px] font-black uppercase tracking-[0.2em] outline-none focus:border-foreground/20 transition-all font-sans uppercase"
                        />
                    </div>

                    <button className="btn-primary h-16 px-10 bg-foreground text-background text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:opacity-90 shrink-0">
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
                            className="p-8 border border-border-brand bg-surface hover:border-foreground/10 transition-all flex items-start gap-8 group"
                        >
                            <div className="mt-1 text-text-secondary/20 group-hover:text-text-secondary transition-colors cursor-grab active:cursor-grabbing">
                                <GripVertical size={20} />
                            </div>

                            <div className="flex-1 flex flex-col gap-4">
                                <div className="flex items-center gap-3">
                                    <span className="text-[9px] font-black uppercase tracking-[0.3em] text-text-secondary border border-border-brand px-2 py-1">#{faq.category}</span>
                                </div>

                                <div className="flex flex-col gap-3">
                                    <h4 className="text-lg font-black uppercase tracking-tight leading-tight">{faq.question}</h4>
                                    <p className="text-sm font-medium text-text-secondary leading-relaxed max-w-3xl italic">
                                        {faq.answer}
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <button title="Düzenle" className="size-12 flex items-center justify-center border border-border-brand text-text-secondary hover:text-foreground hover:border-foreground/20 transition-all">
                                    <Edit2 size={16} />
                                </button>
                                <button title="Sil" className="size-12 flex items-center justify-center border border-border-brand text-text-secondary hover:text-red-500 hover:border-red-500/20 transition-all">
                                    <Trash2 size={16} />
                                </button>
                            </div>
                        </motion.div>
                    ))}
                </div>

                <div className="mt-8 flex justify-center">
                    <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary/30">
                        Toplam 12 soru maddesi yönetiliyor
                    </p>
                </div>
            </div>
        </DashboardLayout>
    );
}
