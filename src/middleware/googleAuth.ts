import { createClient } from "@supabase/supabase-js";
import { NextFunction, Request, Response } from "express";

const supabase_key = process.env.SUPABASE_KEY as string;
const supabaseUrl = process.env.SUPABASE_URL as string;

const supabase = createClient(supabaseUrl, supabase_key);


const provider = "google";


// Rota para iniciar o login com Google
export async function googleAuth(req: Request, res: Response, next: NextFunction) {
    
    try {
        const { data, error } = await supabase.auth.signInWithOAuth({
            provider,
            options: {
                redirectTo: 'https://client-gen-food.vercel.app/Loading',
            },
        });
    
        if (data.url) {
            res.redirect(data.url);
            next(); // use the redirect API for your server framework
        }
    } catch(error) {

        next(error);
    }
}
