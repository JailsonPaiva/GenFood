import express from 'express';
import { loadUser, login } from './controllers/admin';
// import { googleAuth } from './middleware/googleAuth';
import cookieParser from 'cookie-parser';
import cors from 'cors';

const PORT = 3333;
const app = express();

app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Verifique se o middleware googleAuth não está bloqueando requisições OPTIONS

// app.use('*', googleAuth);

app.get('/login', login);
app.post('/loadUser', loadUser);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
