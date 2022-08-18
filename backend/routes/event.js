import express from "express";
import { addEvent, deleteEvent, getEventDetails, getEvents, getUserEvents, registerUser, updateEvent } from "../controllers/event.js";
const router = express.Router();

router.post("/events",addEvent);

router.get("/events", getEvents);

router.delete("/events/:id", deleteEvent);

router.patch("/events/:id", updateEvent);

router.post("/events/:id", registerUser);

router.get("/events/:id", getUserEvents);

router.get("/events/details/:id", getEventDetails);

export default router;
