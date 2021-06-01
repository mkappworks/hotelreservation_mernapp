import { model, Schema, Model, Document } from "mongoose";

export interface IGuest extends Document {
  email: string;
  password: string;
  name: string;
  mobileNumber: string;
}

const GuestSchema: Schema = new Schema({
  email: { type: String, required: true, unique: true, index: true },
  password: { type: String, required: true },
  name: { type: String, required: true },
  mobileNumber: { type: String, required: true },
});

const Guest: Model<IGuest> = model("Guest", GuestSchema);

export default Guest;
