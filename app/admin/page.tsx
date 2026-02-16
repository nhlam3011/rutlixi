'use client'

import { useState, useEffect } from 'react'
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { supabase } from '@/lib/supabase'
import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { motion, AnimatePresence } from 'framer-motion'
import { Lantern, DongSonPattern, AmbientGlow } from '@/components/ui/vibe-tet'
import { Trash2, Edit3, Plus, Search, RefreshCcw } from 'lucide-react'
import { AdminLayout } from '@/components/admin/AdminLayout'
import { AdminStats } from '@/components/admin/AdminStats'
import { AdminHistoryTable } from '@/components/admin/AdminHistoryTable'
import { AdminPrizeTable } from '@/components/admin/AdminPrizeTable'

export default function AdminPage() {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const [password, setPassword] = useState('')
    const [draws, setDraws] = useState<any[]>([])
    const [prizes, setPrizes] = useState<any[]>([])
    const [loading, setLoading] = useState(false)
    const [searchTerm, setSearchTerm] = useState('')
    const [activeTab, setActiveTab] = useState('history')

    const [editingPrize, setEditingPrize] = useState<any>(null)
    const [isEditDialogOpen, setIsEditDialogOpen] = useState(false)

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault()
        if (password === 'lam2026') {
            setIsAuthenticated(true)
            fetchData()
        }
    }

    const fetchData = async () => {
        setLoading(true)
        const { data: drawsData } = await supabase
            .from('draws')
            .select(`
            *,
            prizes (name, value, type)
        `)
            .order('created_at', { ascending: false })

        const { data: prizesData } = await supabase
            .from('prizes')
            .select('*')
            .order('weight', { ascending: false })

        if (drawsData) setDraws(drawsData)
        if (prizesData) setPrizes(prizesData)
        setLoading(false)
    }

    const handleEditPrize = (prize: any) => {
        setEditingPrize({ ...prize })
        setIsEditDialogOpen(true)
    }

    const handleDeleteDraw = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xoá lượt rút này?')) return

        setLoading(true)
        console.log('Attempting to delete draw:', id)
        const { error } = await supabase
            .from('draws')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Delete draw error:', error)
            alert('Lỗi khi xoá lượt rút: ' + error.message + '\n\nNếu lỗi này tiếp diễn, vui lòng kiểm tra chính sách RLS trên Supabase.')
        } else {
            console.log('Successfully deleted draw')
            fetchData()
        }
        setLoading(false)
    }

    const handleDeletePrize = async (id: string) => {
        if (!confirm('Bạn có chắc chắn muốn xoá giải thưởng này? Lượt rút liên quan có thể bị ảnh hưởng.')) return

        setLoading(true)
        console.log('Attempting to delete prize:', id)
        const { error } = await supabase
            .from('prizes')
            .delete()
            .eq('id', id)

        if (error) {
            console.error('Delete prize error:', error)
            alert('Lỗi khi xoá giải thưởng: ' + error.message + '\n\nLưu ý: Bạn không thể xoá giải thưởng nếu đã có người trúng giải này. Hãy xoá các lượt rút liên quan trước.')
        } else {
            console.log('Successfully deleted prize')
            fetchData()
        }
        setLoading(false)
    }

    const handleTogglePrizeActive = async (id: string, currentStatus: boolean) => {
        setLoading(true)
        const { error } = await supabase
            .from('prizes')
            .update({ is_active: !currentStatus })
            .eq('id', id)

        if (error) {
            alert('Lỗi khi cập nhật trạng thái: ' + error.message)
        } else {
            fetchData()
        }
        setLoading(false)
    }

    const handleSavePrize = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!editingPrize) return

        setLoading(true)
        const prizeData = {
            name: editingPrize.name,
            value: editingPrize.value,
            quantity: editingPrize.quantity,
            remaining: editingPrize.remaining,
            weight: editingPrize.weight,
            type: editingPrize.type,
            is_active: editingPrize.is_active ?? true
        }

        let error
        if (editingPrize.id === 'new') {
            const { error: err } = await supabase
                .from('prizes')
                .insert([prizeData])
            error = err
        } else {
            const { error: err } = await supabase
                .from('prizes')
                .update(prizeData)
                .eq('id', editingPrize.id)
            error = err
        }

        if (error) {
            alert('Lỗi khi lưu: ' + error.message)
        } else {
            setIsEditDialogOpen(false)
            fetchData()
        }
        setLoading(false)
    }

    const handleAddPrize = () => {
        setEditingPrize({
            id: 'new',
            name: '',
            value: 0,
            quantity: 100,
            remaining: 100,
            weight: 10,
            type: 'wish',
            is_active: true
        })
        setIsEditDialogOpen(true)
    }

    useEffect(() => {
        if (isAuthenticated) {
            const interval = setInterval(fetchData, 15000)
            return () => clearInterval(interval)
        }
    }, [isAuthenticated])

    if (!isAuthenticated) {
        return (
            <div className="flex min-h-screen items-center justify-center bg-[#7f1d1d] relative overflow-hidden px-4">
                <AmbientGlow />
                <DongSonPattern />
                <Lantern left="10%" top="0%" delay={0.2} />
                <Lantern left="85%" top="5%" delay={0.5} />

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="z-10 p-1 bg-gradient-to-br from-yellow-400 via-yellow-200 to-yellow-600 rounded-[3rem] shadow-[0_0_100px_rgba(253,186,45,0.2)] w-full max-w-md"
                >
                    <form onSubmit={handleLogin} className="p-8 md:p-12 bg-red-950/95 rounded-[2.9rem] backdrop-blur-xl border border-white/5">
                        <div className="flex flex-col items-center mb-10">
                            <motion.div
                                animate={{ rotate: [0, -10, 10, 0] }}
                                transition={{ repeat: Infinity, duration: 4 }}
                                className="text-6xl mb-6 bg-red-800 w-24 h-24 rounded-[2rem] flex items-center justify-center border-4 border-yellow-500 shadow-2xl transform shadow-yellow-500/20"
                            >
                                🐎
                            </motion.div>
                            <h1 className="text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-100 via-yellow-400 to-yellow-100 font-serif uppercase tracking-tighter text-center leading-none">
                                Admin Portal
                            </h1>
                            <p className="text-yellow-500/60 text-xs mt-3 font-black tracking-[0.3em] uppercase">XUÂN BÍNH NGỌ 2026</p>
                        </div>
                        <div className="space-y-6">
                            <div className="space-y-2">
                                <Label className="text-yellow-500/50 text-[10px] uppercase font-black tracking-widest ml-1">MẬT MÃ QUẢN TRỊ</Label>
                                <Input
                                    type="password"
                                    placeholder="••••••••"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    className="bg-red-900/40 border-yellow-500/20 text-yellow-100 placeholder:text-yellow-500/10 text-center h-16 rounded-[1.2rem] focus:ring-yellow-400 focus:border-yellow-400 text-xl tracking-[0.5em]"
                                />
                            </div>
                            <Button type="submit" className="w-full bg-gradient-to-br from-yellow-400 to-yellow-600 hover:from-yellow-300 hover:to-yellow-500 text-red-950 font-black h-16 rounded-[1.2rem] shadow-2xl active:scale-95 transition-all text-lg flex items-center justify-center gap-3">
                                VÀO HỆ THỐNG
                            </Button>
                        </div>
                    </form>
                </motion.div>
            </div>
        )
    }

    const filteredDraws = draws.filter(d =>
        d.user_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        d.prizes?.name.toLowerCase().includes(searchTerm.toLowerCase())
    )

    return (
        <AdminLayout
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            onLogout={() => setIsAuthenticated(false)}
        >
            <AnimatePresence mode="wait">
                {activeTab === 'history' && (
                    <motion.div
                        key="history"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-between">
                            <div className="relative w-full md:w-96">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                <Input
                                    placeholder="Tìm tên người rút..."
                                    value={searchTerm}
                                    onChange={e => setSearchTerm(e.target.value)}
                                    className="bg-white border-2 border-red-50 h-14 pl-12 rounded-2xl focus:border-red-500 transition-all font-medium"
                                />
                            </div>
                            <Button onClick={fetchData} disabled={loading} variant="outline" className="w-full md:w-auto h-14 px-8 border-2 border-red-50 rounded-2xl font-bold bg-white hover:bg-red-50">
                                <RefreshCcw className={`w-4 h-4 mr-2 ${loading ? 'animate-spin' : ''}`} /> Làm mới dữ liệu
                            </Button>
                        </div>

                        <AdminHistoryTable
                            draws={filteredDraws}
                            onDelete={handleDeleteDraw}
                            loading={loading}
                        />
                    </motion.div>
                )}

                {activeTab === 'prizes' && (
                    <motion.div
                        key="prizes"
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                    >
                        <div className="flex justify-between items-center mb-10">
                            <div>
                                <h3 className="text-3xl font-black font-serif uppercase tracking-tight">Kho Giải Thưởng</h3>
                            </div>
                            <Button
                                onClick={handleAddPrize}
                                className="rounded-2xl h-14 px-8 font-black bg-red-700 hover:bg-red-800 shadow-xl shadow-red-200 flex items-center gap-2"
                            >
                                <Plus className="w-5 h-5" /> THÊM GIẢI
                            </Button>
                        </div>

                        <AdminPrizeTable
                            prizes={prizes}
                            onEdit={handleEditPrize}
                            onDelete={handleDeletePrize}
                            onToggleActive={handleTogglePrizeActive}
                        />
                    </motion.div>
                )}

                {activeTab === 'stats' && (
                    <motion.div
                        key="stats"
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        exit={{ opacity: 0, scale: 0.95 }}
                    >
                        <div className="mb-10">
                            <h3 className="text-3xl font-black font-serif uppercase tracking-tight">Tổng Quan Hệ Thống</h3>
                            <p className="text-gray-400 text-sm font-medium">Dữ liệu thống kê thời gian thực</p>
                        </div>
                        <AdminStats draws={draws} prizes={prizes} />

                        <div className="bg-white rounded-[2.5rem] p-6 sm:p-10 border-2 border-red-50 shadow-sm mt-10">
                            <h4 className="text-lg sm:text-xl font-black mb-6 flex items-center gap-3">
                                <span className="w-2 h-6 sm:h-8 bg-red-700 rounded-full" />
                                PHÂN TÍCH GIẢI THƯỞNG
                            </h4>
                            <div className="space-y-6">
                                {prizes.map((p, idx) => (
                                    <div key={p.id} className="space-y-2">
                                        <div className="flex justify-between text-xs font-black uppercase tracking-widest text-gray-500">
                                            <span>{p.name} ({p.quantity - p.remaining}/{p.quantity})</span>
                                            <span>{Math.round(((p.quantity - p.remaining) / p.quantity) * 100) || 0}%</span>
                                        </div>
                                        <div className="h-3 bg-gray-50 rounded-full overflow-hidden border border-gray-100">
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: `${((p.quantity - p.remaining) / p.quantity) * 100 || 0}%` }}
                                                transition={{ delay: 0.5 + idx * 0.1, duration: 1 }}
                                                className={`h-full rounded-full ${p.remaining < p.quantity * 0.2 ? 'bg-red-500' : 'bg-green-500'}`}
                                            />
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </motion.div>
                )}

                {activeTab === 'settings' && (
                    <motion.div
                        key="settings"
                        className="flex flex-col items-center justify-center h-[60vh] text-center"
                    >
                        <div className="w-32 h-32 bg-yellow-100 rounded-[2.5rem] flex items-center justify-center text-5xl mb-6 shadow-inner border-2 border-yellow-200">⚙️</div>
                        <h3 className="text-2xl font-black uppercase tracking-tight mb-2">Cài đặt hệ thống</h3>
                        <p className="text-gray-400 max-w-sm mx-auto">Các thiết lập nâng cao đang được phát triển. Vui lòng quay lại sau.</p>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Footer */}
            <div className="mt-20 pt-10 border-t border-red-50 text-center pb-20 md:pb-10">
                <p className="text-[10px] font-black uppercase tracking-[0.4em] text-gray-300">
                    2026 XUÂN BÍNH NGỌ - LAM WITH ❤️
                </p>
            </div>

            {/* Edit Modal */}
            <Dialog open={isEditDialogOpen} onOpenChange={setIsEditDialogOpen}>
                <DialogContent className="rounded-[2.5rem] sm:rounded-[3rem] p-6 sm:p-10 bg-[#FDFCF0] border-2 sm:border-4 border-yellow-500 w-[95vw] max-w-lg shadow-[0_0_100px_rgba(253,186,45,0.1)]">
                    <DialogHeader>
                        <DialogTitle className="text-2xl sm:text-3xl font-black font-serif text-red-800 uppercase tracking-tighter text-center leading-none">
                            {editingPrize?.id === 'new' ? 'Thêm Giải Thưởng Mới' : 'Cập Nhật Giải Thưởng'}
                        </DialogTitle>
                        <div className="h-1 w-16 sm:w-20 bg-yellow-500 rounded-full mx-auto mt-3 sm:mt-4" />
                    </DialogHeader>
                    <AnimatePresence>
                        {editingPrize && (
                            <motion.form
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                onSubmit={handleSavePrize}
                                className="space-y-6 pt-8"
                            >
                                <div className="space-y-2">
                                    <Label className="uppercase text-[10px] font-black text-gray-400 tracking-widest ml-1">
                                        {editingPrize.type === 'wish' ? 'NỘI DUNG LỜI CHÚC' : 'TÊN GIẢI THƯỞNG'}
                                    </Label>
                                    {editingPrize.type === 'wish' ? (
                                        <textarea
                                            value={editingPrize.name}
                                            onChange={e => setEditingPrize({ ...editingPrize, name: e.target.value })}
                                            className="w-full min-h-[100px] bg-white border-2 border-red-50 rounded-2xl px-6 py-4 text-lg font-black focus:border-red-700 transition-all text-red-950 shadow-inner outline-none"
                                            placeholder="Nhập lời chúc tốt đẹp..."
                                            required
                                        />
                                    ) : (
                                        <Input
                                            value={editingPrize.name}
                                            onChange={e => setEditingPrize({ ...editingPrize, name: e.target.value })}
                                            className="h-14 bg-white border-2 border-red-50 rounded-2xl px-6 text-lg font-black focus:border-red-700 transition-all text-red-950 shadow-inner"
                                            required
                                        />
                                    )}
                                </div>

                                <div className="grid grid-cols-2 gap-4">
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[10px] font-black text-gray-400 tracking-widest ml-1">PHÂN LOẠI</Label>
                                        <select
                                            className="w-full h-14 px-6 border-2 border-red-50 bg-white rounded-2xl text-lg font-black focus:border-red-700 outline-none shadow-inner"
                                            value={editingPrize.type}
                                            onChange={e => setEditingPrize({ ...editingPrize, type: e.target.value })}
                                        >
                                            <option value="money">💰 Tiền Mặt</option>
                                            <option value="wish">🧧 Lời Chúc</option>
                                        </select>
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[10px] font-black text-gray-400 tracking-widest ml-1">GIÁ TRỊ (đ)</Label>
                                        <Input
                                            type="number"
                                            value={editingPrize.value}
                                            onChange={e => setEditingPrize({ ...editingPrize, value: parseInt(e.target.value) || 0 })}
                                            className="h-14 bg-white border-2 border-red-50 rounded-2xl px-6 text-lg font-black shadow-inner"
                                        />
                                    </div>
                                </div>

                                <div className="grid grid-cols-3 gap-4">
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[10px] font-black text-gray-400 tracking-widest ml-1 text-center block">TỔNG SỐ</Label>
                                        <Input
                                            type="number"
                                            value={editingPrize.quantity}
                                            onChange={e => setEditingPrize({ ...editingPrize, quantity: parseInt(e.target.value) || 0 })}
                                            className="h-14 bg-white border-2 border-red-50 rounded-2xl text-center text-lg font-black shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[10px] font-black text-gray-400 tracking-widest ml-1 text-center block">CÒN LẠI</Label>
                                        <Input
                                            type="number"
                                            value={editingPrize.remaining}
                                            onChange={e => setEditingPrize({ ...editingPrize, remaining: parseInt(e.target.value) || 0 })}
                                            className="h-14 bg-white border-2 border-red-50 rounded-2xl text-center text-lg font-black shadow-inner"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label className="uppercase text-[10px] font-black text-gray-400 tracking-widest ml-1 text-center block">TỈ LỆ (%)</Label>
                                        <Input
                                            type="number"
                                            value={editingPrize.weight}
                                            onChange={e => setEditingPrize({ ...editingPrize, weight: parseInt(e.target.value) || 0 })}
                                            className="h-14 bg-white border-2 border-red-50 rounded-2xl text-center text-lg font-black shadow-inner"
                                        />
                                    </div>
                                </div>

                                <div className="flex items-center justify-between p-6 bg-white border-2 border-red-50 rounded-[2rem] shadow-inner">
                                    <div>
                                        <p className="font-black text-red-900 uppercase tracking-tight">Kích hoạt giải thưởng</p>
                                        <p className="text-[10px] text-gray-400 font-bold uppercase tracking-widest mt-1">
                                            {editingPrize.is_active ? 'Giải thưởng đang được mở' : 'Giải thưởng đang bị khóa'}
                                        </p>
                                    </div>
                                    <button
                                        type="button"
                                        onClick={() => setEditingPrize({ ...editingPrize, is_active: !editingPrize.is_active })}
                                        className={`w-14 h-7 rounded-full relative transition-colors duration-300 ${editingPrize.is_active ? 'bg-green-500' : 'bg-gray-300'}`}
                                    >
                                        <motion.div
                                            animate={{ x: editingPrize.is_active ? 30 : 4 }}
                                            className="absolute top-1 w-5 h-5 bg-white rounded-full shadow-md"
                                        />
                                    </button>
                                </div>

                                <DialogFooter className="pt-8 gap-3 flex flex-col md:flex-row">
                                    <Button type="button" variant="ghost" onClick={() => setIsEditDialogOpen(false)} className="h-14 rounded-2xl md:flex-1 font-black text-gray-400">HỦY BỎ</Button>
                                    <Button type="submit" disabled={loading} className="h-14 rounded-2xl md:flex-[2] font-black bg-red-700 hover:bg-red-800 text-white shadow-xl shadow-red-200">
                                        LƯU THÔNG TIN
                                    </Button>
                                </DialogFooter>
                            </motion.form>
                        )}
                    </AnimatePresence>
                </DialogContent>
            </Dialog>
        </AdminLayout>
    )
}
