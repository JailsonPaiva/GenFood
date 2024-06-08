import { createClient } from "@supabase/supabase-js";
import { NextFunction, Request, Response } from "express";

const supabase_key = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFheW5iemx2YnVvY2J5amFtcnFxIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MTcxNzIwOTQsImV4cCI6MjAzMjc0ODA5NH0.bXpd-t5IJGNwr-ufASliPakGKJ0R-idUKRYhxlZaBB0'
const supabaseUrl = 'https://aaynbzlvbuocbyjamrqq.supabase.co';
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
