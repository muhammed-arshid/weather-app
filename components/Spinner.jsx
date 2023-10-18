import Image from 'next/image';
import React from 'react';
import spinner from '../public/spinner.gif';

const Spinner = () => {
  return (
    <div className='w-[200px] h-[200px] mx-auto my-auto absolute inset-0'>
      <img className='w-full h-full' src='/spinner.gif' alt='loading..' />
    </div>
  );
};

export default Spinner;
