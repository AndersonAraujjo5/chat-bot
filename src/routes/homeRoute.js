import { Router } from 'express';
// eslint-disable-next-line import/no-unresolved
import homeController from '../controllers/HomeController';

const router = new Router();

router.get('/', homeController.index);

export default router;
