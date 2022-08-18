import mongoose from "mongoose";

const eventSchema = mongoose.Schema({
    name: "",
    start: "",
    end: "",
    location: Object,
    seats: Number,
    seatsFilled: Number
});

const Event = mongoose.model('Event',eventSchema);

export default Event;