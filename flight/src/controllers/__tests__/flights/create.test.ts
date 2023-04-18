import request from "supertest";
import { app } from "../../../app";

it("Create flight", async () => {
    const res = await request(app)
        .post(`/api/flight`)
        .send({
            airlineId: 1234,
            dateOfFlight: "1st april",
            timeOfFlight: "1AM",
            fare: 200,
            availableSeats: 200,
        })
        .expect(403);
    expect(res.body.success).toEqual(false);
});
