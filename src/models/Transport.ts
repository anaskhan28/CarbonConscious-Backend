import mongoose, {Schema, Document} from "mongoose";

interface TransportInterface {
    mode: string
    duration: number,
    distance: number,
    carbonEmission: number,

}

const transportSchema: Schema =  new Schema({
    mode: {
        type: String,
        required: true,
    },
    duration: {
        type: Number,
        required: true,
    },
    distance: {
        type: Number,
        required: true,
    },
    carbonEmission: {
        type: Number,
        required: true,
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    }


});

export default mongoose.model<TransportInterface>('Transport', transportSchema);