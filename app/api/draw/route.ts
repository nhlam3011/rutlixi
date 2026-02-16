import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { name } = await request.json()
        const ip = request.headers.get('x-forwarded-for') || 'unknown'

        if (!name) {
            return NextResponse.json({ error: 'Name is required' }, { status: 400 })
        }

        // Initialize Supabase client (Server-side)
        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

        if (!supabaseUrl || !supabaseKey) {
            console.error('Supabase Configuration Error: URL or ANON_KEY is missing in .env')
            return NextResponse.json({
                error: 'Cấu hình hệ thống chưa hoàn thiện. Vui lòng kiểm tra file .env',
                details: 'Missing NEXT_PUBLIC_SUPABASE_URL or NEXT_PUBLIC_SUPABASE_ANON_KEY'
            }, { status: 500 })
        }

        const supabase = createClient(supabaseUrl, supabaseKey)

        // Call the database function (RPC)
        const { data, error } = await supabase.rpc('draw_lucky_money', {
            p_user_name: name,
            p_ip_address: ip
        })

        if (error) {
            console.error('Draw Error Full Object:', JSON.stringify(error, null, 2))
            return NextResponse.json({ error: error.message || 'Database Error', details: error }, { status: 500 })
        }

        if (data.error) {
            return NextResponse.json({ error: data.error }, { status: 410 }) // 410 Gone
        }

        return NextResponse.json(data)
    } catch (err) {
        console.error('Server Error:', err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
