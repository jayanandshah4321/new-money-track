import express from 'express';
import { login,registerUser ,manualData,addDatatoFile} from '../controller/userController.js';
import multer from 'multer';

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });
const Router = express.Router();

Router.post('/register',registerUser);
Router.post('/login',login);
Router.post('/add',manualData);
Router.post('/upload',upload.single('file'),addDatatoFile);

export default Router;