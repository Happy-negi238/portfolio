import React from 'react';

export const Count = () => {
  return (
    <div className="w-full">
      <div className="pt-10 text-center">
        <div
          className="inline-flex items-center gap-2 rounded-full border
             border-neutral-800 bg-neutral-9500 px-4 py-2 text-sm text-neutral-400 justify-center"
        >
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-green-500 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-green-500" />
          </span>

          <span>Total Visits:</span>
          <span className="font-medium text-white">10</span>
        </div>
      </div>
    </div>
  );
};
