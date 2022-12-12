import { event } from "./models.js";

export async function createEvent(req, res) {
    const data = req.body;

    

    const newEvent = new event({
        walletAddress: data.walletAddress,
        eventId: , // 8900  Walletaddress+event count
        organizer: String,
        name: string,
        description: string,
        startDateTime: Date, // check the data type for frontend
        endDateTime: Date, // check the data type for frontend
        location: String,
        postalCode: String,
        organizerEmail: String, // number / email
        capacity: int,
        price: String,
        ticketImage: Buffer,
        backgroundImage: Buffer,
    });
}
