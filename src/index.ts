import express from 'express'
import { Router, Request, Response } from 'express';
import session from 'express-session';
import { login, callback, updateUser } from './controllers/admin'

import './types/express-session';

const PORT = 3333
const app = express();
const route = Router()

app.use(express.json())
app.use(session({
    secret: 'caueGay',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true } // Defina como true em produção, com HTTPS
}));
;

app.get('/teste', login)
app.get('/callback', callback)
app.get('/updateUser', updateUser)



app.listen(PORT, () => `server running on port ${PORT}`)