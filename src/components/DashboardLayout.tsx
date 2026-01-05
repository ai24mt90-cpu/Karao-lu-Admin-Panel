"use client";

import Sidebar from "./Sidebar";
import TopBar from "./TopBar";
import { motion } from "framer-motion";

interface DashboardLayoutProps {
    children: React.ReactNode;
    title: string;
}

export default function DashboardLayout({ children, title }: DashboardLayoutProps) {
    return (
        <div className="flex h-screen bg-background overflow-hidden font-sans">
            <Sidebar />

            <main className="flex-1 flex flex-col h-full overflow-y-auto overflow-x-hidden">
                <TopBar title={title} />

                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="p-10 max-w-7xl w-full mx-auto"
                >
                    {children}
                </motion.div>
            </main>
        </div>
    );
}
