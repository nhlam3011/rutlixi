'use client'

import React from 'react'
import { motion } from 'framer-motion'
import { Trash2, ExternalLink, Image as ImageIcon, CreditCard, Calendar, User, Globe } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface AdminHistoryTableProps {
    draws: any[]
    onDelete: (id: string) => void
    loading: boolean
}

export function AdminHistoryTable({ draws, onDelete, loading }: AdminHistoryTableProps) {
    if (draws.length === 0) {
        return (
            <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-red-100">
                <div className="text-6xl mb-4 opacity-20">📭</div>
                <p className="font-bold text-gray-400">Chưa có dữ liệu lượt rút nào.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between mb-2 px-4">
                <h3 className="text-xl font-black font-serif uppercase tracking-tight">Danh sách lượt rút gần đây</h3>
                <span className="bg-red-50 text-red-600 px-4 py-1 rounded-full text-[10px] font-black uppercase">
                    {draws.length} bản ghi
                </span>
            </div>

            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-[2.5rem] border-2 border-red-50 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-red-50/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <th className="px-8 py-6">Người rút</th>
                            <th className="px-8 py-6">Phần Quà</th>
                            <th className="px-8 py-6">Minh Chứng</th>
                            <th className="px-8 py-6">Địa Chỉ IP</th>
                            <th className="px-8 py-6 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-red-50">
                        {draws.map((draw, idx) => (
                            <motion.tr
                                key={draw.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className="hover:bg-red-50/30 transition-colors group"
                            >
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-gradient-to-br from-red-100 to-red-50 rounded-2xl flex items-center justify-center font-black text-red-700 shadow-inner">
                                            {draw.user_name.charAt(0).toUpperCase()}
                                        </div>
                                        <div>
                                            <p className="font-bold text-lg leading-tight uppercase tracking-tight">{draw.user_name}</p>
                                            <p className="text-[10px] text-gray-400 font-medium flex items-center gap-1 mt-1">
                                                <Calendar className="w-3 h-3" />
                                                {new Date(draw.created_at).toLocaleString('vi-VN')}
                                            </p>
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className={`
                                        inline-flex items-center gap-2 px-4 py-2 rounded-2xl text-xs font-black shadow-sm border
                                        ${draw.prizes?.type === 'money'
                                            ? 'bg-red-50 text-red-700 border-red-100'
                                            : 'bg-green-50 text-green-700 border-green-100'}
                                    `}>
                                        <span className="text-lg">{draw.prizes?.type === 'money' ? '💰' : '🧧'}</span>
                                        {draw.prizes?.name}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex gap-2">
                                        {draw.selfie_url ? (
                                            <a
                                                href={draw.selfie_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="h-10 px-4 bg-gray-50 hover:bg-yellow-500 hover:text-white rounded-xl flex items-center gap-2 text-[10px] font-black transition-all border border-gray-100 shadow-sm"
                                            >
                                                <ImageIcon className="w-4 h-4" /> SELFIE
                                            </a>
                                        ) : <span className="text-gray-200 text-[10px] italic">No proof</span>}
                                        {draw.qr_url ? (
                                            <a
                                                href={draw.qr_url}
                                                target="_blank"
                                                rel="noreferrer"
                                                className="h-10 px-4 bg-gray-50 hover:bg-yellow-500 hover:text-white rounded-xl flex items-center gap-2 text-[10px] font-black transition-all border border-gray-100 shadow-sm"
                                            >
                                                <CreditCard className="w-4 h-4" /> QR PAY
                                            </a>
                                        ) : null}
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[11px] font-mono bg-gray-100/50 px-3 py-1.5 rounded-lg text-gray-500 border border-gray-100 flex items-center gap-2 w-fit">
                                        <Globe className="w-3 h-3 opacity-40" />
                                        {draw.ip_address}
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => onDelete(draw.id)}
                                        className="h-12 w-12 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-[1.2rem] transition-all group/btn"
                                    >
                                        <Trash2 className="w-5 h-5 group-hover/btn:scale-110" />
                                    </Button>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
                {draws.map((draw, idx) => (
                    <motion.div
                        key={draw.id}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-6 rounded-[2rem] border-2 border-red-50 shadow-sm space-y-5 relative overflow-hidden group"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className="w-14 h-14 bg-red-100 rounded-[1.2rem] flex items-center justify-center font-black text-red-700 text-xl shadow-inner">
                                    {draw.user_name.charAt(0).toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-black text-lg leading-tight uppercase tracking-tight">{draw.user_name}</p>
                                    <p className="text-[10px] text-gray-400 font-bold mt-1 flex items-center gap-1">
                                        <Calendar className="w-3 h-3" />
                                        {new Date(draw.created_at).toLocaleString('vi-VN')}
                                    </p>
                                </div>
                            </div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => onDelete(draw.id)}
                                className="text-red-300 hover:text-red-600 hover:bg-red-50 rounded-xl"
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <div className={`
                                px-4 py-2 rounded-2xl text-[10px] font-black border
                                ${draw.prizes?.type === 'money' ? 'bg-red-50 text-red-700 border-red-100' : 'bg-green-50 text-green-700 border-green-100'}
                            `}>
                                {draw.prizes?.name}
                            </div>
                            <div className="text-[10px] font-mono text-gray-400 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                                {draw.ip_address}
                            </div>
                        </div>

                        <div className="flex flex-col xs:flex-row gap-2">
                            {draw.selfie_url && (
                                <a
                                    href={draw.selfie_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-red-50 rounded-2xl text-[10px] font-black text-red-700 border border-red-100 hover:bg-red-100 transition-colors"
                                >
                                    <ImageIcon className="w-4 h-4" /> SELFIE
                                </a>
                            )}
                            {draw.qr_url && (
                                <a
                                    href={draw.qr_url}
                                    target="_blank"
                                    rel="noreferrer"
                                    className="flex-1 flex items-center justify-center gap-2 py-3 bg-yellow-50 rounded-2xl text-[10px] font-black text-yellow-700 border border-yellow-100 hover:bg-yellow-100 transition-colors"
                                >
                                    <CreditCard className="w-4 h-4" /> QR PAY
                                </a>
                            )}
                        </div>

                        {/* Background subtle decoration */}
                        <div className="absolute top-0 right-0 p-4 opacity-[0.03] scale-150 rotate-12 pointer-events-none">
                            <User className="w-20 h-20" />
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
