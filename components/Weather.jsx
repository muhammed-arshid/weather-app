import Image from 'next/image';
import React from 'react';
import styles from '../styles/Home.module.css';

const Weather = ({ data }) => {
    return (
        <>
            <div className='relative flex flex-col justify-between max-w-[500px] w-full h-[90vh] m-auto p-4 z-10'>
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
                    <p className='text-9xl'>{data.main.temp.toFixed(0)}&#176;</p>
                </div>
                {/* Bottom */}

                <div className='bg-black/50 relative p-8 rounded-md'>
                    <p className='text-2xl text-center pb-6'>Weather in {data.name}</p>
                    <div className='flex justify-between text-center'>
                        <div>
                            <p className='font-bold text-2xl'>{data.main.feels_like.toFixed(1)}&#176;</p>
                            <p className='text-xl'>Feels Like</p>
                        </div>
                        <div>
                            <p className='font-bold text-2xl'>{data.main.humidity}%</p>
                            <p className='text-xl'>Humidity</p>
                        </div>
                        <div>
                            <p className='font-bold text-2xl'>{data.wind.speed.toFixed(0)} MPH {data.windDirection!="" && data.windDirection }</p>
                            <p className='text-xl'>Winds</p>
                        </div>
                    </div>
                </div>
            </div>
            <div className='bg-black/50 relative p-8 rounded-md h-auto w-auto'>
                <p className='text-2xl text-center pb-6'>Recent searches in same city</p>
                <div className='flex justify-between text-center h-auto'>
                    <div class="w-1/2 border-l-2 border-gray-400 h-auto"></div>
                    <div className='min-w-[300px]'>
                        <span className='text-xl'>Time </span><span className='font-bold text-2xl'>2023-10-13 09:23</span><br />
                        <span className='text-xl'>Temp </span><span className='font-bold text-2xl'>91&#176;</span><br />
                        <span className='text-xl'>Humidity </span><span className='font-bold text-2xl'>18%</span><br />
                        <span className='text-xl'>Winds </span><span className='font-bold text-2xl'>90MPH-NE</span><br />
                    </div>
                    <div class="w-1/2 border-l-2 border-gray-400 h-auto"></div>
                    <div className='min-w-[300px]'>
                        <span className='text-xl'>Time </span><span className='font-bold text-2xl'>2023-10-13 09:20</span><br />
                        <span className='text-xl'>Temp </span><span className='font-bold text-2xl'>92&#176;</span><br />
                        <span className='text-xl'>Humidity </span><span className='font-bold text-2xl'>15%</span><br />
                        <span className='text-xl'>Winds </span><span className='font-bold text-2xl'>80MPH-NE</span><br />
                    </div>
                    <div class="w-1/2 border-l-2 border-gray-400 h-auto"></div>
                    <div className='min-w-[300px]'>
                        <span className='text-xl'>Time </span><span className='font-bold text-2xl'>2023-10-13 09:15</span><br />
                        <span className='text-xl'>Temp </span><span className='font-bold text-2xl'>93&#176;</span><br />
                        <span className='text-xl'>Humidity </span><span className='font-bold text-2xl'>16%</span><br />
                        <span className='text-xl'>Winds </span><span className='font-bold text-2xl'>96MPH-NE</span><br />
                    </div>
                    <div class="w-1/2 border-l-2 border-gray-400 h-auto"></div>
                </div>
            </div>
        </>
    );
};

export default Weather;
