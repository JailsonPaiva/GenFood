import { createClient } from "@supabase/supabase-js";
import { Request, Response } from "express";

const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFheW5iemx2YnVvY2J5amFtcnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNzIwOTQsImV4cCI6MjAzMjc0ODA5NH0.bXpd-t5IJGNwr-ufASliPakGKJ0R-idUKRYhxlZaBB0'
const supabaseUrl = 'https://aaynbzlvbuocbyjamrqq.supabase.co'

const supabase = createClient(supabaseUrl, supabase_key);

// const provider = "google";



// // Rota para iniciar o login com Google
// export async function login(req: Request, res: Response) {

//     const { data, error } = await supabase.auth.signInWithOAuth({
//         provider,
//         options: {
//             redirectTo: 'https://client-gen-food.vercel.app/Loading',
//         },
//     });

//     if (data.url) {
//         res.redirect(data.url); // use the redirect API for your server framework
//     }
// }

// Rota para capturar o callback de autenticação

export async function loadUser(req: Request, res: Response) {
    const token = req.body.access_token

    try {
        const { data: user } = await supabase.auth.getUser(token);

        if (!user.user) {
            return res.status(401).send({ message: 'Usuário não autenticado!' });
        }

        const { avatar_url, email, name, picture } = user.user.user_metadata;

        res.status(201).send({ avatar_url, email, name, picture })
    } catch (error) {
        res.status(500).send({ error })
    }
}