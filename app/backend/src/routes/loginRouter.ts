import { Router } from 'express';
import bodyLogin from '../schemas/bodyLogin';
import bodyMiddleware from '../middlewares/bodyMiddleware';

const router = Router();

router.use(bodyMiddleware(bodyLogin));

router
  .post('/', (req, res) => res.sendStatus(200));

export default router;
