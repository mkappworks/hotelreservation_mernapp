import express from "express";
import Cors from "cors";
import mongoose from "mongoose";
// import passport from "passport";

require("dotenv/config");
//require("./config/passpart");

const app = express();
app.use(Cors());
app.use(express.json());
// app.use(passport.initialize());

//Import routes
const authRoutes = require("./routes/AuthRoutes");
const guestRoutes = require("./routes/GuestRoutes");
const propertyRoutes = require("./routes/PropertyRoutes");
const reservationRoutes = require("./routes/ReservationRoutes");
const roomRateRoutes = require("./routes/RoomRateRoutes");
const roomRoutes = require("./routes/RoomRoutes");

app.use("/auth", authRoutes);
app.use("/guest", guestRoutes);
app.use("/property", propertyRoutes);
app.use("/reservation", reservationRoutes);
app.use("/roomrate", roomRateRoutes);
app.use("/room", roomRoutes);

process.env.ACCESS_TOKEN_SECRET;

mongoose.connect(
  `mongodb+srv://${process.env.DB_CONNECTION_USER_ID}:${process.env.DB_CONNECTION_PASSWORD}@cluster0.nwd47.mongodb.net/HotelReservationDB?retryWrites=true&w=majority`,
  {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  },
  () => {
    console.log("Connected to MonogoDB ");
  }
);

const PORT = process.env.PORT || 3500;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
