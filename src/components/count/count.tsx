'use client';
import { useEffect, useState } from 'react';
import FingerprintJS from '@fingerprintjs/fingerprintjs';

export const Count = () => {

  const [count, setCount] = useState(0);

  useEffect(() => {
    const trackVisitor = async () => {
      const fp = await FingerprintJS.load();
      const result = await fp.get();


      try {
        const response = await fetch('/api/visitors', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            visitorId: result.visitorId,
          }),
        });

        const data = await response.json();
        setCount(data.count);
        
      } catch (error) {
        console.log("Failed to fetch count");
      }

    };

    trackVisitor();
  }, []);

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

          <span className="italic ">
            You are the <span className="text-white">{count}</span> visitor
          </span>
        </div>
      </div>
    </div>
  );
};
