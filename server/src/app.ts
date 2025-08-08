import express,{Application ,Request, Response}from "express";
import bodyParser  from 'body-parser'
const app:Application = express();
import router from "./Routes/userRoutes";
import dotenv from 'dotenv';
import path from "path";
import {pool} from '../src/config/db'; 
import fileUpload from 'express-fileupload';
import userRouter from "./utils/upload"
dotenv.config();
import cors from "cors";
app.use(cors());
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
 app.set('views', path.join(__dirname, 'views')); 
 app.use(fileUpload());

app.use(express.static('public'));
// app.use('/uploads',express.static(path.join(__dirname, '/uploads')));

app.use("/" ,router);
app.use("/", userRouter);

   async function checkDbConnection() {
        try {
            const client = await pool.connect();
            console.log('✅ PostgreSQL database connected successfully.');
            client.release(); 
        } catch (error) {
            console.error('❌ Error connecting to PostgreSQL database:', error);
            process.exit(1); 
        }
    }
        checkDbConnection().then(() => {
            app.listen(3000,()=>{
                console.log("server is running on port 3000"); 
            })
    });
