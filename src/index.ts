import express from 'express'
import { loadUser } from './controllers/admin'
import { googleAuth } from './middleware/googleAuth'
import cookieParser from 'cookie-parser';
import cors from 'cors'
import { access } from 'fs';

const PORT = 3333
const app = express();

const corsOptions = {
    origin: 'https://client-gen-food.vercel.app',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204,
    accessControlAllowOrigin: true
};
app.use(cors(corsOptions));


app.use(express.json())
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use('*', googleAuth)

app.post('/loadUser', loadUser)



app.listen(PORT, () => `server running on port ${PORT}`)