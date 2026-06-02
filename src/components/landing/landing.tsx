import Image from 'next/image';
import ProfileImage from '@/../public/profileImage.jpeg';

export const Landing = () => {
  return (
    <section className="w-full">
      <div className="">
        <div
          className="flex flex-col-reverse items-center gap-12 border-y
         border-neutral-800 border-dashed py-16 lg:flex-row lg:justify-between px-10"
        >
          <div className="max-w-2xl text-center lg:text-left">
            <p className="mb-4 text-xs uppercase tracking-[0.2em] text-neutral-400">
              Welcome to my portfolio
            </p>

            <h1 className="text-5xl font-bold leading-tight md:text-5xl tracking-tight">
              Hi, I'm{' '}
              <span className="text-neutral-100">Full Stack Developer</span>
            </h1>

            <p className="mt-7 max-w-xl text-lg leading-relaxed text-neutral-500">
              I build modern web applications using React, Next.js, TypeScript,
              Node.js, Express, MongoDB, PostgreSQL. I enjoy creating scalable
              products with clean UI, real-time features, and efficient backend
              architectures.
            </p>

            <div className=" flex gap-2 mt-7 justify-center lg:justify-start text-sm text-neutral-200">
              <i className="ri-twitter-x-fill bg-neutral-800 px-3 py-2 rounded cursor-pointer"></i>
              <i className="ri-linkedin-fill bg-neutral-800 px-3 py-2 rounded cursor-pointer"></i>
              <i className="ri-google-fill bg-neutral-800 px-3 py-2 rounded cursor-pointer"></i>
              <i className="ri-hashnode-fill bg-neutral-800 px-3 py-2 rounded cursor-pointer">
                H
              </i>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-4 lg:justify-start">
              <button
                className="rounded-lg border border-white bg-white px-6 py-3 
              font-medium text-black transition hover:opacity-90 cursor-pointer"
              >
                View Projects
              </button>

              <button
                className="rounded-lg border border-neutral-700 px-6 py-3 
              font-medium transition hover:border-neutral-500 cursor-pointer"
              >
                Download Resume
              </button>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-white/5 blur-3xl" />

            <Image
              src={ProfileImage}
              alt="Happy Negi"
              width={320}
              height={320}
              className="
                relative
                rounded-3xl
                border
                border-neutral-800
                object-cover
                transition-all
                duration-500
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};
