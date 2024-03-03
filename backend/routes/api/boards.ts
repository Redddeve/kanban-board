import { Router } from 'express';
import validateBody from '../../middlewares/validateBody';
import {
  addBoardSchema,
  updateBoardNameSchema,
} from '../../schemas/joiValidator';
import getAllBoards from '../../controllers/boards/getAllBoards';
import getBoardById from '../../controllers/boards/getBoardById';
import removeBoard from '../../controllers/boards/removeBoard';
import addBoard from '../../controllers/boards/addBoard';
import updateBoardName from '../../controllers/boards/updateBoardName';

const router = Router();

router.get('/', getAllBoards);

router.get('/:id', getBoardById);

router.post('/', validateBody(addBoardSchema), addBoard);

router.patch('/:id', validateBody(updateBoardNameSchema), updateBoardName);

router.delete('/:id', removeBoard);

router.post('/');

router.put('/updatePosition');

export default router;
