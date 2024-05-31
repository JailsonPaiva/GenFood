import express from 'express'
import { Router, Request, Response } from 'express';

// import  { login }  from './controllers/admin'
import { login, callback } from './controllers/teste'

const PORT = 3333
const app = express();
const route = Router()

app.use(express.json())


app.get('/teste', login)
app.get('/callback', callback)



app.listen(PORT, () => `server running on port ${PORT}`)