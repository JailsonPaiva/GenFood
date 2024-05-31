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
    console.log(data);

    if (data.url) {
        res.redirect(data.url); // use the redirect API for your server framework
    }
}

// Rota para capturar o callback de autenticação
export async function callback(req: Request, res: Response) {

    const { data: { user } } = await supabase.auth.getUser()
    
    console.log(user);

    // if (error) {
    //     return res.status(400).json({ error: error.message });
    // }

    // // Armazena o token em um cookie seguro
    // res.cookie('supabaseToken', session.session?.access_token, {
    //     httpOnly: true, // Garante que o cookie só é acessível pelo HTTP
    //     secure: process.env.NODE_ENV === 'production', // Define secure como true em produção
    //     maxAge: 1000 * 60 * 60 * 24, // 1 dia
    // });

    // Opcionalmente, armazena as informações do usuário no banco de dados
    //   const { data: user, error: userError } = await supabase.auth.getUser(session.session?.access_token);

    //   if (userError) {
    //     return res.status(400).json({ error: userError.message });
    //   }

    //   const existingUser = await prisma.user.findUnique({
    //     where: { email: user.email },
    //   });

    //   if (!existingUser) {
    //     await prisma.user.create({
    //       data: {
    //         email: user.email,
    //         name: user.user_metadata.full_name,
    //       },
    //     });
    //   }

    res.json(data)
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
