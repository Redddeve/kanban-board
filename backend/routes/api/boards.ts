import { Router } from 'express';
import validateBody from '../../middlewares/validateBody';
import getAllBoards from '../../controllers/boards/getAllBoards';
import getBoardById from '../../controllers/boards/getBoardById';
import { addBoardSchema, updateBoardSchema } from '../../schemas/joiValidator';
import removeBoardById from '../../controllers/boards/removeBoardById';
import addBoard from '../../controllers/boards/addBoard';

const router = Router();

router.get('/', getAllBoards);

router.get('/:id', getBoardById);

router.post('/', validateBody(addBoardSchema), addBoard);

router.put('/:id', validateBody(updateBoardSchema));

router.delete('/:id', removeBoardById);

export default router;
