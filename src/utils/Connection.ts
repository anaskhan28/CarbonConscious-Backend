import mongoose from 'mongoose';


const connectMongoDB = (url: string) =>{
mongoose.connect(url || '')
  .then(() => console.log('MongoDB connected...'))
  .catch(err => console.log(err));

}
  export default connectMongoDB