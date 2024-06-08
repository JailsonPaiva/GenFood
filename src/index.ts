import express from 'express';
import { loadUser } from './controllers/admin';
import { googleAuth } from './middleware/googleAuth';
import cookieParser from 'cookie-parser';
const cors = require('cors');

const PORT = 3333;
const app = express();

const corsOptions = {
    origin: '*', // Permite todas as origens. Ajuste conforme necessário.
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    optionsSuccessStatus: 204
};

app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Verifique se o middleware googleAuth não está bloqueando requisições OPTIONS
app.use((req, res, next) => {
    if (req.method === 'OPTIONS') {
        res.sendStatus(204);
    } else {
        next();
    }
});

app.use('*', googleAuth);

app.post('/loadUser', loadUser);

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
