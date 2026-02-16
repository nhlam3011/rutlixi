'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { motion } from 'framer-motion'
import { TetBlossoms } from '@/components/ui/hoa-mai'
import { SkyLanterns, Lantern, DongSonPattern, Couplet, AmbientGlow, ImperialScroll, PalaceFrame, AmbientLightBeams, LuckyCoin } from '@/components/ui/vibe-tet'

export default function Home() {
    const [name, setName] = useState('')
    const [isShaking, setIsShaking] = useState(false)
    const router = useRouter()

    const handleStart = (e: React.FormEvent) => {
        e.preventDefault()
        if (name.trim()) {
            setIsShaking(true)
            setTimeout(() => {
                router.push(`/draw?name=${encodeURIComponent(name)}`)
            }, 1000)
        }
    }

    return (
        <main className="flex h-[100dvh] flex-col items-center justify-center gap-6 sm:gap-12 py-8 px-4 sm:py-12 sm:px-6 bg-black overflow-hidden relative">
            {/* Imperial Parallax & Breathing Background */}
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: [1.1, 1.15, 1.1] }}
                transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
                className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
                style={{ backgroundImage: 'url("/bg-tet-2026-new.png")' }}
            />

            {/* Royal Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-black/30 to-black/90 z-0" />

            <AmbientLightBeams />
            <PalaceFrame />
            <AmbientGlow />
            <DongSonPattern />
            <SkyLanterns />
            <TetBlossoms />

            {/* Balanced Imperial Couplets */}
            <Couplet side="left" text1="CUNGCHÚC" text2="TÂN XUÂN" />
            <Couplet side="right" text1="VẠNSỰ" text2="NHƯ Ý" />

            {/* Floating Royal Lanterns */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <Lantern left="15%" top="20px" delay={0.1} />
                <Lantern left="85%" top="40px" delay={0.6} />
                <LuckyCoin delay={0.5} />
                <LuckyCoin delay={2.5} />
                <div className="hidden sm:block">
                    <Lantern left="5%" top="-20px" delay={0.3} />
                    <Lantern left="95%" top="-10px" delay={0.9} />
                    <LuckyCoin delay={1.5} />
                </div>
            </div>

            {/* Top Branding Section */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute top-8 sm:top-12 z-20 text-center"
            >
                <div className="inline-block bg-yellow-600/20 backdrop-blur-md px-4 sm:px-6 py-1 rounded-full border border-yellow-500/30">
                    <p className="text-yellow-400 text-[8px] sm:text-[12px] font-black tracking-[0.5em] sm:tracking-[1em] uppercase">Xuân Bính Ngọ 2026</p>
                </div>
            </motion.div>

            {/* Central Decree - Imperial Scroll */}
            <div className="z-10 flex flex-col items-center justify-center w-full px-2">
                <ImperialScroll>
                    <div className="text-center">
                        <h1 className="text-4xl sm:text-6xl md:text-8xl font-serif font-black text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-600 uppercase tracking-tighter drop-shadow-[0_10px_20px_rgba(0,0,0,0.8)] leading-tight">
                            RÚT LÌ XÌ
                        </h1>
                        <div className="flex items-center justify-center gap-2 sm:gap-4 mt-1 sm:mt-2">
                            <div className="h-[1px] sm:h-[2px] w-8 sm:w-12 bg-yellow-500/50" />
                            <span className="text-sm sm:text-3xl font-serif italic text-yellow-100 font-bold tracking-widest whitespace-nowrap">Khai Xuân Đại Cát</span>
                            <div className="h-[1px] sm:h-[2px] w-8 sm:w-12 bg-yellow-500/50" />
                        </div>
                    </div>
                </ImperialScroll>
            </div>

            {/* Bottom Scholar Section - The Interaction Form */}
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 1, delay: 0.5 }}
                className="z-20 w-full max-w-lg relative px-2 sm:px-4 pb-4 sm:pb-0"
            >
                {/* Square Jade Seal (Dấu Tỉ) */}
                <div className="absolute -top-8 sm:-top-12 left-1/2 -translate-x-1/2 w-16 h-16 sm:w-24 sm:h-24 bg-gradient-to-tr from-red-900 to-red-700 border-2 sm:border-4 border-yellow-500 rounded-xl flex flex-col items-center justify-center shadow-[0_20px_40px_rgba(0,0,0,0.8)] rotate-0 z-30 transition-transform hover:scale-110">
                    <span className="text-yellow-400 font-serif font-black text-2xl sm:text-4xl leading-none">TẾT</span>
                    <span className="text-yellow-400 font-serif font-black text-2xl sm:text-4xl leading-none"></span>
                </div>

                <div className="relative bg-[#064e3b]/80 backdrop-blur-3xl p-6 sm:p-12 rounded-[2rem] sm:rounded-[2.5rem] border-2 border-yellow-500/40 shadow-[0_40px_100px_rgba(0,0,0,0.9)] overflow-hidden pt-12 sm:pt-16">
                    {/* Golden Pattern Inlay */}
                    <div className="absolute inset-x-0 top-0 h-2 bg-gradient-to-r from-transparent via-yellow-500/50 to-transparent" />
                    <div className="absolute inset-0 opacity-10 pointer-events-none bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />

                    <form onSubmit={handleStart} className="space-y-6 sm:space-y-8">
                        <div className="relative">
                            <label className="block text-center text-[10px] sm:text-[12px] text-yellow-500/70 font-black uppercase tracking-[0.4em] mb-3 sm:mb-4">Danh tính chủ nhân tài lộc</label>
                            <Input
                                id="name"
                                type="text"
                                placeholder="..."
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                                className="bg-black/60 border-yellow-500/20 text-yellow-100 text-center text-2xl sm:text-4xl h-16 sm:h-24 rounded-xl sm:rounded-2xl focus:border-yellow-400 focus:ring-4 focus:ring-yellow-400/20 transition-all font-serif italic shadow-inner placeholder:text-yellow-500/10"
                                required
                            />
                        </div>

                        <Button
                            type="submit"
                            className="w-full bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 hover:scale-[1.02] active:scale-95 text-red-950 font-black h-16 sm:h-24 rounded-xl sm:rounded-2xl shadow-[0_20px_60px_rgba(234,179,8,0.5)] transition-all text-xl sm:text-2xl tracking-tighter uppercase border-b-4 sm:border-b-8 border-yellow-800 hover:brightness-110 flex items-center justify-center gap-4 sm:gap-6 relative overflow-hidden"
                            disabled={!name.trim() || isShaking}
                        >
                            <span className="relative z-10">{isShaking ? 'Đang Khai Lộc...' : 'KHAI XUÂN NHẬN LỘC'}</span>
                            <motion.div
                                animate={{ x: ['-100%', '300%'] }}
                                transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
                                className="absolute inset-0 bg-gradient-to-r from-transparent via-white/50 to-transparent skew-x-[-30deg]"
                            />
                        </Button>
                    </form>

                    <p className="mt-6 sm:mt-8 text-center text-yellow-500/30 text-[8px] sm:text-[10px] font-black tracking-[0.4em] sm:tracking-[0.8em] uppercase">Vạn Sự Như Ý <br />An Khang Thịnh Vượng</p>
                </div>
            </motion.div>
        </main>
    )
}
