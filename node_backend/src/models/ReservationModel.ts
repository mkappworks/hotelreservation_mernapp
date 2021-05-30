import { model, Schema, Model, Document, ObjectId } from "mongoose";

export interface IReservation extends Document {
  guest: ObjectId;
  room: ObjectId;
  checkinDateTime: Date;
  numberOfNights: number;
  boardingType: string;
  numberOfGuest: number;
  paymentType: string;
  parking: boolean;
  roomAmenities: boolean;
  note: string;
  cancellationStatus: boolean;
  cancellationDateTime: Date;
  amount: number;
}

const ReservationSchema: Schema = new Schema({
  guest: { type: Schema.Types.ObjectId, ref: "Guest", required: true },
  room: { type: Schema.Types.ObjectId, ref: "Room", required: true },
  checkinDateTime: { type: Date, required: true },
  numberOfNights: { type: Number, required: true },
  boardingType: { type: String, required: true },
  numberOfGuest: { type: Number, required: true },
  paymentType: { type: String, required: true },
  parking: { type: Boolean, required: true },
  roomAmenities: { type: Boolean, required: true },
  note: { type: String, required: true },
  cancellationStatus: { type: Boolean, required: true },
  cancellationDateTime: { type: Date },
  amount: { type: Number, required: true },
});

const Reservation: Model<IReservation> = model(
  "Reservation",
  ReservationSchema
);

export default Reservation;
