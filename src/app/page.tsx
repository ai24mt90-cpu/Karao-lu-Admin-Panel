"use client";

import DashboardLayout from "@/components/DashboardLayout";
import {
  Building2,
  Users,
  School,
  ArrowUpRight,
  TrendingUp,
  Clock,
  ExternalLink,
  Plus
} from "lucide-react";
import { motion } from "framer-motion";
import Image from "next/image";

const stats = [
  { label: "Aktif Projeler", value: "12", icon: <Building2 className="text-white" />, trend: "+2 bu ay" },
  { label: "Toplam İstihdam", value: "2.540", icon: <Users className="text-white" />, trend: "+120 bu ay" },
  { label: "Bağışlanan Okullar", value: "14", icon: <School className="text-white" />, trend: "+1 planlanan" },
];

const recentProjects = [
  {
    id: 1,
    title: "Şehir Hastanesi A Blok",
    location: "Sivas",
    progress: 75,
    status: "Devam Ediyor",
    image: "https://images.unsplash.com/photo-1541888946425-d81bb19480c5?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 2,
    title: "Vanspor Stadyum Yenileme",
    location: "Van",
    progress: 45,
    status: "Başlangıç",
    image: "https://images.unsplash.com/photo-1574629810360-7efbbe195018?auto=format&fit=crop&q=80&w=800"
  },
  {
    id: 3,
    title: "Anadolu Lisesi Kompleksi",
    location: "Ankara",
    progress: 100,
    status: "Tamamlandı",
    image: "https://images.unsplash.com/photo-1577412647305-991150c7d163?auto=format&fit=crop&q=80&w=800"
  }
];

const activities = [
  { time: "2 saat önce", event: "Yeni proje eklendi", detail: "Beykoz Toplum Merkezi", user: "Admin" },
  { time: "5 saat önce", event: "Görsel güncellendi", detail: "Sivas Hastane Projesi", user: "Admin" },
  { time: "Dün", event: "S.S.S. güncellendi", detail: "Burs başvuruları hakkında 2 madde", user: "Admin" },
];

export default function OverviewPage() {
  return (
    <DashboardLayout title="Genel Bakış">
      <div className="flex flex-col gap-12">

        {/* Welcome Section */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8">
          <div className="flex flex-col gap-4">
            <h1 className="text-4xl md:text-6xl font-black uppercase tracking-tighter">Hoş Geldiniz</h1>
            <p className="text-[10px] font-black uppercase tracking-[0.4em] text-text-secondary leading-loose">
              Karaoğlu Universal Mühendislik <br /> <span className="text-white">Dijital Yönetim Merkezi</span>
            </p>
          </div>
          <div className="flex gap-4">
            <button className="h-14 px-8 border border-white/20 bg-transparent text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/5 transition-all">
              Rapor Al
            </button>
            <button className="h-14 px-8 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] hover:bg-white/90 transition-all flex items-center gap-3">
              <Plus size={14} /> Yeni İçerik
            </button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stats.map((stat, idx) => (
            <div key={stat.label} className="p-10 border border-white/5 bg-white/[0.02] flex flex-col gap-8">
              <div className="flex justify-between items-start">
                <div className="opacity-40">{stat.icon}</div>
                <div className="text-[8px] font-black text-white/20 border border-white/10 px-2 py-1 uppercase tracking-widest">{stat.trend}</div>
              </div>
              <div className="flex flex-col gap-2">
                <span className="text-[9px] font-black uppercase tracking-[0.4em] text-text-secondary">{stat.label}</span>
                <span className="text-5xl font-black tracking-tighter">{stat.value}</span>
              </div>
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          {/* Projects Column */}
          <div className="lg:col-span-2 flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <h2 className="text-lg font-black uppercase tracking-[0.4em]">Son Projeler</h2>
              <button className="text-[10px] font-black uppercase tracking-[0.2em] text-white/40 hover:text-white transition-colors">Tümünü Yönet</button>
            </div>

            <div className="flex flex-col gap-4">
              {recentProjects.map((project) => (
                <div key={project.id} className="group p-6 border border-white/5 bg-white/[0.01] hover:border-white/20 flex items-center gap-8 transition-all">
                  <div className="relative size-20 shrink-0 overflow-hidden grayscale group-hover:grayscale-0 transition-all duration-700">
                    <Image src={project.image} alt={project.title} fill className="object-cover" />
                  </div>
                  <div className="flex-1 flex flex-col gap-2">
                    <div className="flex justify-between items-start">
                      <div>
                        <span className="text-[8px] font-black text-white/20 uppercase tracking-[0.4em] block mb-1">{project.location}</span>
                        <h4 className="text-lg font-black uppercase tracking-tighter">{project.title}</h4>
                      </div>
                      <span className={`text-[8px] font-black px-2 py-1 uppercase tracking-widest ${project.status === "Tamamlandı" ? "bg-white text-black" : "border border-white/10 text-white"}`}>
                        {project.status}
                      </span>
                    </div>
                    {/* Tiny progress line */}
                    <div className="w-full h-[1px] bg-white/5 mt-2">
                      <div className="h-full bg-white/40" style={{ width: `${project.progress}%` }} />
                    </div>
                  </div>
                  <button className="size-10 flex items-center justify-center text-white/20 group-hover:text-white transition-colors">
                    <ArrowUpRight size={18} />
                  </button>
                </div>
              ))}
            </div>
          </div>

          {/* Activity Timeline */}
          <div className="flex flex-col gap-8">
            <div className="flex items-center justify-between border-b border-white/5 pb-6">
              <h2 className="text-lg font-black uppercase tracking-[0.4em]">Aktivite</h2>
            </div>

            <div className="flex flex-col gap-8">
              {activities.map((activity, idx) => (
                <div key={idx} className="flex gap-6 relative">
                  {idx !== activities.length - 1 && <div className="absolute left-[9px] top-6 bottom-[-20px] w-[1px] bg-white/5" />}
                  <div className="size-[19px] rounded-none border border-white/20 bg-black shrink-0 mt-1 flex items-center justify-center">
                    <Clock size={8} className="text-white/40" />
                  </div>
                  <div className="flex flex-col gap-2">
                    <span className="text-[8px] font-black uppercase tracking-[0.3em] text-white/20">{activity.time}</span>
                    <h5 className="text-[10px] font-black uppercase tracking-widest">{activity.event}</h5>
                    <p className="text-[10px] font-medium text-text-secondary uppercase tracking-widest">{activity.detail}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto p-10 border border-white/5 bg-white/[0.01] flex flex-col items-center text-center gap-6">
              <TrendingUp className="text-white/20" size={32} />
              <p className="text-[9px] font-black uppercase tracking-[0.4em] leading-loose text-text-secondary">
                Siteniz son 7 günde <br /> <span className="text-white">1.2k defa</span> görüntülendi.
              </p>
              <button className="text-[9px] font-black uppercase tracking-[0.2em] border-b border-white hover:border-white/40 transition-colors pb-1">İstatistikleri Gör</button>
            </div>
          </div>
        </div>

      </div>
    </DashboardLayout>
  );
}
