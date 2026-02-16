"use client"

import { useSearchParams, useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { TetBlossoms } from '@/components/ui/hoa-mai'
import { SkyLanterns, Lantern, PremiumLixi, DongSonPattern, AmbientGlow, LuckyCoin, AmbientLightBeams } from '@/components/ui/vibe-tet'

export default function DrawClient() {
    const searchParams = useSearchParams()
    const router = useRouter()
    const name = searchParams.get('name') || 'Bạn'
    const [isShaking, setIsShaking] = useState(false)
    const [isOpened, setIsOpened] = useState(false)
    const [prize, setPrize] = useState<any>(null)
    const [error, setError] = useState('')
    const [drawing, setDrawing] = useState(false)

    const handleDraw = async () => {
        if (drawing) return
        setDrawing(true)
        setError('')
        setIsShaking(true)

        try {
            // Minimum shake time 2.5s for anticipation
            const shakePromise = new Promise(resolve => setTimeout(resolve, 2500))

            const res = await fetch('/api/draw', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ name })
            })

            const data = await res.json()

            await shakePromise
            setIsShaking(false)

            if (!res.ok) {
                throw new Error(data.error || 'Có lỗi xảy ra')
            }

            setPrize(data.prize)
            setIsOpened(true)

        } catch (err: any) {
            setIsShaking(false)
            setDrawing(false)
            setError(err.message)
        }
    }

    const handleViewResult = () => {
        const prizeData = encodeURIComponent(JSON.stringify(prize))
        router.push(`/result?name=${encodeURIComponent(name)}&data=${prizeData}`)
    }

    return (
        <main className="flex h-[100dvh] flex-col items-center justify-center p-4 bg-black overflow-hidden relative">
            {/* Sanctuary Masterpiece Background */}
            <motion.div
                initial={{ scale: 1.2, opacity: 0 }}
                animate={{
                    scale: [1.2, 1.1, 1.2],
                    opacity: 1
                }}
                transition={{
                    scale: { duration: 25, repeat: Infinity, ease: "linear" },
                    opacity: { duration: 2, ease: "easeOut" }
                }}
                className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
                style={{ backgroundImage: 'url("/bg-sanctuary-2026.png")' }}
            />

            {/* Inner Sanctuary Glow Overlay */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-transparent to-black/80 z-0" />
            <div className="absolute inset-0 bg-red-950/10 mix-blend-color z-0" />

            <AmbientGlow />
            <AmbientLightBeams />
            <SkyLanterns />
            <AmbientGlow />
            <TetBlossoms />

            {/* Elegant Corner Lanterns for Sanctuary */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <Lantern left="5%" top="20px" delay={0.2} />
                <Lantern left="95%" top="40px" delay={0.7} />
                <LuckyCoin delay={1} />
                <LuckyCoin delay={3} />
                <LuckyCoin delay={5} />
            </div>

            <div className="z-10 w-full max-w-lg flex flex-col items-center justify-evenly h-full max-h-[700px]">
                <motion.div
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center mb-2 sm:mb-12"
                >
                    <h1 className="text-3xl sm:text-6xl font-serif text-transparent bg-clip-text bg-gradient-to-b from-yellow-100 via-yellow-300 to-yellow-600 mb-2 sm:mb-4 font-black drop-shadow-[0_0_30px_rgba(234,179,8,0.6)]">CHÀO {name.toUpperCase()},</h1>
                    <p className="text-yellow-400 font-black tracking-[0.4em] sm:tracking-[0.6em] uppercase text-xs sm:text-xl drop-shadow-2xl">CHẠM BAO LÌ XÌ ĐỂ NHẬN LỘC</p>
                </motion.div>

                <div className="relative flex flex-col items-center">
                    <AnimatePresence mode="wait">
                        {!isOpened ? (
                            <PremiumLixi
                                isShaking={isShaking}
                                onClick={handleDraw}
                            />
                        ) : (
                            <motion.div
                                key="result"
                                initial={{ scale: 0.5, opacity: 0, y: 50, rotate: -15 }}
                                animate={{ scale: 1, opacity: 1, y: 0, rotate: 0 }}
                                className="w-[90vw] max-w-sm bg-black/70 backdrop-blur-[40px] p-6 sm:p-14 rounded-[3rem] sm:rounded-[4rem] border-2 border-yellow-500/40 shadow-[0_60px_120px_rgba(0,0,0,0.9)] text-center relative ring-2 ring-white/10"
                            >
                                <div className="absolute -top-12 sm:-top-20 left-1/2 -translate-x-1/2 text-7xl sm:text-9xl filter drop-shadow-[0_0_50px_rgba(234,179,8,0.8)]">🎊</div>
                                <h2 className="text-3xl sm:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 via-white to-yellow-500 mb-3 sm:mb-8 font-serif uppercase tracking-tighter leading-none">VẠN SỰ NHƯ Ý!</h2>
                                <p className="text-yellow-100 mb-8 sm:mb-14 leading-relaxed text-base sm:text-2xl font-black font-serif italic drop-shadow-md">Một món quà tri ân đã thuộc về bạn.</p>

                                <Button
                                    onClick={handleViewResult}
                                    className="w-full bg-gradient-to-r from-yellow-500 via-yellow-400 to-yellow-600 hover:scale-[1.05] text-red-950 font-black h-14 sm:h-20 rounded-xl sm:rounded-2xl shadow-[0_25px_50px_rgba(0,0,0,0.5)] transition-all uppercase tracking-tight text-xl sm:text-2xl border-b-4 sm:border-b-8 border-yellow-700"
                                >
                                    XEM LỘC ĐẦU NĂM
                                </Button>
                            </motion.div>
                        )}
                    </AnimatePresence>

                    {error && (
                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mt-12 p-8 bg-red-950/95 border-2 border-red-500/40 text-red-100 rounded-[2.5rem] backdrop-blur-3xl text-sm text-center max-w-sm shadow-[0_30px_60px_rgba(0,0,0,0.6)]"
                        >
                            <p className="mb-4 font-black text-2xl uppercase tracking-tighter">Hệ thống bận!</p>
                            <p className="mb-8 font-medium text-red-200/80 leading-relaxed">{error}</p>
                            <Button variant="outline" size="sm" onClick={() => { setError(''); setDrawing(false); }} className="w-full bg-white/10 border-red-500/60 text-red-50 hover:bg-red-500/30 rounded-2xl h-14 font-black uppercase text-lg tracking-widest transition-all">THỬ LẠI NGAY</Button>
                        </motion.div>
                    )}
                </div>
            </div>
        </main>
    )
}
