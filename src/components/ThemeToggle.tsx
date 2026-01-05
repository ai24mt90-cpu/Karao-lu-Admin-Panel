"use client";

import { Sun, Moon } from "lucide-react";
import { useTheme } from "@/context/ThemeContext";
import { motion } from "framer-motion";

export default function ThemeToggle() {
    const { theme, toggleTheme } = useTheme();

    return (
        <button
            onClick={toggleTheme}
            className="relative size-10 flex items-center justify-center border border-border-brand bg-surface text-foreground hover:bg-foreground/5 transition-all overflow-hidden"
            title={theme === "light" ? "Karanlık Moda Geç" : "Aydınlık Moda Geç"}
        >
            <motion.div
                initial={false}
                animate={{ y: theme === "light" ? 0 : 40 }}
                className="absolute"
            >
                <Sun size={18} />
            </motion.div>
            <motion.div
                initial={false}
                animate={{ y: theme === "dark" ? 0 : -40 }}
                className="absolute"
            >
                <Moon size={18} />
            </motion.div>
        </button>
    );
}
