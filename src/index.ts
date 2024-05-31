import express from 'express'
import { Router, Request, Response } from 'express';
import { login, callback, updateUser } from './controllers/admin'
import cookieParser from 'cookie-parser';
import './types/express-session';

const PORT = 3333
const app = express();
const route = Router()

app.use(express.json())
app.use(cookieParser());


app.get('/teste', login)
app.get('/callback', callback)
app.get('/updateUser', updateUser)



app.listen(PORT, () => `server running on port ${PORT}`)