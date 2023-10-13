import Head from 'next/head';
import styles from '../styles/Home.module.css';
import { useState } from 'react';
import { BsSearch } from 'react-icons/bs';

export default function Home() {
  return (
    <div>
      <Head>
        <title>Weather App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>

        <div className='relative flex justify-between items-center max-w-[500px] w-full m-auto pt-4 px-4 z-10'>
          <form
            className='flex justify-between items-center w-full m-auto p-3 bg-transparent border border-black rounded-2xl'
          >
            <div>
              <input
                className='bg-transparent border-none focus:outline-none text-2xl'
                type='text'
                placeholder='Search city'
              />
            </div>
            <button>
              <BsSearch size={20} />
            </button>
          </form>
        </div>


        <h1 className={styles.title}>
          Weather App
        </h1>
        <div className='flex max-h-[500px]'>
          <div className='relative flex flex-col justify-between min-w-[400px] h-[90vh] m-auto p-4 z-10'>
            <div className='relative justify-between pt-12'>
              <div className='flex flex-col items-left'>
                <h2>Temp</h2>
              </div>
              <p className='text-8xl'>90&#176;</p>
              
              <div className='flex flex-col items-left'>
                <h2>Humidity</h2>
              </div>
              <p className='text-8xl'>20%</p>
              <div className='flex flex-col items-left'>
                <h2>Winds</h2>
              </div>
              <p className='text-8xl'>100MPH</p>
            </div>
          </div>
          <div className='relative flex flex-col justify-between  min-w-[500px] h-[90vh] m-auto p-4 z-10'>
            <div className='relative justify-between text-right pt-12'>
            <div className='flex flex-col'>
              <h2>Longitude</h2>
            </div>
            <p className='text-5xl'>104.25</p>
            <div className='flex flex-col'>
              <h2>Latitude</h2>
            </div>
            <p className='text-5xl'>178.65</p>
            <div className='flex flex-col'>
              <h2>Description</h2>
            </div>
            <p className='text-5xl'>Partially Cloudy</p>
            <div className='flex flex-col'>
              <h2>Cloud</h2>
            </div>
            <p className='text-5xl'>20</p>
            <div className='flex flex-col'>
              <h2>Wind direction</h2>
            </div>
            <p className='text-5xl'>N</p>
            

            </div>
          </div>
        </div>

        <div className='bg-black/50 relative p-8 rounded-md h-auto'>
          <p className='text-2xl text-center pb-6'>Recent searches in same city</p>
          <div className='flex justify-between text-center h-auto'>
            <div class="w-1/2 border-l-2 border-gray-400 h-auto"></div>
            <div className='min-w-[300px]'>
                <span className='text-xl'>Time </span><span className='font-bold text-2xl'>2023-10-13 09:23</span><br/>
                <span className='text-xl'>Temp </span><span className='font-bold text-2xl'>91&#176;</span><br/>
                <span className='text-xl'>Humidity </span><span className='font-bold text-2xl'>18%</span><br/>
                <span className='text-xl'>Winds </span><span className='font-bold text-2xl'>90MPH-NE</span><br/>
            </div>
            <div class="w-1/2 border-l-2 border-gray-400 h-auto"></div>
            <div className='min-w-[300px]'>
                <span className='text-xl'>Time </span><span className='font-bold text-2xl'>2023-10-13 09:20</span><br/>
                <span className='text-xl'>Temp </span><span className='font-bold text-2xl'>92&#176;</span><br/>
                <span className='text-xl'>Humidity </span><span className='font-bold text-2xl'>15%</span><br/>
                <span className='text-xl'>Winds </span><span className='font-bold text-2xl'>80MPH-NE</span><br/>
            </div>
            <div class="w-1/2 border-l-2 border-gray-400 h-auto"></div>
            <div className='min-w-[300px]'>
                <span className='text-xl'>Time </span><span className='font-bold text-2xl'>2023-10-13 09:15</span><br/>
                <span className='text-xl'>Temp </span><span className='font-bold text-2xl'>93&#176;</span><br/>
                <span className='text-xl'>Humidity </span><span className='font-bold text-2xl'>16%</span><br/>
                <span className='text-xl'>Winds </span><span className='font-bold text-2xl'>96MPH-NE</span><br/>
            </div>
            <div class="w-1/2 border-l-2 border-gray-400 h-auto"></div>
          </div>
        </div>

      </main>


      <style jsx>{`
        main {
          padding: 1rem 0;
          flex: 1;
          display: flex;
          flex-direction: column;
          justify-content: center;
          align-items: center;
        }
        code {
          background: #fafafa;
          border-radius: 5px;
          padding: 0.75rem;
          font-size: 1.1rem;
          font-family:
            Menlo,
            Monaco,
            Lucida Console,
            Liberation Mono,
            DejaVu Sans Mono,
            Bitstream Vera Sans Mono,
            Courier New,
            monospace;
        }    
      `}</style> 

      <style jsx global>{`
        html,
        body {
          background-image: url('/images/weather_bg.jpg');
          background-size: cover;
          background-position: center;
          padding: 0;
          margin: 0;
          font-family:
            -apple-system,
            BlinkMacSystemFont,
            Segoe UI,
            Roboto,
            Oxygen,
            Ubuntu,
            Cantarell,
            Fira Sans,
            Droid Sans,
            Helvetica Neue,
            sans-serif;
        }
        * {
          box-sizing: border-box;
        }
      `}</style>
    </div>
  );
}
