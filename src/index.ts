import express from 'express'
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import morgan from 'morgan';
import connectMongoDB from './utils/Connection';
import allRoutes from './routes';
import session from 'express-session';
import  "./config/passport";
import passport from 'passport';



  
dotenv.config();


const app = express();

app.use(session({
    secret: process.env.SESSION_SECRET || '' ,
    resave: false,
    saveUninitialized: false,
    cookie: {secure: false}
}))
app.use(passport.initialize());
app.use(passport.session());

app.use(cors(
    {
        credentials: true,
    }
))
app.use(helmet()); // set security http headers
app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({extended: true}));
app.use(morgan('dev')); // http request logger


const MONGODB_URI = process.env.MONGODB_URI || ''

connectMongoDB(MONGODB_URI)


const port = process.env.PORT;



app.listen(port, () =>{
    console.log(`Server running at http://localhost:${port}`);
});

app.use('/', allRoutes())