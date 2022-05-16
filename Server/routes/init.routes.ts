import { Router } from 'express';
import { initTables } from '../controllers/init.controller';

const router = Router();

router.post('/', initTables);

export default router;
