import Image from 'next/image';
import React from 'react';
import moment from 'moment'

const RecentSearches = ({ searches }) => {
    return (
                <div className='bg-black/50 relative p-8 rounded-md h-auto w-auto mt-12 ml-60 mr-60 text-center'>
                <p className='text-2xl pb-6 w-auto'>Recent searches in same city</p>
                <div className='flex justify-between text-center h-auto w-auto'>
                    <div className="border-l-2 border-gray-400 h-auto m-1"></div>
                    {searches.map((item, index) => (
                        <>
                        <div className='min-w-[200px] max-w-[300px]'>
                            <span className='text-l'>Time </span><span className='font-bold text-l'>{moment(item.timestamp).format("h:mm A, D MMM YYYY")}</span><br />
                            <span className='text-l'>Temp </span><span className='font-bold text-xl'>{item.data.main.temp.toFixed(0)}&#176;</span><br />
                            <span className='text-l'>Humidity </span><span className='font-bold text-xl'>{item.data.main.humidity}%</span><br />
                            <span className='text-l'>Winds </span><span className='font-bold text-xl'>{item.data.wind.speed.toFixed(0)} MPH -{searches[0].data.windDirection}</span><br />
                        </div>
                        <div className="border-l-2 border-gray-400 h-auto m-1"></div>
                        </>
                        ))}
                </div>
            </div>
            
    )
};

export default RecentSearches;
