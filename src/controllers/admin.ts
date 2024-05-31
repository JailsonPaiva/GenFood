// import { createClient } from '@supabase/supabase-js'
// import express from 'express'
// import { Request, Response } from 'express';

// const supabase_key = process.env.SUPABASE_KEY || ''
// const supabaseUrl = process.env.SUPABASE_URL || ''

// const router = express.Router()
// const supabase = createClient(supabaseUrl, supabase_key)
// const provider = 'google'


// export async function login(req: Request, res: Response) {

//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider,
//         options: {
//             queryParams: {
//                 access_type: 'offline',
//                 prompt: 'consent',
//             }
//         },
//     })

//     if (data.url) {
//         res.redirect(data.url)
//     }

// }


// export async function callBack(req: Request, res: Response) {

//     const code = req.query.code
//     const next = req.query.next ?? '/'

//     if (code) {
//         const supabase = createClient(supabaseUrl, supabase_key)
//         await supabase.auth.exchangeCodeForSession(code as string)
//     }

//     res.redirect(303, '/dashboard')
// }


// export async function dashboard(req: Request, res: Response) {
    
//     res.json({message: 'deu certo'})
// }


// module.exports = router