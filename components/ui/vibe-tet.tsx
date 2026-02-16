'use client'

import { motion, useMotionValue, useSpring, useTransform, AnimatePresence } from 'framer-motion'
import { useEffect, useState } from 'react'

export const SkyLanterns = () => {
    const [lanterns, setLanterns] = useState<any[]>([])

    useEffect(() => {
        const newLanterns = Array.from({ length: 12 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 20 + 15,
            duration: Math.random() * 15 + 10,
            delay: Math.random() * 10,
            opacity: Math.random() * 0.3 + 0.4
        }))
        setLanterns(newLanterns)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 bg-transparent">
            {lanterns.map((l) => (
                <motion.div
                    key={l.id}
                    initial={{ y: "110vh", x: `${l.left}vw`, opacity: 0 }}
                    animate={{
                        y: "-20vh",
                        x: `${l.left + (Math.sin(l.id) * 5)}vw`,
                        opacity: [0, l.opacity, l.opacity, 0],
                    }}
                    transition={{
                        duration: l.duration,
                        repeat: Infinity,
                        delay: l.delay,
                        ease: "linear",
                    }}
                    className="absolute"
                    style={{ width: l.size, height: l.size * 1.3 }}
                >
                    <div className="w-full h-full relative">
                        {/* Glow */}
                        <div className="absolute inset-0 bg-orange-500/40 blur-xl rounded-full animate-pulse" />
                        {/* Lantern Body */}
                        <div className="absolute inset-0 bg-gradient-to-b from-orange-400 via-red-600 to-red-800 rounded-[20%_20%_10%_10%] border border-yellow-500/30 shadow-[0_0_20px_rgba(249,115,22,0.4)]">
                            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-1/2 h-1 bg-yellow-600/40 rounded-full" />
                            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-orange-200/20 text-[10px] sm:text-xs font-serif">福</div>
                        </div>
                    </div>
                </motion.div>
            ))}
        </div>
    )
}

export const Lantern = ({ left, top, delay = 0 }: { left: string, top: string, delay?: number }) => (
    <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: [0, 15, 0], opacity: 1 }}
        transition={{ y: { duration: 4, repeat: Infinity, ease: "easeInOut", delay }, opacity: { duration: 1, delay } }}
        className="absolute z-10"
        style={{ left, top }}
    >
        <div className="flex flex-col items-center">
            <div className="w-0.5 h-16 bg-gradient-to-b from-yellow-800 to-yellow-600" />
            <div className="w-12 h-14 bg-[#d41c1c] rounded-[45%_45%_40%_40%] relative shadow-[0_5px_20px_rgba(0,0,0,0.4),0_0_30px_rgba(220,38,38,0.3)] border-2 border-yellow-500/60 overflow-hidden">
                <div className="absolute inset-y-0 left-1/4 right-1/4 border-x border-yellow-500/20" />
                <div className="absolute inset-y-0 left-1/2 -translate-x-1/2 border-x border-yellow-500/20" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
                <div className="absolute top-0 left-0 w-full h-1/2 bg-white/5" />
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-yellow-600 rounded-t-full" />
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-5 h-1.5 bg-yellow-600 rounded-b-full" />
            </div>
            <div className="flex flex-col items-center mt-[-2px]">
                <div className="w-4 h-4 rounded-full bg-yellow-600 border border-yellow-400 z-20" />
                <div className="flex gap-[2px] mt-[-4px]">
                    <div className="w-[1px] h-10 bg-yellow-500 opacity-60" />
                    <div className="w-[1px] h-14 bg-yellow-500" />
                    <div className="w-[1px] h-12 bg-yellow-500 opacity-80" />
                    <div className="w-[1px] h-14 bg-yellow-500" />
                    <div className="w-[1px] h-10 bg-yellow-500 opacity-60" />
                </div>
            </div>
        </div>
    </motion.div>
)

