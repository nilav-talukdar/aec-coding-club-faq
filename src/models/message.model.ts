import mongoose from "mongoose";

export interface IMessage {
  _id?: mongoose.Types.ObjectId;
  message: string;
  createdAt?: Date;
  updatedAt?: Date;
}

const messageSchema = new mongoose.Schema<IMessage>(
  {
    message: {
      type: String,
      required: [true, "message is required"],
      trim: true,
      minLength: [2, "message is too short"],
    },
  },
  { timestamps: true }
);

const Message =
  mongoose.models?.Message ||
  mongoose.model<IMessage>("Message", messageSchema);

export default Message;
