import { Router } from 'express';
import validateBody from '../../middlewares/validateBody';
import addCard from '../../controllers/cards/addCard';
import removeCard from '../../controllers/cards/removeCard';
import { addCardSchema, updatePosSchema } from '../../schemas/joiValidator';
import updatePosition from '../../controllers/cards/updatePosition';

const router = Router();

router.post('/', validateBody(addCardSchema), addCard);

router.put('/updatePosition', validateBody(updatePosSchema), updatePosition);

router.delete('/:id', removeCard);

export default router;
