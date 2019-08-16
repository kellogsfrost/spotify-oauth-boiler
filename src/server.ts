import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import session from 'express-session';
import mongoose from 'mongoose';
import passport from './config/ppConfig';

const app = express();

app.use(express.static(__dirname + "/../client/build"));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.set('view engine', 'ejs');

// The mongoose connection string needs to be typed as string 
mongoose.connect(process.env.MONGODB_URI as string)
const db = mongoose.connection;
// Connection types don't seem to support db.host or db.port
db.once('open', () => {
    console.log("Connected to mongo at probably the right place");
});
db.on('error', (err) => {
    console.log("An error has occurred:", err)
});

// Configure the express-session middleware
app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));

// Configure passport middleware
app.use(passport.initialize());
app.use(passport.session());

import authRouter from './routes/auth';
app.use('/auth', authRouter);

import apiRouter from './routes/api';
app.use('/api', apiRouter)


app.get('*', (req, res) => {
    res.sendFile(__dirname + "/../client/build/index.html")
});

app.listen(process.env.Port || 3000);