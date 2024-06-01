import { createClient } from "@supabase/supabase-js";
import { Request, Response } from "express";
import { Cookie } from "express-session";
const queryString = require('querystring');

const supabase_key = process.env.SUPABASE_KEY as string;
const supabaseUrl = process.env.SUPABASE_URL as string;

const supabase = createClient(supabaseUrl, supabase_key);

const provider = "google";



// Rota para iniciar o login com Google
export async function login(req: Request, res: Response) {

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider
    });

    if (data.url) {
        res.redirect(data.url); // use the redirect API for your server framework
    }
}

// Rota para capturar o callback de autenticação

export async function loadUser(req: Request, res: Response) {
    const token = req.body.access_token

    try {
        const { data } = await supabase.auth.getUser(token);
        
        if (!data.user) {
            return res.status(401).json({ data, token });
        }

        const { avatar_url, email, name, picture } = data.user.user_metadata;

        res.status(201).send({ avatar_url, email, name, picture })
    } catch (error) {
        res.status(500).json({ error })
    }
}