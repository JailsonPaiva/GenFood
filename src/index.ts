import express from 'express'
import { Router, Request, Response } from 'express';
import { login, callback, updateUser } from './controllers/admin'
import cookieParser from 'cookie-parser';

const PORT = 3333
const app = express();
const route = Router()

app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.get('/teste', login)
app.post('/callback', callback)
app.post('/updateUser', updateUser)



app.listen(PORT, () => `server running on port ${PORT}`)