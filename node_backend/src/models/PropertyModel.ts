import { model, Schema, Model, Document } from "mongoose";

export interface IProperty extends Document {
  property: string;
}

const PropertySchema: Schema = new Schema({
  property: { type: String, required: true, unique: true },
});

const Property: Model<IProperty> = model("Property", PropertySchema);

export default Property;
