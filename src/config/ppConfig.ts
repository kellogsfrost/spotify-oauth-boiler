import dotenv from 'dotenv';
dotenv.config();
import passport from 'passport';
import passportSpotify from 'passport-spotify'
import User from '../models/user';
const SpotifyStrategy = require('passport-spotify').Strategy;
 
passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT_ID,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:3000/auth/spotify/callback'
    },
    function(accessToken, refreshToken, profile, cb){
            console.log('get user back from spotify', profile);
            User.findOne({
                spotifyId: profile.id
            }, (err, user) =>{
                if (!user) {
                    User.create({
                       spotifyId: profile.id
                    }, (err, user) => {
                        return cb(null, {...user, accessToken});
                    })
                } else {
                    return cb(null, {...user, accessToken})
                }
            })
    }))
        
    passport.serializeUser(function(user, cb) {
            cb(null, user);
    });
    passport.deserializeUser(function(obj, cb){
            cb(null, obj);
    })
        
export default passport;
