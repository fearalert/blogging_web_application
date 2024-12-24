import express from 'express';
import cors from 'cors';
import router from './routes/routes';
import bodyParser from 'body-parser';

const app = express();
app.use(cors());
app.use(express.json());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use('/api/v1', router);

export default app;
