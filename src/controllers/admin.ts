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

    if (code) {
        await supabase.auth.exchangeCodeForSession(code as string);
    }

    res.redirect(303, "/updateUser");
}

export async function updateUser(req: Request, res: Response) {



    const { data, error } = await supabase.auth.updateUser({
        email: 'jailsonp437@gmail.com'
    })

    res.send(data);

    // try {

    // } catch (error) {

    // }

}
