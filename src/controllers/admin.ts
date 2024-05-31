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
            redirectTo: "https://gen-food.vercel.app/callback",
        },
    });

    if (data.url) {
        res.redirect(data.url); // use the redirect API for your server framework
    }
}

// Rota para capturar o callback de autenticação
export async function callback(req: Request, res: Response) {
    const code = req.params.code;
    const next = req.params.next as string;

    const { data: session, error } = await supabase.auth.getSession();

    if (code) {
        await supabase.auth.exchangeCodeForSession(code as string);
    }

    (req.session as any).supabaseToken = session.session?.access_token;

    res.redirect(303, "/updateUser");
}

export async function updateUser(req: Request, res: Response) {

    const token = req.session.supabaseToken;

    if (!token) {
        return res.status(401).json({ error: 'Usuário não autenticado' });
      }
    
      const { data: user, error } = await supabase.auth.getUser(token);
    
      if (error) {
        return res.status(400).json({ error: error.message });
      }
    
      res.json(user);

}
