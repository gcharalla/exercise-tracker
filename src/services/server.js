import express from 'express'
import cors from 'cors'
import router from '../routes/index'
import handleError from '../middleware/error'

const app = express()

app.use(cors())

app.use(handleError)

app.use('/public', express.static(`${process.cwd()}/public`));

app.get('/', function(req, res) {
  res.sendFile(process.cwd() + '/views/index.html');
});

app.use('/api',router)

export default app;
