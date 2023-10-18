import Image from 'next/image';
import React from 'react';
import moment from 'moment'

const Weather = ({ data, searches }) => {
    return ( 
        <>
            <div className='relative flex flex-col justify-between max-w-[500px] w-full h[400px] m-auto p-4 z-10'>
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

                <div className='bg-black/60 text-gray-400 relative p-8 rounded-md mt-12'>
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

            {searches.length > 0 && (
                <div className='bg-black/50 relative p-8 rounded-md h-auto w-auto mt-12 ml-60 mr-60 text-center'>
                <p className='text-2xl pb-6 w-auto'>Recent searches in same city</p>
                <div className='flex justify-between text-center h-auto w-auto'>
                    <div className="border-l-2 border-gray-400 h-auto m-1"></div>
                    {searches.map((item, index) => (
                        <>
                        <div className='min-w-[200px] max-w-[300px]'>
                            <span className='text-l'>Time </span><span className='font-bold text-xl'>{moment(item.timestamp).format("MMM D, YYYY, h:mm A")}</span><br />
                            <span className='text-l'>Temp </span><span className='font-bold text-xl'>{item.data.main.temp.toFixed(0)}&#176;</span><br />
                            <span className='text-l'>Humidity </span><span className='font-bold text-xl'>{item.data.main.humidity}%</span><br />
                            <span className='text-l'>Winds </span><span className='font-bold text-xl'>{item.data.wind.speed.toFixed(0)} MPH -{searches[0].data.windDirection}</span><br />
                        </div>
                        <div className="border-l-2 border-gray-400 h-auto m-1"></div>
                        </>
                        ))}
                </div>
            </div>
            ) }
            
        </>
    );
};

export default Weather;
