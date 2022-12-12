import express from "express";

const router = express.Router();

router.post("/createEvent", createEvent);

export default router;
