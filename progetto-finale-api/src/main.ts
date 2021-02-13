import express from "express";
import { current } from './routes/current'
import { forecast } from './routes/forecast'
import OpenWeatherMap from 'openweathermap-ts';

const app = express();
const weather = new OpenWeatherMap({apiKey: '340269648576eaaff42a70eb35325e3a'});

app.use("/weathers/current", current);
app.use("/weathers/forecast", forecast);

app.listen(3001, () => console.log("Server started"));





