import Image from 'next/image';
import React from 'react';
import moment from 'moment'
import RecentSearches from './RecentSearches';

const Weather = ({ data, searches }) => {
    return ( 
        <>
            <div className='relative flex flex-col justify-between max-w-[600px] w-full h[400px] m-auto p-4 z-10'>
                {/* Top */}
                <div className='relative flex justify-between pt-12'>
                    <div className='flex flex-col items-center'>
                        <Image
                            src={`http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`}
                            alt='/'
                            width='100'
                            height='100'
                        />
                        <p className='font-bold text-2xl'>{data.weather[0].main}</p>
                    </div>
                    <p className='text-9xl'>{data.main.temp.toFixed(0)}&#176;C</p>
                </div>
                {/* Bottom */}

                <div className='bg-black/60 text-gray-400 relative p-8 w-full rounded-md mt-12'>
                    <p className='text-2xl text-center pb-6'>Weather in {data.name}</p>
                    <div className='flex justify-between text-center'>
                        <div>
                            <p className='font-bold text-xl'>{data.main.feels_like.toFixed(1)}&#176;C</p>
                            <p className='text-xl'>Feels Like</p>
                        </div>
                        <div>
                            <p className='font-bold text-xl'>{data.main.humidity} %</p>
                            <p className='text-xl'>Humidity</p>
                        </div>
                        <div>
                            <p className='font-bold text-xl'>{data.wind.speed.toFixed(0)} MPH {data.windDirection!="" && data.windDirection }</p>
                            <p className='text-xl'>Winds</p>
                        </div>
                        {data.localTime!=undefined && (<div>
                            <p className='font-bold text-m'>{moment(data.localTime, 'YYYY-MM-DD HH:mm').format('h:mm A, D MMM YYYY')}</p>
                            <p className='text-xl'>Local Time</p>
                        </div>)}
                    </div>
                </div>
            </div>

            {searches.length > 0 && (
                <RecentSearches searches={searches}/>
            ) }
            
        </>
    );
};

export default Weather;
