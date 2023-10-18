import Head from 'next/head';
import { useEffect, useState } from 'react';
import axios from 'axios';
import Weather from '../components/Weather';
import Image from 'next/image';
import styles from '../styles/Home.module.css';
import { BsSearch } from 'react-icons/bs';
import moment from 'moment'


export default function Home() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState({});
  const [loading, setLoading] = useState(false);

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

        // Extract wind direction from weatherstack response
        const windDirection = weatherstackData.current ? weatherstackData.current.wind_dir : '';

        // Update the weather state with data from OpenWeatherMap and append wind direction
        setWeather({
          ...openWeatherData,
          windDirection: windDirection
        });
        addWeatherData();

      })
      .catch(error => {
        console.error('Error fetching weather data:', error);
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
  

  return (
    <div>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Image
        src='/images/weather_bg.jpg'
        layout='fill'
        objectPosition='absolute'
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
      {weather.main && <Weather data={weather} />}
    </div>
  );
}
