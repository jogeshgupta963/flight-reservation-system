import express from 'express';
import { createprofile } from './controllers/create-profile';
import { getprofile } from './controllers/get-profile';
import { isLoggedIn } from './middlewares/auth';
import { editprofile } from './controllers/edit-profile';
const app =express();
app.use(express.json());

app.post('/api/profile',isLoggedIn,createprofile);
app.get('/api/profile',isLoggedIn,getprofile)
app.post('/api/profile/edit',isLoggedIn,editprofile)

app.listen(4500)




