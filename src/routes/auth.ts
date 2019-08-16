import express from 'express';
const router = express.Router();
import passport from '../config/ppConfig';

// GET /auth/github - displays the GH login page
router.get('/spotify', passport.authenticate('spotify'));

// GET /auth/github/callback - callback URL that receives the token
router.get('/spotify/callback', 
    passport.authenticate('spotify', {failureRedirect: '/auth/login'}),
    (req, res) => {
        //Successful authentication
        console.log("This is the Spotify user:", req.user);
        res.render('success', {user: req.user});
    });


    export default router;