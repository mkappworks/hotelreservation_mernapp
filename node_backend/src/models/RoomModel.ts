import { model, Schema, Model, Document, ObjectId } from "mongoose";

export interface IRoom extends Document {
  property: ObjectId;
  room: string;
  view: string;
  bathtub: boolean;
  balcony: boolean;
  wifi: boolean;
  floorArea: number;
}

const RoomSchema: Schema = new Schema({
  property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
  room: { type: String, required: true },
  view: { type: String, required: true },
  bathtub: { type: Boolean, required: true },
  balcony: { type: Boolean, required: true },
  wifi: { type: Boolean, required: true },
  floorArea: { type: Number, required: true },
});

const Room: Model<IRoom> = model("Room", RoomSchema);

export default Room;
