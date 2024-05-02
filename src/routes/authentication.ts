import express from 'express';
import passport from 'passport';
import { checkAuth as authenticationToken} from '../middleware/checkAuth'

interface Request extends express.Request {
  user?: any; // or the type of your user object
}

export default (router: express.Router )=>{

   router.get('/auth/google', 
 passport.authenticate('google', { scope: ['profile', 'email'] }),
 router.get("/auth/google/callback", passport.authenticate("google"), (req: Request, res) => {
  return res.redirect('/profile')
  })
  
);
router.get("/profile", authenticationToken, (req, res) => {
  res.json({ user: req.user });
});
 
router.get("/auth/logout", (req:Request, res) => {
  req.logout(() => {}); 
  res.send("Logged out");
});


  router.get('/auth/me', authenticationToken, (req:Request, res: express.Response) => {
      if (!req.user) {
          return res.status(401).json({ success: false, message: 'Unauthorized' });
      }
      return res.status(200).json({ success: true, message: 'Authorized', user: req.user });
  }
  );


}