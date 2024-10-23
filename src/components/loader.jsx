import React from 'react';

const Loader = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="flex flex-row items-center gap-2 w-32 h-32 mr-5">
      <div className="w-32 h-20 rounded-full bg-blue-700 animate-bounce " />
      <div className="w-32 h-20 rounded-full bg-blue-700 animate-bounce [animation-delay:-.3s]" />
      <div className="w-32 h-20 rounded-full bg-blue-700 animate-bounce [animation-delay:-.5s]" />
    </div>
  </div>
);

export default Loader;
