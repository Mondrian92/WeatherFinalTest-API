import express, { Request, Response } from "express";
import { weather } from "../main";
import { param, query, header } from "express-validator";
import { validationHandler } from "../validation";
import { CountryCode } from "openweathermap-ts/dist/types/CountryCode"
import { Unit } from "openweathermap-ts/dist/types/Unit"
const router = express.Router();

router.get(
  "/cities/:cityName",
  param("cityName").isString(),
  header("unit").isString(),
  validationHandler,
  async ({ params: { cityName }, headers: {unit} }: Request, res: Response) => {
    try {
        weather.setUnits(<Unit>unit);
        res.status(200).json(
            await weather.getCurrentWeatherByCityName({ cityName })
        );
    } catch (error) {
      res.status(400).json({ message: "Error", errorType: error });
    }
  }
);

router.get(
  "/id/:cityId",
  param("cityId").isNumeric(),
  header("unit").isString(),
  validationHandler,
  async ({ params: { cityId }, headers: {unit} }: Request, res: Response) => {
    try {
        weather.setUnits(<Unit>unit);
        res.status(200).json(
            await weather.getCurrentWeatherByCityId(Number(cityId))
        );
    } catch (error) {
      res.status(400).json({ message: "Error", errorType: error });
    }
  }
);

router.get(
  "/coutries/:countryCode/zipcodes/:zipCode",
  param("zipCode").isNumeric(),
  param("countryCode").isString().isLength( { min:2, max:2 } ),
  header("unit").isString(),
  validationHandler,
  async ({ params: { zipCode, countryCode }, headers: {unit} }: Request, res: Response) => {
    try {
        weather.setUnits(<Unit>unit);
        res.status(200).json(
            await weather.getCurrentWeatherByZipcode(Number(zipCode), <CountryCode>countryCode)
        );
    } catch (error) {
        res.status(400).json({ message: "Error", errorType: error });
    }
  }
);

router.get(
  "/coordinates",
  query("long").isNumeric(),
  query("lat").isNumeric(),
  header("unit").isString(),
  validationHandler,
  async ({ query: { long, lat }, headers: {unit} }: Request, res: Response) => {
    try {
        weather.setUnits(<Unit>unit);
        res.status(200).json(await weather.getCurrentWeatherByGeoCoordinates(
            Number(lat),
            Number(long)
        ));
    } catch (error) {
        res.status(400).json({ message: "Error", errorType: error });
    }
  }
);

export { router as current };
