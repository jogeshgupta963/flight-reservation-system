import express from "express";
import { createprofile } from "./controllers/create-profile";
import { getprofile } from "./controllers/get-profile";
import { isLoggedIn } from "./middlewares/auth";
import { editprofile } from "./controllers/edit-profile";
const app = express();
app.use(express.json());

app.get("/api/profile/index", (req, res) => {
    res.send("Inedx page of Profile");
});
app.post("/api/profile", isLoggedIn, createprofile);
app.get("/api/profile", isLoggedIn, getprofile);
app.post("/api/profile/edit", isLoggedIn, editprofile);

app.listen(3000, () => {
    console.log("running on port 3000");
});
