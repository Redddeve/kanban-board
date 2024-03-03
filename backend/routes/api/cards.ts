import { Router } from 'express';
import validateBody from '../../middlewares/validateBody';
import {
  addCardSchema,
  updateCardSchema,
  updatePosSchema,
} from '../../schemas/joiValidator';
import addCard from '../../controllers/cards/addCard';
import removeCard from '../../controllers/cards/removeCard';
import updatePosition from '../../controllers/cards/updatePosition';
import updateCardContent from '../../controllers/cards/updateCard';

const router = Router();

router.post('/', validateBody(addCardSchema), addCard);

router.put('/updatePosition', validateBody(updatePosSchema), updatePosition);

router.put('/:id', validateBody(updateCardSchema), updateCardContent);

router.delete('/:id', removeCard);

export default router;
