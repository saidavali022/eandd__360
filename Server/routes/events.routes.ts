import { Router } from 'express';
import { createEvent, deleteEvent, getUserEvent, getUserEvents, listEvents, updateEvent } from '../controllers/events.controller';

const router = Router();

router.get('/:userId/', getUserEvents);
router.get('/:userId/attend', listEvents);
router.get('/:userId/:eventId', getUserEvent);
router.post('/:userId/', createEvent);
router.put('/:userId/:eventId', updateEvent);
router.delete('/:userId/:eventId', deleteEvent);

export default router;
