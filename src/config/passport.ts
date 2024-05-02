import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Profile } from 'passport-google-oauth20';
import { VerifyCallback } from 'passport-oauth2';
import User from '../models/User';
import { AuthSchema } from '../schema/AuthSchema';


passport.use(new GoogleStrategy({

    clientID:process.env.GOOGLE_CLIENT_ID || "",
    clientSecret:process.env.GOOGLE_CLIENT_SECRET || "",
    callbackURL: "/auth/google/callback/"
  },
  async (accessToken: string, refreshToken: string, profile: Profile, done: VerifyCallback) => {
    

    try{

    const userData = {
        googleId: profile.id,
        name: profile.displayName,
        email: profile.emails?.[0].value,
    };
    const parseUserData = AuthSchema.parse(userData)

    let user = await User.findOne({email: parseUserData.email});
    if(user){
        done(null, user)
    }else{

        const newUser = await User.create(parseUserData);

        if (newUser) {
            done(null, newUser);
          }

    }
} catch(error){
   done(error as Error)
}
}
));


passport.serializeUser((user:any, done) => {
    console.log(user, 'serialize');
    done(null, user.id);
  });
  
  passport.deserializeUser(async (id: any, done) => {
    const user = await User.findById(id);
    console.log(user, 'deceralize');
    done(null, user);
  });

