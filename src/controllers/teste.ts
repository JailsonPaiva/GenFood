import { createClient } from '@supabase/supabase-js'
import express from 'express'
import { Request, Response } from 'express';

const supabaseUrl = 'https://aaynbzlvbuocbyjamrqq.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFheW5iemx2YnVvY2J5amFtcnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNzIwOTQsImV4cCI6MjAzMjc0ODA5NH0.bXpd-t5IJGNwr-ufASliPakGKJ0R-idUKRYhxlZaBB0'
const supabase = createClient(supabaseUrl, supabaseKey)

const provider = 'google'


// Rota para iniciar o login com Google
export async function login(req: Request, res: Response) {

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            redirectTo: 'https://gen-food.vercel.app/callback',
        },
    })

    if (data.url) {
        res.redirect(data.url) // use the redirect API for your server framework
    }



    // const { data, error } = await supabase.auth.signInWithOAuth({
    //     provider,
    //     options: {
    //         queryParams: {
    //             access_type: 'offline',
    //             prompt: 'consent',
    //         }
    //     }
    // });
    // console.log(data)
    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }

    // res.redirect(data.url);
};

// Rota para capturar o callback de autenticação
export async function callback(req: Request, res: Response) {

    const code = req.params.code
    const next = req.params.next as string


    if (code) {
        await supabase.auth.exchangeCodeForSession(code as string)
    }

    res.redirect(303, `/${next.slice(1)}`)
}

//     const { access_token, refresh_token } = req.params;

//     if (!access_token || !refresh_token) {
//         return res.status(400).json({ error: 'Missing tokens' });
//     }

//     const { data, error } = await supabase.auth.getUser(access_token as string);
//     console.log(data)
//     if (error) {
//         return res.status(400).json({ error: error.message });
//     }

//     res.json({ data });
// };


export async function dashboard(req: Request, res: Response) {
    res.json({ title: 'teste' })
}