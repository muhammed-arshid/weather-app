import mongoose from 'mongoose';

const weatherSchema = new mongoose.Schema({
    city: String,
    timestamp: {
        type: Date,
        unique: true
    },
    data: {
        type: Object,
        required: true,
    }
});

const Weather = mongoose.models.Weather || mongoose.model('Weather', weatherSchema);

export default Weather;