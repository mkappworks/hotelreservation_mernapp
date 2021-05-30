import { model, Schema, Model, Document } from "mongoose";

export interface IRoomRate extends Document {
  boardingType: string;
  numberOfGuest: string;
  rate: number;
}

const RoomRateSchema: Schema = new Schema({
  boardingType: { type: String, required: true },
  numberOfGuest: { type: String, required: true },
  rate: { type: Number, required: true },
});

const RoomRate: Model<IRoomRate> = model("RoomRate", RoomRateSchema);

export default RoomRate;