export const DongSonPattern = () => (
    <div className="fixed inset-0 pointer-events-none z-0 flex items-center justify-center opacity-[0.05] overflow-hidden">
        <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 120, repeat: Infinity, ease: "linear" }}
            className="w-[160vmax] h-[160vmax] border-[50px] border-yellow-600 rounded-full flex items-center justify-center relative"
        >
            <div className="absolute inset-0 border-[30px] border-yellow-600 rounded-full opacity-40 m-24" />
            <div className="absolute inset-0 border-[15px] border-yellow-600 rounded-full opacity-20 m-64" />
            <div className="absolute inset-0 border-[10px] border-yellow-600 rounded-full opacity-10 m-[300px]" />
            <div className="text-yellow-500 text-[35vmax] leading-none select-none font-serif opacity-50 drop-shadow-[0_0_50px_rgba(234,179,8,0.3)]">✷</div>
            {Array.from({ length: 24 }).map((_, i) => (
                <div
                    key={i}
                    className="absolute text-yellow-500 text-7xl opacity-50 font-serif"
                    style={{
                        left: `${50 + 46 * Math.cos((i * 15 * Math.PI) / 180)}%`,
                        top: `${50 + 46 * Math.sin((i * 15 * Math.PI) / 180)}%`,
                        transform: `rotate(${i * 15 + 90}deg)`
                    }}
                >
                    𓅓
                </div>
            ))}
        </motion.div>
    </div>
)

export const Couplet = ({ side, text1, text2 }: { side: 'left' | 'right', text1: string, text2: string }) => (
    <motion.div
        initial={{ y: -200, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 2.5, delay: 0.5, type: "spring", damping: 18 }}
        className={`fixed top-0 bottom-0 ${side === 'left' ? 'left-1 sm:left-4 lg:left-12' : 'right-1 sm:right-4 lg:right-12'} z-20 pointer-events-none hidden xs:flex flex-col items-center justify-center scale-[0.7] sm:scale-90 lg:scale-100`}
    >
        <div className="w-1.5 h-full bg-gradient-to-b from-transparent via-yellow-800/40 to-transparent absolute left-1/2 -translate-x-1/2 blur-[2px]" />

        <div className="relative w-16 sm:w-20 bg-gradient-to-b from-[#d41c1c] via-[#b91c1c] to-[#991b1b] p-4 sm:p-6 flex flex-col items-center gap-10 sm:gap-14 rounded-b-[2.5rem] shadow-[0_40px_80px_rgba(0,0,0,0.7)] border-x-[3px] border-yellow-600/50 ring-2 ring-yellow-500/20">
            {/* Hanging Wire Hook */}
            <div className="absolute -top-16 w-1 h-16 bg-gradient-to-b from-transparent to-yellow-800" />
            <div className="absolute -top-2 w-16 h-4 border-b-4 border-yellow-700 rounded-full" />

            {text1.split('').map((char, i) => (
                <span key={i} className="text-4xl sm:text-5xl font-serif font-black text-yellow-400 drop-shadow-[0_4px_8px_rgba(0,0,0,0.6)] transform hover:scale-110 transition-transform cursor-default select-none">{char}</span>
            ))}

            {/* Deluxe Tassel */}
            <div className="absolute -bottom-24 flex flex-col items-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-tr from-yellow-700 via-yellow-400 to-yellow-600 border-2 border-yellow-950 shadow-2xl z-20" />
                <div className="w-1.5 h-14 bg-yellow-800 mt-[-2px] shadow-inner" />
                <div className="flex gap-[1.5px] mt-[-6px]">
                    {Array.from({ length: 15 }).map((_, i) => (
                        <motion.div
                            key={i}
                            animate={{ rotateX: [0, 40, -40, 0] }}
                            transition={{ duration: 3, repeat: Infinity, delay: i * 0.1 }}
                            className="w-[1.2px] h-16 bg-yellow-500"
                            style={{ opacity: 1 - (Math.abs(i - 7) / 10) }}
                        />
                    ))}
                </div>
            </div>
        </div>
    </motion.div>
)

export const AmbientGlow = () => (
    <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[100vw] h-[100vh] bg-[radial-gradient(circle,rgba(220,38,38,0.2)_0%,transparent_70%)] opacity-60 blur-3xl animate-pulse" />
        <div className="absolute -top-[10%] left-[20%] w-[40vw] h-[40vw] bg-yellow-500/10 rounded-full blur-[120px]" />
        <div className="absolute -bottom-[10%] right-[20%] w-[50vw] h-[50vw] bg-red-800/20 rounded-full blur-[150px]" />
    </div>
)

