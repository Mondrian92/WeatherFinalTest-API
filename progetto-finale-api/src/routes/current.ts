import express, {Request, Response, NextFunction} from "express";
import OpenWeatherMap from 'openweathermap-ts';
import {weather} from '../main'
//const weather = new OpenWeatherMap({apiKey: '340269648576eaaff42a70eb35325e3a'});
const router = express.Router();

router.get('/cities/:cityName', async ({ params: {cityName}} : Request, res: Response) => {
    try {
        console.log("sono in cities");
        console.log("Params", cityName);
        
        const wea = await weather.getCurrentWeatherByCityName({cityName});
        res.status(200).json({wea})
    } catch (error) {
        res.status(400).json({message: "Error", errorType: error})
    }
})

router.get('/id/:cityId', async ({ params: {cityId}} : Request, res: Response) => {
    try {
        const wea = await weather.getCurrentWeatherByCityId(Number(cityId));
        res.status(200).json({wea})
    } catch (error) {
        res.status(400).json({message: "Error", errorType: error})
    }
})

router.get('/zipcodes/:zipCode', async ({ params: {zipCode}} : Request, res: Response) => {
    try {
        const wea = await weather.getCurrentWeatherByZipcode(Number(zipCode));
        res.status(200).json({wea})
    } catch (error) {
        res.status(400).json({message: "Error", errorType: error})
    }
})

router.get('/', async ({ query: {long, lat}} : Request, res: Response) => {
    try {
        const wea = await weather.getCurrentWeatherByGeoCoordinates(Number(lat), Number(long));
        res.status(200).json({wea})
    } catch (error) {
        res.status(400).json({message: "Error", errorType: error})
    }
})

export { router as current }