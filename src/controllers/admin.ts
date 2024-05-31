import { createClient } from "@supabase/supabase-js";
import { Request, Response } from "express";

const supabase_key = process.env.SUPABASE_KEY as string;
const supabaseUrl = process.env.SUPABASE_URL as string;

const supabase = createClient(supabaseUrl, supabase_key);

const provider = "google";

// Rota para iniciar o login com Google
export async function login(req: Request, res: Response) {
    const { data, error } = await supabase.auth.signInWithOAuth({
        provider,
        options: {
            queryParams: {
              access_type: 'offline',
              prompt: 'consent',
            },
        },
    });
    console.log(data);

    if (data.url) {
        res.redirect(data.url); // use the redirect API for your server framework
    }
}

// Rota para capturar o callback de autenticação
export async function callback(req: Request, res: Response) {
    const code = req.query.code
    const next = req.query.next ?? "/"
  
    if (code) {
      const supabase = createClient(supabaseUrl, supabase_key)
      await supabase.auth.exchangeCodeForSession(code as string)
    }
    console.log(code)
    console.log(next)

    res.json(code)
}

export async function updateUser(req: Request, res: Response) {

    const token = req.cookies.supabaseToken;
    console.log(token)

    if (!token) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
    }

    const { data: user, error } = await supabase.auth.getUser(token);
    console.log(user)

    if (error) {
        return res.status(400).json({ error: error.message });
    }

    res.json(user);
}