export const ImperialScroll = ({ children }: { children: React.ReactNode }) => (
    <motion.div
        initial={{ scaleX: 0, opacity: 0 }}
        animate={{ scaleX: 1, opacity: 1 }}
        transition={{ duration: 1.5, ease: "circOut" }}
        className="relative px-4 sm:px-12 py-4 sm:py-8 w-full max-w-[95vw] sm:max-w-none min-w-[300px] sm:min-w-[600px] flex items-center justify-center"
    >
        {/* Scroll Handles */}
        <div className="absolute left-0 inset-y-0 w-6 sm:w-8 bg-gradient-to-r from-yellow-900 via-yellow-600 to-yellow-800 rounded-full shadow-2xl border-x border-yellow-500/30 flex flex-col justify-between py-2">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-yellow-400 mx-auto shadow-inner" />
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-yellow-400 mx-auto shadow-inner" />
        </div>
        <div className="absolute right-0 inset-y-0 w-6 sm:w-8 bg-gradient-to-l from-yellow-900 via-yellow-600 to-yellow-800 rounded-full shadow-2xl border-x border-yellow-500/30 flex flex-col justify-between py-2">
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-yellow-400 mx-auto shadow-inner" />
            <div className="w-4 h-4 sm:w-6 sm:h-6 rounded-full bg-yellow-400 mx-auto shadow-inner" />
        </div>

        {/* Scroll Body */}
        <div className="relative bg-gradient-to-r from-[#991b1b] via-[#b91c1c] to-[#991b1b] w-full py-4 sm:py-6 px-6 sm:px-10 shadow-[0_20px_50px_rgba(0,0,0,0.6)] border-y-4 border-yellow-500/40 overflow-hidden">
            <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
            <div className="relative z-10 w-full overflow-hidden">{children}</div>

            {/* Inner Gold Borders */}
            <div className="absolute inset-2 border border-yellow-500/20 pointer-events-none" />
        </div>
    </motion.div>
)

export const PalaceFrame = () => (
    <div className="fixed inset-0 pointer-events-none z-30 border-[12px] sm:border-[24px] border-transparent">
        <div className="absolute inset-0 border-[2px] border-yellow-500/20 m-1 sm:m-2" />
        {/* Corners */}
        <div className="absolute top-0 left-0 w-16 h-16 border-t-4 border-l-4 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
        <div className="absolute top-0 right-0 w-16 h-16 border-t-4 border-r-4 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
        <div className="absolute bottom-0 left-0 w-16 h-16 border-b-4 border-l-4 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
        <div className="absolute bottom-0 right-0 w-16 h-16 border-b-4 border-r-4 border-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.3)]" />
    </div>
)

export const LuckyCoin = ({ delay = 0 }: { delay?: number }) => (
    <motion.div
        initial={{ y: "110vh", opacity: 0, rotate: 0 }}
        animate={{
            y: ["110vh", "-10vh"],
            opacity: [0, 1, 1, 0],
            rotate: 360,
            x: ["0%", "20%", "-20%", "0%"]
        }}
        transition={{
            duration: 8,
            repeat: Infinity,
            delay,
            ease: "linear"
        }}
        className="fixed pointer-events-none z-0"
        style={{ left: `${Math.random() * 100}%` }}
    >
        <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-yellow-700 via-yellow-400 to-yellow-600 border-2 border-yellow-950 shadow-lg flex items-center justify-center relative overflow-hidden">
            <div className="w-3 h-3 border-2 border-yellow-900/30 rounded-sm rotate-45" />
            <div className="absolute inset-0 bg-gradient-to-tr from-white/20 to-transparent pointer-events-none" />
        </div>
    </motion.div>
)

export const EnergyPulse = ({ active }: { active: boolean }) => (
    <AnimatePresence>
        {active && (
            <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1.2 }}
                exit={{ opacity: 0, scale: 1.5 }}
                transition={{ duration: 1, repeat: Infinity }}
                className="absolute inset-0 z-0 pointer-events-none"
            >
                <div className="absolute inset-0 rounded-full bg-yellow-400/20 blur-2xl" />
                <div className="absolute inset-0 rounded-full border-4 border-yellow-400/30 scale-110" />
            </motion.div>
        )}
    </AnimatePresence>
)

