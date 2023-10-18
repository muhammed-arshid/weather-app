import Weather from "../../models/weatherModel";
import db from "../../utils/connectDB";

export default async function fetchSearchHistory(req, res) {
    try {
        await db.connect();

        const { city } = req.query;

        const recent_searches = await Weather.find({
            city: { $regex: new RegExp(city, 'i') }
            }).collation({ locale: 'en', strength: 2 })
            .sort({ timestamp: -1 })
            .limit(3)
            .exec();

        // Send the recent searches as a JSON response
        res.send(recent_searches);
    } catch (error) {
        // Handle any errors that occur during the database query or connection
        res.status(500).json({ error: 'Internal server error' });
    }
}
