import express, { Request, Response } from "express";
import { current } from './current'
import { forecast } from './forecast'
import { weather } from "../main";
import { param } from "express-validator";
import { validationHandler } from "../validation";
import { Unit } from "openweathermap-ts/dist/types/Unit"
import{ isLogged} from '../isLogged'

const router = express();

router.use("/current", current);
router.use("/forecast", forecast);


router.put("/units/:unit",
isLogged,
    param("unit").isString(),
    validationHandler,
    async ({params: {unit}}: Request, res: Response) => {
        try {
            res.status(200).json( weather.setUnits(<Unit>unit))
        } catch (error) {
            res.status(400).json({ message: "Error", errorType: error });
        }
    });


export {router as weathers}