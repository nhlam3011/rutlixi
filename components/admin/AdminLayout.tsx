'use client'

import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import {
    LayoutDashboard,
    History,
    Gift,
    Settings,
    LogOut,
    Menu,
    X
} from 'lucide-react'
import { Button } from "@/components/ui/button"

interface AdminLayoutProps {
    children: React.ReactNode
    activeTab: string
    setActiveTab: (tab: string) => void
    onLogout: () => void
    adminName?: string
}

export function AdminLayout({
    children,
    activeTab,
    setActiveTab,
    onLogout,
    adminName = "Quản trị viên"
}: AdminLayoutProps) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const menuItems = [
        { id: 'history', label: 'Lịch Sử Rút', icon: History },
        { id: 'prizes', label: 'Giải Thưởng', icon: Gift },
        { id: 'stats', label: 'Thống Kê', icon: LayoutDashboard },
        { id: 'settings', label: 'Cài Đặt', icon: Settings },
    ]

    return (
        <div className="min-h-screen bg-[#FDFCF0] flex flex-col md:flex-row font-sans text-red-950">
            {/* Mobile Header */}
            <div className="md:hidden flex items-center justify-between p-4 bg-red-700 border-b-2 border-yellow-500 sticky top-0 z-50 shadow-lg">
                <div className="flex items-center gap-2">
                    <div className="w-8 h-8 bg-yellow-500 rounded-full flex items-center justify-center text-xl shadow-inner border border-red-900">🐎</div>
                    <span className="font-serif font-black text-yellow-100 uppercase tracking-tighter">Bính Ngọ 2026</span>
                </div>
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                    className="text-yellow-100"
                >
                    {isSidebarOpen ? <X /> : <Menu />}
                </Button>
            </div>

            {/* Sidebar (Desktop) & Drawer (Mobile Overlay) */}
            <AnimatePresence>
                {(isSidebarOpen || typeof window !== 'undefined' && window.innerWidth >= 768) && (
                    <motion.aside
                        initial={{ x: -300, opacity: 0 }}
                        animate={{ x: 0, opacity: 1 }}
                        exit={{ x: -300, opacity: 0 }}
                        className={`
                            fixed md:sticky top-0 left-0 h-screen w-72 bg-red-900 text-yellow-100 z-40 p-6 flex flex-col border-r-4 border-yellow-600
                            ${isSidebarOpen ? 'block' : 'hidden md:flex'}
                        `}
                    >
                        <div className="mb-10 flex flex-col items-center">
                            <div className="w-20 h-20 bg-yellow-500 rounded-[2rem] flex items-center justify-center text-5xl shadow-2xl border-4 border-red-950 mb-4 transform -rotate-6">🐎</div>
                            <h2 className="text-2xl font-black font-serif uppercase tracking-tighter text-center leading-none">Admin<br /><span className="text-yellow-500">Portal</span></h2>
                            <div className="mt-2 h-1 w-12 bg-yellow-500 rounded-full opacity-50" />
                        </div>

                        <nav className="flex-1 space-y-2">
                            {menuItems.map((item) => (
                                <button
                                    key={item.id}
                                    onClick={() => {
                                        setActiveTab(item.id)
                                        setIsSidebarOpen(false)
                                    }}
                                    className={`
                                        w-full flex items-center gap-4 px-6 py-4 rounded-2xl font-bold transition-all group
                                        ${activeTab === item.id
                                            ? 'bg-yellow-500 text-red-950 shadow-xl scale-105'
                                            : 'hover:bg-red-800 text-yellow-100/70 hover:text-yellow-100'}
                                    `}
                                >
                                    <item.icon className={`w-5 h-5 ${activeTab === item.id ? 'animate-bounce' : 'group-hover:scale-110 transition-transform'}`} />
                                    {item.label}
                                </button>
                            ))}
                        </nav>

                        <div className="mt-auto pt-6 border-t border-yellow-500/20">
                            <div className="flex items-center gap-3 mb-6 px-4">
                                <div className="w-10 h-10 rounded-full bg-red-800 border border-yellow-500/30 flex items-center justify-center font-bold">
                                    {adminName.charAt(0)}
                                </div>
                                <div className="text-xs">
                                    <p className="font-black text-yellow-500 uppercase">{adminName}</p>
                                    <p className="opacity-50">Administrator</p>
                                </div>
                            </div>
                            <Button
                                onClick={onLogout}
                                className="w-full bg-red-950/50 hover:bg-red-950 border border-red-700 text-red-200 font-bold py-6 rounded-2xl"
                            >
                                <LogOut className="w-4 h-4 mr-2" /> Thoát Hệ Thống
                            </Button>
                        </div>
                    </motion.aside>
                )}
            </AnimatePresence>

            {/* Main Content */}
            <main className="flex-1 min-h-screen relative overflow-x-hidden">
                <div className="p-4 md:p-10 max-w-7xl mx-auto">
                    {children}
                </div>

                {/* Decorative Background Elements */}
                <div className="fixed bottom-0 right-0 p-10 opacity-[0.03] pointer-events-none -z-10">
                    <div className="text-[20rem] font-serif font-black select-none">福</div>
                </div>
            </main>

            {/* Bottom Nav (Mobile only fallback) */}
            <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 bg-white/95 backdrop-blur-2xl border-2 border-red-100 px-6 py-3 rounded-[2.5rem] shadow-[0_20px_50px_rgba(0,0,0,0.15)] z-40 flex gap-8 items-center ring-4 ring-black/5">
                {menuItems.slice(0, 3).map((item) => (
                    <button
                        key={item.id}
                        onClick={() => setActiveTab(item.id)}
                        className={`flex flex-col items-center gap-1 transition-all ${activeTab === item.id ? 'text-red-700 scale-110' : 'text-gray-400'}`}
                    >
                        <item.icon className="w-6 h-6" />
                        <span className="text-[8px] font-black uppercase tracking-tighter">{item.label}</span>
                    </button>
                ))}
            </div>
        </div>
    )
}
