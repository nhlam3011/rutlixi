'use client'

import React from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Trash2, Edit3, Package, Layers, Percent } from 'lucide-react'
import { Button } from "@/components/ui/button"

interface AdminPrizeTableProps {
    prizes: any[]
    onEdit: (prize: any) => void
    onDelete: (id: string) => void
    onToggleActive: (id: string, currentStatus: boolean) => void
}

export function AdminPrizeTable({ prizes, onEdit, onDelete, onToggleActive }: AdminPrizeTableProps) {
    if (prizes.length === 0) {
        return (
            <div className="bg-white rounded-[2.5rem] p-20 text-center border-2 border-dashed border-red-100">
                <div className="text-6xl mb-4 opacity-20">🎁</div>
                <p className="font-bold text-gray-400">Chưa có giải thưởng nào trong kho.</p>
            </div>
        )
    }

    return (
        <div className="space-y-6">
            {/* Desktop Table */}
            <div className="hidden lg:block bg-white rounded-[2.5rem] border-2 border-red-50 shadow-sm overflow-hidden">
                <table className="w-full text-left border-collapse">
                    <thead>
                        <tr className="bg-red-50/50 text-gray-400 text-[10px] font-black uppercase tracking-[0.2em]">
                            <th className="px-8 py-6">Giải thưởng</th>
                            <th className="px-8 py-6">Phân loại</th>
                            <th className="px-8 py-6">Giá trị</th>
                            <th className="px-8 py-6">Số lượng</th>
                            <th className="px-8 py-6">Tỉ lệ</th>
                            <th className="px-8 py-6 text-center">Trạng thái</th>
                            <th className="px-8 py-6 text-right">Thao tác</th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-red-50">
                        {prizes.map((prize, idx) => (
                            <motion.tr
                                key={prize.id}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                transition={{ delay: idx * 0.05 }}
                                className={`hover:bg-red-50/30 transition-colors group ${!prize.is_active ? 'opacity-60 grayscale-[0.5]' : ''}`}
                            >
                                <td className="px-8 py-6">
                                    <div className="flex items-center gap-4">
                                        <div className="w-10 h-10 bg-red-50 rounded-xl flex items-center justify-center text-xl shadow-inner group-hover:bg-yellow-500 transition-colors">
                                            {prize.type === 'money' ? '💰' : '🧧'}
                                        </div>
                                        <p className="font-black text-lg text-red-950 uppercase tracking-tight">{prize.name}</p>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[10px] font-black px-3 py-1 bg-gray-100 text-gray-500 rounded-lg border border-gray-200 uppercase tracking-widest">
                                        {prize.type === 'money' ? 'Tiền mặt' : 'Lời chúc'}
                                    </span>
                                </td>
                                <td className="px-8 py-6">
                                    <p className="font-bold text-gray-900">{prize.value.toLocaleString('vi-VN')}đ</p>
                                </td>
                                <td className="px-8 py-6">
                                    <div className="flex flex-col gap-1">
                                        <div className="text-xs font-bold text-gray-500">
                                            {prize.remaining} / {prize.quantity}
                                        </div>
                                        <div className="w-24 h-1.5 bg-gray-100 rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full ${prize.remaining === 0 ? 'bg-red-500' : 'bg-green-500'}`}
                                                style={{ width: `${(prize.remaining / prize.quantity) * 100}%` }}
                                            />
                                        </div>
                                    </div>
                                </td>
                                <td className="px-8 py-6">
                                    <span className="text-[11px] font-black text-red-600 bg-red-50 px-3 py-1 rounded-lg">
                                        {prize.weight}%
                                    </span>
                                </td>
                                <td className="px-8 py-6 text-center">
                                    <button
                                        onClick={() => onToggleActive(prize.id, prize.is_active)}
                                        className={`w-12 h-6 rounded-full relative transition-colors duration-300 mx-auto block ${prize.is_active ? 'bg-green-500' : 'bg-gray-300'}`}
                                    >
                                        <motion.div
                                            animate={{ x: prize.is_active ? 24 : 2 }}
                                            className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                        />
                                    </button>
                                </td>
                                <td className="px-8 py-6 text-right">
                                    <div className="flex justify-end gap-2">
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onEdit(prize)}
                                            className="h-10 w-10 text-gray-300 hover:text-red-700 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Edit3 className="w-4 h-4" />
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            size="icon"
                                            onClick={() => onDelete(prize.id)}
                                            className="h-10 w-10 text-gray-300 hover:text-red-600 hover:bg-red-50 rounded-xl transition-all"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </td>
                            </motion.tr>
                        ))}
                    </tbody>
                </table>
            </div>

            {/* Mobile/Tablet Card View */}
            <div className="lg:hidden grid grid-cols-1 md:grid-cols-2 gap-4 pb-20">
                {prizes.map((prize, idx) => (
                    <motion.div
                        key={prize.id}
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: idx * 0.05 }}
                        className="bg-white p-6 rounded-[2rem] border-2 border-red-50 shadow-sm space-y-6"
                    >
                        <div className="flex justify-between items-start">
                            <div className="flex items-center gap-4">
                                <div className={`w-14 h-14 bg-red-50 rounded-2xl flex items-center justify-center text-3xl shadow-inner border border-red-100 ${!prize.is_active ? 'opacity-50' : ''}`}>
                                    {prize.type === 'money' ? '💰' : '🧧'}
                                </div>
                                <div>
                                    <h3 className={`font-black text-xl text-red-950 uppercase tracking-tight leading-none ${!prize.is_active ? 'text-gray-400 line-through' : ''}`}>
                                        {prize.name}
                                    </h3>
                                    <div className="flex items-center gap-2 mt-2">
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest">{prize.type === 'money' ? 'Tiền mặt' : 'Lời chúc'}</p>
                                        {!prize.is_active && <span className="text-[8px] bg-gray-200 text-gray-500 font-black px-2 py-0.5 rounded uppercase">Đang tắt</span>}
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <button
                                    onClick={() => onToggleActive(prize.id, prize.is_active)}
                                    className={`w-12 h-6 rounded-full relative transition-colors duration-300 ${prize.is_active ? 'bg-green-500' : 'bg-gray-300'}`}
                                >
                                    <motion.div
                                        animate={{ x: prize.is_active ? 24 : 2 }}
                                        className="absolute top-1 w-4 h-4 bg-white rounded-full shadow-sm"
                                    />
                                </button>
                                <span className={`text-[10px] font-black px-3 py-1 rounded-full border ${prize.remaining > 0 && prize.is_active ? 'bg-green-50 text-green-700 border-green-100' : 'bg-red-50 text-red-600 border-red-100'}`}>
                                    {prize.remaining > 0 && prize.is_active ? `CÒN ${prize.remaining}` : (prize.is_active ? 'HẾT' : 'ĐÃ TẮT')}
                                </span>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4 py-4 border-y border-red-50">
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Layers className="w-3 h-3" /> Giá trị
                                </p>
                                <p className="font-bold text-gray-900">{prize.value.toLocaleString('vi-VN')}đ</p>
                            </div>
                            <div className="space-y-1">
                                <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest flex items-center gap-2">
                                    <Percent className="w-3 h-3" /> Tỉ lệ
                                </p>
                                <p className="font-bold text-red-600">{prize.weight}%</p>
                            </div>
                        </div>

                        <div className="flex gap-3">
                            <Button
                                onClick={() => onEdit(prize)}
                                className="flex-1 bg-gray-50 text-gray-950 font-bold hover:bg-red-700 hover:text-white rounded-2xl transition-all h-14 border border-gray-100 flex items-center justify-center gap-2"
                            >
                                <Edit3 className="w-4 h-4" /> CẬP NHẬT
                            </Button>
                            <Button
                                variant="ghost"
                                onClick={() => onDelete(prize.id)}
                                className="w-14 h-14 bg-red-50 text-red-400 hover:bg-red-600 hover:text-white rounded-2xl transition-all flex items-center justify-center"
                            >
                                <Trash2 className="w-5 h-5" />
                            </Button>
                        </div>
                    </motion.div>
                ))}
            </div>
        </div>
    )
}
