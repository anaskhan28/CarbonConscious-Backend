import mongoose, {Schema, Document} from "mongoose";

 interface UserInterface{
    name: string;
    email: string;
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
            /^([\w-\.]+@([\w-]+\.)+[\w-]{2,4})?$/,
            'Please fill a valid email address',
          ],
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
    updatedAt:{
        type: Date,
        default: Date.now
    }

});


export default mongoose.model<UserInterface>('User', userSchema);
