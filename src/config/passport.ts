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

       return done(null, newUser)

    }
} catch(error){
   done(error as Error)
}
}
));


passport.serializeUser((user: Express.User, done) =>{
    console.log(user, 'serailize');

    done(null, user)

})

passport.deserializeUser(async (id:string, done) =>{
    try{
        const user = await User.findById(id);
        done(null, user);
    } catch(error){
        done(error);
    }
})