export const PremiumLixi = ({ isShaking, onClick }: { isShaking: boolean, onClick: () => void }) => {
    const mouseX = useMotionValue(0)
    const mouseY = useMotionValue(0)

    const springConfig = { damping: 20, stiffness: 300 }
    const rotateX = useSpring(useTransform(mouseY, [-0.5, 0.5], [15, -15]), springConfig)
    const rotateY = useSpring(useTransform(mouseX, [-0.5, 0.5], [-15, 15]), springConfig)

    const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
        const rect = e.currentTarget.getBoundingClientRect()
        mouseX.set((e.clientX - rect.left) / rect.width - 0.5)
        mouseY.set((e.clientY - rect.top) / rect.height - 0.5)
    }

    const handleMouseLeave = () => {
        mouseX.set(0)
        mouseY.set(0)
    }

    return (
        <motion.div
            style={{ rotateX, rotateY, transformStyle: "preserve-3d" }}
            animate={isShaking ? {
                x: [0, -15, 15, -15, 15, 0],
                rotateZ: [0, -5, 5, -5, 5, 0],
                scale: [1, 1.1, 1, 1.1, 1.1, 1]
            } : {
                y: [0, -15, 0],
            }}
            transition={isShaking ? { duration: 0.4, repeat: 2 } : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
            onClick={onClick}
            className="perspective-1000 relative w-64 h-96 sm:w-80 sm:h-[480px] cursor-pointer group flex items-center justify-center p-4 z-20"
        >
            <EnergyPulse active={isShaking} />

            {/* Ambient Shadow */}
            <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 w-48 h-10 bg-black/60 blur-3xl rounded-[100%] scale-x-125 z-0" />

            {/* THE MASTERPIECE BODY */}
            <div className="relative w-full h-full bg-gradient-to-br from-[#d41c1c] via-[#b91c1c] to-[#7f1d1d] rounded-[2.5rem] shadow-[0_45px_90px_rgba(0,0,0,0.8)] border-t-[6px] border-l-[6px] border-white/20 overflow-hidden flex flex-col items-center ring-4 ring-yellow-500/30 transition-transform duration-500 group-hover:scale-[1.02]">

                {/* Silk Embroidery Texture Layer */}
                <div className="absolute inset-0 opacity-100 pointer-events-none mix-blend-multiply bg-[url('/lixi-texture-2026.png')] bg-cover bg-center" />
                <div className="absolute inset-0 opacity-30 pointer-events-none mix-blend-overlay bg-[url('/lixi-texture-2026.png')] bg-cover bg-center" />

                {/* Golden Glow when shaking */}
                <AnimatePresence>
                    {isShaking && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.4 }}
                            exit={{ opacity: 0 }}
                            className="absolute inset-0 bg-yellow-400/20 blur-3xl scale-150"
                        />
                    )}
                </AnimatePresence>

                {/* Sparkling Particles Layer */}
                <div className="absolute inset-0 pointer-events-none opacity-40 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] bg-repeat" />

                {/* 3D Shiny Sweep */}
                <motion.div
                    animate={{ x: isShaking ? [-20, 20, -20] : [-50, 250] }}
                    transition={{ repeat: Infinity, duration: isShaking ? 0.2 : 4, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent w-[200%] -skew-x-12 pointer-events-none"
                />

                {/* Top Flap Curvature */}
                <div className="absolute top-0 w-full h-32 bg-gradient-to-b from-[#7f1d1d] to-transparent rounded-b-[140%] border-b-4 border-yellow-500/50 z-10 shadow-xl overflow-hidden">
                    <div className="absolute inset-0 opacity-30 bg-[url('https://www.transparenttextures.com/patterns/natural-paper.png')]" />
                </div>

                {/* EMBOSSED CENTER CIRCLE */}
                <div className="flex-1 flex flex-col items-center justify-center z-20 w-full relative">
                    <div className="w-44 h-44 sm:w-56 sm:h-56 rounded-full border-[6px] border-yellow-400 flex flex-col items-center justify-center bg-gradient-to-tr from-red-950 to-red-800 shadow-[inset_0_0_50px_rgba(0,0,0,0.9),0_0_60px_rgba(234,179,8,0.5)] relative overflow-hidden ring-8 ring-yellow-500/10">
                        <div className="z-10 bg-gradient-to-b from-yellow-100 via-yellow-400 to-yellow-600 bg-clip-text text-transparent text-4xl sm:text-5xl font-serif font-black drop-shadow-[0_4px_8px_rgba(0,0,0,0.5)]">
                            NGỌ
                        </div>
                        {/* Rotating Ring Aura */}
                        <motion.div
                            animate={{ rotate: 360 }}
                            transition={{ repeat: Infinity, duration: 15, ease: "linear" }}
                            className="absolute inset-0 border-t-2 border-yellow-300/40 rounded-full"
                        />

                        {/* Horse Shadow in circle */}
                        <div className="absolute inset-0 flex items-center justify-center opacity-[0.1] pointer-events-none group-hover:opacity-20 transition-all duration-700">
                            <span className="text-[140px] grayscale brightness-0 select-none">🐎</span>
                        </div>



                        {/* Decorative Pearls */}
                        {Array.from({ length: 12 }).map((_, i) => (
                            <div
                                key={i}
                                className="absolute w-2.5 h-2.5 bg-gradient-to-r from-yellow-600 via-yellow-200 to-yellow-700 rounded-full border border-yellow-950/40"
                                style={{
                                    left: `${50 + 42 * Math.cos((i * 30 * Math.PI) / 180)}%`,
                                    top: `${50 + 42 * Math.sin((i * 30 * Math.PI) / 180)}%`,
                                    transform: 'translate(-50%, -50%)'
                                }}
                            />
                        ))}
                    </div>

                    {/* Premium Silk Ribbon */}
                    <div className="absolute top-[65%] -left-4 -right-4 h-12 bg-gradient-to-r from-red-900 via-red-600 to-red-900 shadow-xl border-y-2 border-yellow-500/60 flex items-center justify-center -rotate-2">
                        <div className="w-full h-[2px] bg-yellow-500/30 mt-[-10px]" />
                        <div className="absolute w-8 h-8 rounded-full bg-yellow-500 border-2 border-yellow-900 shadow-inner" />
                        <div className="w-full h-[2px] bg-yellow-500/30 mt-[10px]" />
                    </div>

                    {/* Minimalist Decoration Below */}
                    <div className="mt-16 flex gap-2 items-center opacity-40">
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                        <div className="w-16 h-1 bg-gradient-to-r from-transparent via-yellow-400 to-transparent" />
                        <div className="w-2 h-2 rounded-full bg-yellow-500" />
                    </div>
                </div>

                {/* Polish Sweep Animation */}
                <motion.div
                    animate={{ x: ['-200%', '400%'] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "linear", repeatDelay: 4 }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-35deg] pointer-events-none"
                />
            </div>
        </motion.div>
    )
}
export const AmbientLightBeams = () => (
    <div className="absolute inset-0 pointer-events-none overflow-hidden z-0 shadow-inner">
        {/* God Rays */}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-yellow-500/5 to-transparent blur-[120px] rotate-[-25deg] scale-150 transform -translate-y-1/2" />

        {/* Dynamic Rays */}
        {Array.from({ length: 5 }).map((_, i) => (
            <motion.div
                key={i}
                initial={{ opacity: 0, x: -100, rotate: -35 }}
                animate={{
                    opacity: [0, 0.15, 0],
                    x: [-200, 400],
                }}
                transition={{
                    duration: 10 + i * 2,
                    repeat: Infinity,
                    delay: i * 3,
                    ease: "linear"
                }}
                className="absolute top-0 w-[400px] h-screen bg-gradient-to-r from-transparent via-yellow-400/10 to-transparent blur-3xl transform -translate-y-1/2"
                style={{ left: `${i * 25}%` }}
            />
        ))}

        {/* Floating Golden Dust Particles */}
        {Array.from({ length: 15 }).map((_, i) => (
            <motion.div
                key={`dust-${i}`}
                initial={{
                    opacity: 0,
                    x: Math.random() * 100 + "%",
                    y: Math.random() * 100 + "%",
                    scale: Math.random() * 0.5 + 0.5
                }}
                animate={{
                    opacity: [0, 0.6, 0],
                    y: ["-10%", "110%"],
                    x: [(Math.random() - 0.5) * 50 + "%", (Math.random() - 0.5) * 50 + "%"]
                }}
                transition={{
                    duration: 15 + Math.random() * 15,
                    repeat: Infinity,
                    delay: Math.random() * 10,
                    ease: "easeInOut"
                }}
                className="absolute w-1 h-1 bg-yellow-400 rounded-full blur-[1px]"
            />
        ))}
    </div>
)
