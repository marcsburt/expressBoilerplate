import express from 'express';
import compression from 'compression';

/* eslint-disable no-console */

const port = 3000;
const app = express();

app.use(compression());
app.use(express.static('dist'));

app.get('/', (req, res) => {
  res.json(404);
});


app.listen(port, (err) => {
  if (err) {
    console.log(err)
  }
});
