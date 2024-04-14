import express, {Request, Response} from 'express';
import passport from 'passport';
import { checkAuth as authenticationToken} from '../middleware/checkAuth'


interface User {
  _id: string;
  name: string; // Add this line
  email: string;
  googleId: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
}
export default (router: express.Router )=>{

   router.get('/auth/google', 
 passport.authenticate('google', { scope: ['profile', 'email'] }),
 router.get("/auth/google/callback", passport.authenticate("google"), (req: Request, res) => {
  return res.redirect('/auth/me')
  })
  
);
// router.get("/auth/me", (req: Request, res: Response) =>{
//   const user = req.user as User;
//   console.log(user)
//   if(user){
    
//     const name = user.name;
//     return res.send(`You are logged in ${name}`)
//   }
//     return res.send("You are not logged in", );
//  })


 router.get("/auth/logout", (req:Request, res) => {
   req.logout;
   return res.send("Logged out");
 });

 router.get("/auth/current_user", (req:Request, res) => {
   if(req.user === undefined){
     return res.send("No User Logged In")
   }
   res.send(req.user);
 });


   router.get('/auth/me', authenticationToken, (req:Request, res: express.Response) => {
       if (!req.user) {
           return res.status(401).json({ success: false, message: 'Unauthorized' });
       }
       return res.status(200).json({ success: true, message: 'Authorized', user: req.user });
   }
   );

   router.get('/', (req, res) => {
    res.send('Hello, world!');
});
}