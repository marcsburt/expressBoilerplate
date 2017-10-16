import express from 'express';
import exampleRoutes from './example';

const router = express.Router();


// check health of server
router.get('/health', (req, res) => {
  res.send('OK')
})

//mount api routes that import to app.js
router.use('/examples', exampleRoutes);

export default router;
