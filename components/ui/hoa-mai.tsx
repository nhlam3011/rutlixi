'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

export const TetBlossoms = () => {
    const [petals, setPetals] = useState<any[]>([])

    useEffect(() => {
        const newPetals = Array.from({ length: 18 }).map((_, i) => ({
            id: i,
            left: Math.random() * 100,
            size: Math.random() * 35 + 8,
            duration: Math.random() * 12 + 6,
            delay: Math.random() * 5,
            rotate: Math.random() * 360,
            type: Math.random() > 0.4 ? 'mai' : 'dao', // More Hoa Mai (South), some Hoa Đào (North)
            depth: Math.random() > 0.5 ? 'z-20' : 'z-0',
            opacity: Math.random() * 0.4 + 0.6
        }))
        setPetals(newPetals)
    }, [])

    return (
        <div className="fixed inset-0 pointer-events-none overflow-hidden h-full w-full">
            {petals.map((p) => (
                <motion.div
                    key={p.id}
                    initial={{ y: -100, x: `${p.left}vw`, opacity: 0, rotate: 0, scale: 0 }}
                    animate={{
                        y: '110vh',
                        x: `${p.left + (Math.sin(p.id) * 20)}vw`,
                        opacity: [0, p.opacity, p.opacity, 0],
                        rotate: p.rotate + 1080,
                        scale: [0.3, 1, 0.6]
                    }}
                    transition={{
                        duration: p.duration,
                        repeat: Infinity,
                        delay: p.delay,
                        ease: "linear",
                    }}
                    className={`absolute ${p.depth}`}
                    style={{
                        width: p.size,
                        height: p.size,
                    }}
                >
                    <svg viewBox="0 0 100 100" className="drop-shadow-lg">
                        <defs>
                            <radialGradient id={`grad-${p.id}`} cx="50%" cy="50%" r="50%">
                                <stop offset="0%" stopColor={p.type === 'mai' ? "#FFEA00" : "#FFB7C5"} />
                                <stop offset="100%" stopColor={p.type === 'mai' ? "#FFD700" : "#F43F5E"} />
                            </radialGradient>
                        </defs>
                        <g transform="translate(50,50)">
                            {[0, 72, 144, 216, 288].map((angle) => (
                                <path
                                    key={angle}
                                    d="M0,0 Q-15,-30 0,-40 Q15,-30 0,0"
                                    fill={`url(#grad-${p.id})`}
                                    transform={`rotate(${angle})`}
                                    stroke={p.type === 'mai' ? "#EAB308" : "#BE123D"}
                                    strokeWidth="0.5"
                                />
                            ))}
                            <circle cx="0" cy="0" r="6" fill={p.type === 'mai' ? "#F59E0B" : "#9F1239"} />
                        </g>
                    </svg>
                </motion.div>
            ))}
        </div>
    )
}
