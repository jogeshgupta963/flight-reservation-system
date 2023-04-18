import request from "supertest";
import { app } from "../../../app";

it("get flight by id", async () => {
    const res = await request(app).get(`/api/flight/${1234}`).expect(400);
    expect(res.body.success).toEqual(false);
});
