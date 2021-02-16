import express from "express";
import OpenWeatherMap from 'openweathermap-ts';
import { weathers } from "./routes/weathers";
import { auth } from "./routes/auth";
import { updates } from "./routes/updates"
import { checkLogin } from "./routes/logged"

const app = express();
export const weather = new OpenWeatherMap({apiKey: '340269648576eaaff42a70eb35325e3a'});


app.use("/weathers", weathers);
app.use("/auth", auth)
app.use("/updates", updates)
app.use("/checkLogin", checkLogin)
app.listen(3001, () => console.log("Server started"));





