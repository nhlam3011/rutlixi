'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { LucideIcon, History, Gift, Settings, LayoutDashboard } from 'lucide-react'

interface StatCardProps {
    label: string
    value: string | number
    icon: LucideIcon
    color: string
    index: number
}

function StatCard({ label, value, icon: Icon, color, index }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5 }}
            className={`
                p-6 rounded-[2.5rem] border-2 shadow-sm flex flex-row items-center gap-5 relative overflow-hidden bg-white group
                ${color === 'blue' ? 'border-blue-100 hover:border-blue-400' : ''}
                ${color === 'red' ? 'border-red-100 hover:border-red-400' : ''}
                ${color === 'green' ? 'border-green-100 hover:border-green-400' : ''}
                ${color === 'yellow' ? 'border-yellow-100 hover:border-yellow-400' : ''}
            `}
        >
            <div className={`
                w-16 h-16 rounded-[1.5rem] flex items-center justify-center shadow-inner transition-colors duration-300
                ${color === 'blue' ? 'bg-blue-50 text-blue-600 group-hover:bg-blue-600 group-hover:text-white' : ''}
                ${color === 'red' ? 'bg-red-50 text-red-600 group-hover:bg-red-600 group-hover:text-white' : ''}
                ${color === 'green' ? 'bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white' : ''}
                ${color === 'yellow' ? 'bg-yellow-50 text-yellow-700 group-hover:bg-yellow-700 group-hover:text-white' : ''}
            `}>
                <Icon className="w-8 h-8" />
            </div>
            <div className="flex flex-col min-w-0">
                <p className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1 truncate">{label}</p>
                <p className="text-2xl sm:text-3xl font-black tabular-nums tracking-tighter truncate">{value}</p>
            </div>

            {/* Background pattern */}
            <div className="absolute top-0 right-0 p-4 opacity-[0.05] group-hover:opacity-[0.1] transition-opacity">
                <Icon className="w-20 h-20 -mr-6 -mt-6" />
            </div>
        </motion.div>
    )
}

interface AdminStatsProps {
    draws: any[]
    prizes: any[]
}

export function AdminStats({ draws, prizes }: AdminStatsProps) {
    const totalPrizesRemaining = prizes.reduce((acc, p) => acc + p.remaining, 0)
    const moneyWinners = draws.filter(d => d.prizes?.type === 'money').length
    const recentDrawsCount = draws.filter(d => new Date(d.created_at).getTime() > Date.now() - 3600000).length

    const stats = [
        { label: 'Tổng số lượt rút', value: draws.length, icon: History, color: 'blue' },
        { label: 'Người trúng tiền', value: moneyWinners, icon: Gift, color: 'red' },
        { label: 'Quà còn lại', value: totalPrizesRemaining, icon: Settings, color: 'green' },
        { label: 'Mới (1 giờ qua)', value: recentDrawsCount, icon: LayoutDashboard, color: 'yellow' }
    ]

    return (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {stats.map((stat, i) => (
                <StatCard
                    key={i}
                    index={i}
                    label={stat.label}
                    value={stat.value}
                    icon={stat.icon}
                    color={stat.color}
                />
            ))}
        </div>
    )
}
