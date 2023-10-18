import moment from "moment";
import Weather from "../../models/weatherModel";
import db from "../../utils/connectDB";

export default async function addWeatherData(req, res) {
    try {
        await db.connect();

        const timestamp = moment().toDate()
        const lastEntry = await Weather.findOne({
            timestamp: { $gte: moment(timestamp).subtract(1, 'minute').toDate() },
          });

        if (lastEntry) {
            res.json("consecutive entries require 1 minute gap"); 
        }
        else {
            const new_weather = new Weather(req.body)
            await new_weather.save()
            res.json("added")
        }

    }
    catch(error) {
        res.json(error)
    }


}