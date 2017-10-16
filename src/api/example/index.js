import express from 'express';
import exampleCtrl from './example.controller';

var router = express.Router();

router.route('/')
  .get(exampleCtrl.index)
  .post(exampleCtrl.create);

export default router;
