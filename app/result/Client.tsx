"use client"

import { useSearchParams } from 'next/navigation'
import { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { supabase } from '@/lib/supabase'
import { TetBlossoms } from '@/components/ui/hoa-mai'
import { SkyLanterns, Lantern, AmbientGlow, DongSonPattern, LuckyCoin } from '@/components/ui/vibe-tet'

export default function ResultClient() {
    const searchParams = useSearchParams()
    const name = searchParams.get('name') || 'Bạn'
    const dataParam = searchParams.get('data')

    const [prize, setPrize] = useState<any>(null)

    useEffect(() => {
        if (dataParam) {
            try {
                setPrize(JSON.parse(decodeURIComponent(dataParam)))
            } catch (e) {
                console.error(e)
            }
        }
    }, [dataParam])

    const [selfie, setSelfie] = useState<File | null>(null)
    const [qr, setQr] = useState<File | null>(null)
    const [submitting, setSubmitting] = useState(false)
    const [submitted, setSubmitted] = useState(false)
    const [error, setError] = useState('')
    const [randomWish, setRandomWish] = useState('')

    useEffect(() => {
        const wishes = [
            "Bính Ngọ xuân sang, mã đáo thành công, vạn sự hanh thông.",
            "Công việc như ngựa phi, tài lộc như mưa đổ, hạnh phúc như hoa cười.",
            "Vạn sự như ý, tỉ sự như mơ, triệu triệu bất ngờ, không chờ cũng đến.",
            "Năm mới Bính Ngọ, vạn dặm thành công, lộc vàng gõ cửa, phú quý vinh quang.",
            "Xuân này hơn hẳn mấy xuân qua. Phúc lộc đưa nhau đến từng nhà.",
            "Tân xuân như ý, vạn sự hanh thông, ngựa vàng mang lộc tới tận cửa.",
            "Chúc bạn phong độ như chiến mã, bền bỉ như tuấn mã, thành công rực rỡ.",
            "Cung chúc tân niên, vạn sự bình yên, hạnh phúc vô biên, vui vẻ triền miên.",
            "Lộc xuân đầy nhà, cả năm sung túc, phúc đức vẹn toàn.",
            "Sức khỏe dồi dào, tiền vào như nước, tình duyên thắm thiết.",
            "Công danh hiển hách, sự nghiệp vững bền, năm mới cát tường.",
            "Chúc mừng năm mới, an khang thịnh vượng, phát tài lộc vinh hoa.",
            "Vạn sự như ý - Tỉ sự như mơ - Triệu điều bất ngờ.",
            "Tấn tài tấn lộc - Xuân mới an khang - Gia đình hạnh phúc.",
            "Sự nghiệp thăng tiến, mã đáo thành công, vạn dặm bình an."
        ]
        setRandomWish(wishes[Math.floor(Math.random() * wishes.length)])
    }, [])

    const uploadFile = async (file: File, path: string) => {
        const { data, error } = await supabase.storage
            .from('lucky-money')
            .upload(path, file)
        if (error) throw error
        return data?.path
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!selfie || !qr || !prize) return

        setSubmitting(true)
        setError('')

        try {
            const timestamp = Date.now()
            const selfiePath = `selfies/${timestamp}_${name}_selfie.jpg`
            const qrPath = `qrs/${timestamp}_${name}_qr.jpg`

            await uploadFile(selfie, selfiePath)
            await uploadFile(qr, qrPath)

            const { data: { publicUrl: selfieUrl } } = supabase.storage.from('lucky-money').getPublicUrl(selfiePath)
            const { data: { publicUrl: qrUrl } } = supabase.storage.from('lucky-money').getPublicUrl(qrPath)

            const res = await fetch('/api/submit-info', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    prize_id: prize.id,
                    user_name: name,
                    selfie_url: selfieUrl,
                    qr_url: qrUrl
                })
            })

            if (!res.ok) throw new Error('Failed to submit info')

            setSubmitted(true)
        } catch (err: any) {
            console.error(err)
            setError(err.message || 'Lỗi khi gửi thông tin. Vui lòng thử lại.')
        } finally {
            setSubmitting(false)
        }
    }

    if (!prize) return <div className="flex min-h-screen items-center justify-center bg-red-900 text-yellow-500 font-serif">Đang khai lộc...</div>

    if (submitted) {
        return (
            <main className="flex h-[100dvh] flex-col items-center justify-center p-4 bg-black overflow-hidden relative text-center">
                <motion.div
                    initial={{ scale: 1.1 }}
                    animate={{ scale: [1.1, 1.03, 1.1] }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
                    style={{ backgroundImage: 'url("/bg-result-2026.png")' }}
                />
                <div className="absolute inset-0 bg-black/70 z-0" />
                <DongSonPattern />
                <TetBlossoms />
                <SkyLanterns />
                <AmbientGlow />
                <Lantern left="15%" top="-20px" delay={0.2} />
                <Lantern left="85%" top="-40px" delay={0.5} />
                <LuckyCoin delay={1} />
                <LuckyCoin delay={3} />
                <motion.div
                    initial={{ scale: 0.8, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    className="bg-black/40 backdrop-blur-3xl p-6 sm:p-10 rounded-[2.5rem] sm:rounded-[3rem] border border-white/20 shadow-2xl w-full max-w-[90vw] sm:max-w-md ring-1 ring-white/10 relative z-10"
                >
                    <div className="text-4xl sm:text-6xl mb-4 sm:mb-6 drop-shadow-lg">🎊</div>
                    <h1 className="text-3xl sm:text-4xl font-black text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-500 mb-3 sm:mb-4 font-serif leading-tight">THÀNH CÔNG!</h1>
                    <p className="text-lg sm:text-xl font-medium text-white mb-3 sm:mb-4">Chúc bạn vạn sự như ý!</p>
                    <p className="text-[10px] sm:text-sm text-yellow-100/60 mb-6 sm:mb-8 px-2 sm:px-4 font-medium leading-relaxed">Thông tin của bạn đã được chuyển tới Admin.</p>
                    <Button onClick={() => window.location.href = '/'} className="w-full bg-gradient-to-r from-yellow-700 via-yellow-400 to-yellow-700 text-red-950 font-black h-14 sm:h-16 rounded-xl sm:rounded-2xl hover:brightness-110 shadow-lg transition-transform active:scale-95 text-lg">
                        QUAY VỀ TRANG CHỦ
                    </Button>
                </motion.div>
            </main>
        )
    }

    return (
        <main className="flex h-[100dvh] flex-col items-center justify-center p-4 bg-black overflow-hidden relative">
            <motion.div
                initial={{ scale: 1.1 }}
                animate={{ scale: [1.1, 1.03, 1.1] }}
                transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0 bg-cover bg-center pointer-events-none z-0"
                style={{ backgroundImage: 'url("/bg-result-2026.png")' }}
            />
            <div className="absolute inset-0 bg-black/50 z-0" />
            <DongSonPattern />
            <TetBlossoms />
            <SkyLanterns />
            <AmbientGlow />
            <Lantern left="15%" top="-20px" delay={0.2} />
            <Lantern left="85%" top="-40px" delay={0.5} />
            <LuckyCoin delay={1.5} />
            <LuckyCoin delay={4} />
            <motion.div
                initial={{ y: 50, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="w-full max-w-md bg-white p-6 sm:p-8 rounded-[3rem] shadow-[0_40px_80px_rgba(0,0,0,0.6)] relative max-h-full overflow-y-auto"
            >
                <div className="text-center mb-6 sm:mb-10">
                    <p className="text-red-600 font-bold uppercase tracking-[0.3em] text-[10px] sm:text-xs mb-2 sm:mb-3">Chúc Mừng Bạn!</p>
                    <h1 className="text-3xl sm:text-5xl font-black text-red-700 mb-2 font-serif drop-shadow-sm">{prize.name}</h1>
                    <div className="w-16 sm:w-24 h-1.5 bg-gradient-to-r from-transparent via-yellow-500 to-transparent mx-auto rounded-full my-4 sm:my-6" />

                    <div className="relative py-4 px-2">
                        <span className="absolute top-0 left-0 text-yellow-500/20 text-6xl font-serif">"</span>
                        <p className="text-transparent bg-clip-text bg-gradient-to-br from-red-600 via-red-800 to-red-900 text-lg sm:text-3xl font-serif font-black italic leading-relaxed px-6">
                            {randomWish}
                        </p>
                        <span className="absolute bottom-0 right-0 text-yellow-500/20 text-6xl font-serif translate-y-4">"</span>
                    </div>
                </div>

                {prize.type === 'money' ? (
                    <form onSubmit={handleSubmit} className="space-y-4 sm:space-y-6">
                        <div className="bg-orange-50 p-4 sm:p-5 rounded-2xl border border-orange-100">
                            <p className="text-orange-900 font-bold text-xs sm:text-sm mb-2 sm:mb-3 flex items-center gap-2">
                                🧧 NHẬN QUÀ LIỀN TAY:
                            </p>
                            <div className="space-y-1 sm:space-y-2 text-[10px] sm:text-xs text-orange-800/80 leading-relaxed">
                                <p>• Tải ảnh selfie của bạn (để Admin đối soát).</p>
                                <p>• Tải ảnh mã QR ngân hàng hoặc ví điện tử.</p>
                            </div>
                        </div>

                        <div className="space-y-5">
                            <div className="space-y-2">
                                <Label htmlFor="selfie" className="text-xs font-bold text-gray-400 uppercase ml-1">Ảnh Selfie</Label>
                                <div className="relative group">
                                    <Input
                                        id="selfie"
                                        type="file"
                                        accept="image/*"
                                        onChange={(e) => setSelfie(e.target.files?.[0] || null)}
                                        required
                                        className="h-14 bg-gray-50 border-gray-100 rounded-xl cursor-pointer file:bg-red-600 file:text-white file:border-0 file:rounded-lg file:px-4 file:h-8 file:mt-1 file:mr-4 file:text-xs file:font-bold hover:bg-gray-100 transition-colors"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="qr" className="text-xs font-bold text-gray-400 uppercase ml-1">Mã QR Nhận Tiền</Label>
                                <Input
                                    id="qr"
                                    type="file"
                                    accept="image/*"
                                    onChange={(e) => setQr(e.target.files?.[0] || null)}
                                    required
                                    className="h-14 bg-gray-50 border-gray-100 rounded-xl cursor-pointer file:bg-red-600 file:text-white file:border-0 file:rounded-lg file:px-4 file:h-8 file:mt-1 file:mr-4 file:text-xs file:font-bold hover:bg-gray-100 transition-colors"
                                />
                            </div>
                        </div>

                        {error && <p className="text-red-500 text-xs text-center font-medium bg-red-50 p-2 rounded-lg">{error}</p>}

                        <Button
                            type="submit"
                            className="w-full bg-red-600 hover:bg-red-700 text-white font-black h-14 sm:h-16 rounded-2xl shadow-xl shadow-red-200 transition-all active:scale-95 text-sm sm:text-base"
                            disabled={submitting || !selfie || !qr}
                        >
                            {submitting ? 'ĐANG XỬ LÝ...' : 'XÁC NHẬN NHẬN QUÀ'}
                        </Button>
                    </form>
                ) : (
                    <div className="text-center py-6">
                        <Button onClick={() => window.location.href = '/'} className="w-full bg-red-600 hover:bg-red-700 text-white font-black h-16 rounded-2xl shadow-xl">
                            QUAY VỀ
                        </Button>
                    </div>
                )}
            </motion.div>
        </main>
    )
}
