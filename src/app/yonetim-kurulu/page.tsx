"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
    UserPlus,
    Edit2,
    Trash2,
    Star,
    Mail,
    Linkedin,
    GripHorizontal
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const teamMembers = [
    {
        id: 1,
        name: "Murat Karaoğlu",
        role: "Yönetim Kurulu Başkanı",
        bio: "30 yılı aşkın inşaat ve mühendislik tecrübesiyle rasyonel büyüme stratejileri...",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuCVJ724q5gfi66dXvThSRUcFYm06qL0fg0pr8M5f8E0Y0aSjDb2lo4i-deW9WITYEvmaDUt9CZQadWCn384mXdsadpTlX1V8A-UKu5OKSKWMFMTc5OWWhCO0E1veBFE3CYyVvId2X86BGF9BFGG1G8qm04Ilh3FJJSlMR7_sUpC7WvCGNPKdKQD7301zglvbrHZp3VeYtyqZMPnRWEqZ5QVvW5no1BuE3BVNDSZirqa3hJ7gGcDC0XRDVplzDjfPjnCYO8FrW2IDfOI",
        isLeader: true
    },
    {
        id: 2,
        name: "Dr. Selim Yılmaz",
        role: "Yönetim Kurulu Üyesi / Baş Mühendis",
        bio: "Altyapı ve büyük ölçekli kamu projeleri teknik yönetimi uzmanı.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDjTd9-Tz67EW1mysNQ2X2zvtJVBoi47FCipTS74iVGywnAfwjEjkZ4Mhv4-l5BgIne3RdYNFyQMhX1y7c_pgkvAgi0a8uwvZXVHKusoVOajVl_-Ag-r21BifOaBs-iUq1bH3grb2BhtsCsZgAWV7xhErv8KgQf2f_fuULneXZyp1IjnfZFlDEvpTA7v0DFqOvcVHkaA5lorD6v78knyl0DDyHDmG8_3sFRHSDzJFtj1He_RcMOGF2GPJ7pUHW72OKBQQLbpHuQy7YW",
        isLeader: false
    },
    {
        id: 3,
        name: "Elif Demir",
        role: "Genel Müdür Yardımcısı",
        bio: "Finansal yönetim ve sürdürülebilirlik projeleri koordinatörü.",
        image: "https://lh3.googleusercontent.com/aida-public/AB6AXuDziPn0Ap9e6F4Ot3SXLowJxso70TOgUB1tNXkx0hkKrCzWPFEidW3bO53l91UmfDvoQyccBSBqQv0hJBt87xOiElnd86i9HUDGHVC3USzCEPA9oFewWBF5vWZWLW0TP8Sjqh1p9_9MD5v3wxm8Og07VOABVyV3XE-4HU9iPwxH9hycbe5oAz_FW9x9-MnE1zG-ndNVs3A8G3hjUuK6CxSru_uFBskWbGiC4u3PTOsNE0NtrvBQfYTwifNIOOBisqLavLJOEExjqOB8",
        isLeader: false
    }
];

export default function ManagementBoardAdminPage() {
    return (
        <DashboardLayout title="Yönetim Kurulu">
            <div className="flex flex-col gap-10">

                {/* Actions Bar */}
                <div className="flex flex-col md:flex-row gap-6 justify-between items-start md:items-center border-b border-white/5 pb-10">
                    <div className="flex flex-col gap-2">
                        <h3 className="text-[10px] font-black uppercase tracking-[0.4em] text-white/40">Organizasyon</h3>
                        <p className="text-sm font-black uppercase tracking-tighter text-white">Yönetici Kadrosu Yönetimi</p>
                    </div>

                    <button className="h-16 px-10 bg-white text-black text-[10px] font-black uppercase tracking-[0.3em] flex items-center justify-center gap-3 hover:bg-white/90 shrink-0">
                        <UserPlus size={16} /> Yeni Üye Ekle
                    </button>
                </div>

                {/* Members Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {teamMembers.map((member, idx) => (
                        <motion.div
                            key={member.id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: idx * 0.05 }}
                            className={`relative overflow-hidden border ${member.isLeader ? 'border-white/20 bg-white/[0.03]' : 'border-white/5 bg-white/[0.01]'} group`}
                        >
                            {/* Leader Badge */}
                            {member.isLeader && (
                                <div className="absolute top-0 right-0 p-4 z-10">
                                    <Star size={16} className="text-white fill-white" />
                                </div>
                            )}

                            <div className="flex flex-col aspect-[4/5] relative">
                                <Image src={member.image} alt={member.name} fill className="object-cover grayscale group-hover:grayscale-0 transition-all duration-1000" />
                                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/20 to-transparent" />

                                <div className="absolute bottom-0 left-0 right-0 p-8 flex flex-col gap-1">
                                    <h4 className="text-xl font-black uppercase tracking-tighter leading-none">{member.name}</h4>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-white/60 italic">{member.role}</p>
                                </div>
                            </div>

                            <div className="p-8 border-t border-white/5 bg-black/40 backdrop-blur-sm flex flex-col gap-6">
                                <p className="text-[10px] font-medium leading-relaxed text-white/40 uppercase tracking-widest line-clamp-2 italic">
                                    "{member.bio}"
                                </p>

                                <div className="flex items-center justify-between">
                                    <div className="flex gap-4">
                                        <button className="text-white/20 hover:text-white transition-colors"><Mail size={16} /></button>
                                        <button className="text-white/20 hover:text-white transition-colors"><Linkedin size={16} /></button>
                                    </div>
                                    <div className="flex gap-2">
                                        <button title="Düzenle" className="size-10 flex items-center justify-center border border-white/5 text-white/20 hover:text-white hover:border-white/20 transition-all bg-white/5">
                                            <Edit2 size={12} />
                                        </button>
                                        <button title="Sil" className="size-10 flex items-center justify-center border border-white/5 text-white/10 hover:text-red-500 hover:border-red-500/20 transition-all bg-white/5">
                                            <Trash2 size={12} />
                                        </button>
                                    </div>
                                </div>
                            </div>

                            {/* Drag Handle Dummy */}
                            <div className="absolute top-4 left-4 size-8 border border-white/10 flex items-center justify-center text-white/10 opacity-0 group-hover:opacity-100 transition-opacity cursor-move">
                                <GripHorizontal size={14} />
                            </div>
                        </motion.div>
                    ))}
                </div>

            </div>
        </DashboardLayout>
    );
}
