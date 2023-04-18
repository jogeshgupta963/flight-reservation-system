import request from "supertest";
import { app } from "../../../app";

it("get all flights", async () => {
    const res = await request(app).get(`/api/flight`).expect(200);
    expect(res.body.success).toEqual(true);
});
