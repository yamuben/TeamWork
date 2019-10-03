import express from 'express';
import bodyParse from 'body-parser';
import dotenv from 'dotenv';
import employeeroute from './routes/employeeRoute';
import articleroute from './routes/articleRoute';


const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('../swagger.json');

dotenv.config();

const app = express();

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));
app.use(bodyParse.json());

app.use('/api/v1/auth', employeeroute);
app.use('/api/v1', articleroute);
app.use('/', (req, res) => res.status(404).send({
  Status: 404,
  error: 'Route doesn\'t exist',
}));


const port = process.env.PORT || 3000;

app.listen(port, () => console.log(`Listening on port ${port}...`));
export default app;
