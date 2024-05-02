import mongoose, {Schema, Document} from "mongoose";

 interface UserInterface{
    name: string;
    email: string;
    googleId: string;
    createdAt: Date;
    updatedAt: Date;

}


const userSchema: Schema = new Schema({
    name: {
        type: String,
        required: true,
        
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [
            /^\S+@\S+\.\S+$/,
            'Please fill a valid email address',
          ],
    },
    googleId:{
        type: String,
        unique: true

    },


}, { timestamps: true });


export default mongoose.model<UserInterface>('User', userSchema);
