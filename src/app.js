import express from 'express';
import morgan from 'morgan';
import dotenv from 'dotenv';
import cors from 'cors';
import cookieParser from 'cookie-parser';
import fileUpload from 'express-fileupload';

// Routers
import AuthRouter from "./routers/auth.routes.js";
import UserRouter from './routers/user.routes.js';
import CompanyRouter from './routers/company.routes.js';
import DocumentRouter from './routers/documents.routes.js';

// Custom middleware
import { errorHandler } from './middlewares/errorMiddleware.js';

// Path
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

const __filename = fileURLToPath(import.meta.url);
export const __dirname = path.dirname(__filename);

// dotenv
dotenv.config();

//Configuraciones
app.set('port', process.env.PORT || 3080);
app.set('json spaces', 2)

//Middleware
// Register the error handler middleware
app.use(errorHandler);
app.use(morgan('dev'));
app.use(express.urlencoded({extended:false}));
app.use(express.json());
app.use(express.text());
app.use(cors());
app.use(cookieParser());
app.use(fileUpload({
  useTempFiles : true,
  tempFileDir : '/tmp/',
  createParentPath: true
}));

//Routes
app.use("/api/auth",AuthRouter);

// Route User
app.use("/api/user", UserRouter);

// Route Company
app.use("/api/company", CompanyRouter);

// Route Document
app.use("/api/documents", DocumentRouter);

app.get('/', (req, res) => {
    res.status(200).json({message: 'Hello world'});
});


// app.use((req, res) => {
//     res.status(404).json({message: 'Not found'});
// });

export default app