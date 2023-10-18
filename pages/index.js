import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from '../components/Weather';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { BsSearch } from 'react-icons/bs';
import moment from 'moment'
import Spinner from '../components/Spinner';

export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);
  const [history, setHistory] = useState({});

  useEffect(() => {
    if (city == '') {
      fetchWeatherByGeolocation();
    }
  }, [loading]);

  const fetchWeatherByGeolocation = async () => {
    if ('geolocation' in navigator) {
      try {
        const position = await new Promise((resolve, reject) => {
          navigator.geolocation.getCurrentPosition(resolve, reject);
        });
        const { latitude, longitude } = position.coords;

        const response = await axios.get(
          `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}`
        );

        if (response.data && response.data.name) {
          setCity(response.data.name);
          setWeather(response.data);
        } else {
          console.log('City not found.');
        }
      } catch (error) {
        console.error('Error fetching city:', error);
      }
    } else {
      console.log('Geolocation is not supported by this browser.');
    }
  };

  const fetchWeather = (e) => {
    e.preventDefault();
    setLoading(true);
    const url1 = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${process.env.NEXT_PUBLIC_OPEN_WEATHER_KEY}`;
    const url2 = `http://api.weatherstack.com/current?access_key=${process.env.NEXT_PUBLIC_STACK_WEATHER_KEY}&query=${city}`;
    const urls = [url1, url2];

    // Fetch weather data from each URL
    const requests = urls.map(url => axios.get(url));

    Promise.all(requests)
      .then((responses) => {
        const openWeatherData = responses[0].data;
        const weatherstackData = responses[1].data;

        // Extract wind direction and local time from weatherstack response
        const windDirection = weatherstackData.current ? weatherstackData.current.wind_dir : '';
        const localTime = weatherstackData.location ? weatherstackData.location.localtime : '';
        // Update the weather state with data from OpenWeatherMap and append wind direction
        setWeather({
          ...openWeatherData,
          windDirection: windDirection,
          localTime: localTime
        });

        fetchSearchHistory();

        addWeatherData();

      })
      .catch(error => {
        alert("Please check the spelling")
        console.error('Error fetching weather data');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const addWeatherData = async () => {
    const response = await fetch('/api/addData', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({city: city,
        timestamp: moment().toDate(),
        data: weather
      }),
    });
    if (response.status === 201 || response.status === 200 ) {
      console.log('added successfully');
    } else {
      console.error('adding failed');
    }
  };
  
const fetchSearchHistory = () => {
    axios.get('/api/showData?city='+city).then((response) => {
      setHistory(response.data);
    })
  };

    // Define a function to determine the background image based on weather description
    const determineBackgroundImage = () => {
      const backgroundMappings = {
        'clear sky': '/images/clear_sky.jpg',
        'few clouds': '/images/Few_clouds.jpg',
        'scattered clouds': '/images/Scattered_Clouds.jpg',
        'broken clouds': '/images/Broken_Clouds.jpg',
        'overcast clouds': '/images/Overcast_Clouds.jpg',
        'light rain': '/images/Light_Rain.jpg',
        'moderate rain': '/images/Moderate_Rain.jpg',
        'heavy rain': '/images/Heavy_Rain.jpg',
        'light snow': '/images/Light_Snow.jpg',
        'moderate snow': '/images/Moderate_Snow.jpg',
        'heavy snow': '/images/Heavy_Snow.jpg',
        'thunderstorm': '/images/Thunderstorm.jpg',
        'mist': '/images/Mist.jpg',
        'fog': '/images/Fog.jpg',
        'haze': '/images/Haze.jpg',
        'dust': '/images/Dust_or_Sand.jpg',
        'sand': '/images/Dust_or_Sand.jpg',
        'Dust or Sand': '/images/Dust_or_Sand.jpg',
        'smoke': '/images/Smoke.jpg',
        'tornado': '/images/Tornado.jpg',
        'tropical storm': '/images/Tropical_Storm.jpg',
        'hurricane': '/images/Hurricane.jpg',
        default: '/images/default.jpg' // Default background image
      };

      const lowercaseDescription = weather?.weather?.[0]?.description?.toLowerCase();
      return backgroundMappings[lowercaseDescription] || backgroundMappings.default;
    };

  return (
    <div>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src={determineBackgroundImage()}
        layout='fill'
        objectPosition='relative'
        className='object-cover'
        alt='/images/default.jpg'
      />
      <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 z-10'>

        <form
          onSubmit={fetchWeather}
          className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-black rounded-2xl'
        >
          <div>
            <input
              onChange={(e) => setCity(e.target.value)}
              className='bg-transparent border-none focus:outline-none text-2xl'
              type='text'
              placeholder='Search city'
            />
          </div>
          <button onClick={fetchWeather}>
            <BsSearch size={20} />
          </button>
        </form>
      </div>
      {loading && <Spinner />}
    {!loading && weather.main && <Weather data={weather} searches={history} />}
     </div>
  );
}
