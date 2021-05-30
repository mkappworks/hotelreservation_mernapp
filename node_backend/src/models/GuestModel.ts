import { model, Schema, Model, Document } from "mongoose";

export interface IGuest extends Document {
  password: string;
  name: string;
  email: string;
  mobileNumber: string;
}

const GuestSchema: Schema = new Schema({
  password: { type: String, required: true },
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  mobileNumber: { type: String, required: true },
});

const Guest: Model<IGuest> = model("Guest", GuestSchema);

export default Guest;
