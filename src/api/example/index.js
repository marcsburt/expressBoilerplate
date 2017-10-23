import express from 'express';
import exampleCtrl from './example.controller';

var router = express.Router();

router.route('/')
  .get(exampleCtrl.index)
  .post(exampleCtrl.create);

router.route('/:name')
  .get(exampleCtrl.findOne);

router.route('/:id')
  .delete(exampleCtrl.deleteOne);


export default router;
