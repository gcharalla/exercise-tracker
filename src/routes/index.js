import express from 'express';
import { addUser, addExercise, getUserLogs, getUsers } from '../controller/controller';

const router = express.Router();

router.use(express.json());
router.use(express.urlencoded({ extended: true}));

router.post('/users', addUser);
router.get('/users', getUsers);
router.post('/users/:_id/exercises', addExercise)
router.get('/users/:_id/logs', getUserLogs)

export default router;