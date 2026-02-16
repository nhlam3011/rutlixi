import { createClient } from '@supabase/supabase-js'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
    try {
        const { prize_id, user_name, selfie_url, qr_url } = await request.json()

        if (!user_name || !prize_id) {
            return NextResponse.json({ error: 'Missing required fields' }, { status: 400 })
        }

        const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
        const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
        const supabase = createClient(supabaseUrl, supabaseKey)

        // In a real app we'd update the specific draw ID returned from the draw API
        // Here we'll find the latest draw for this user and prize that is pending?
        // Or just update the latest draw.
        // For SAFETY in this prototype, I will just update the latest draw record for this user/prize 
        // that doesn't have URLs yet.

        const { data, error } = await supabase
            .from('draws')
            .update({ selfie_url, qr_url, status: 'completed' })
            .eq('user_name', user_name)
            .eq('prize_id', prize_id)
            .is('selfie_url', null) // Only update if empty
            .order('created_at', { ascending: false })
            .limit(1)
            .select()

        if (error) {
            console.error(error)
            return NextResponse.json({ error: error.message }, { status: 500 })
        }

        return NextResponse.json({ success: true })
    } catch (err) {
        console.error(err)
        return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 })
    }
}
