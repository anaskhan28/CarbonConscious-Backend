import mongoose, { Schema, Document } from "mongoose";

interface FoodInterface extends Document {
  name: string;
  carbonFootprint: number;
  userId: Schema.Types.ObjectId;
}

const foodSchema: Schema = new Schema(
  {
    name: {
      type: String,
      required: true,
    },
    quantity: {
        type: String,
        required: true,
    },
    
    carbonEmission: {
      type: Number,
      required: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);

export default mongoose.model<FoodInterface>("Food", foodSchema);