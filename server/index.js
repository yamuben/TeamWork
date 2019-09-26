import express from 'express';
import bodyParse from 'body-parser';
import dotenv from 'dotenv';
import employeeroute from './routes/employeeRoute';
import articleroute from './routes/articleRoute';

dotenv.config();

const app = express();
app.use(bodyParse.json());

app.use('/api/v1/auth', employeeroute);
app.use('/api/v1', articleroute);
app.use('/', (req, res) => res.status(404).send({
  status: 404,
  error: 'Route doesn\'t exist',
}));
// app.use('/api/v1', articleroute);


const port = process.env.PORT || 300;

app.listen(port, () => console.log(`Listening on port ${port}...`));
export default app;
