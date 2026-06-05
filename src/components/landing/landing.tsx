import Image from 'next/image';
import ProfileImage from '@/../public/profileImage.jpeg';
import { Mail } from 'lucide-react';
import Link from 'next/link';
// import Resume from '@/../public/pdf/chandrapal_resume.pdf';

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

            <p className="mt-7 max-w-xl text-lg leading-relaxing text-neutral-400">
              I build modern web applications using React, Next.js, TypeScript,
              Node.js, Express, MongoDB, PostgreSQL. I enjoy creating scalable
              products with clean UI, real-time features, and efficient backend
              architectures.
            </p>

            <div className=" flex gap-2 mt-7 justify-center lg:justify-start text-sm text-neutral-200">
              <Link
                href="https://x.com/HappyNegi1221"
                target="_blank"
                aria-label="twitter account"
                className="bg-neutral-800 hover:bg-neutral-700/70 
                transition duration-300 px-3 py-2 rounded cursor-pointer 
                shadow-[1px_1px_1px_0_rgba(255,255,255,0.6)] hover:shadow-[1px_1px_1px_0_rgba(255,255,255,0.6)]
                border border-neutral-700"
              >
                <i className="ri-twitter-x-fill "></i>
              </Link>

              <Link
                href="https://www.linkedin.com/in/chandrapal-singh-negi-32a842334/"
                target="_blank"
                aria-label="linkedin account"
                className="bg-neutral-800 hover:bg-neutral-700/70
                transition duration-300 px-3 py-2 rounded cursor-pointer
                shadow-[1px_1px_1px_0_rgba(255,255,255,0.6)] hover:shadow-[1px_1px_1px_0_rgba(255,255,255,0.6)]
                border border-neutral-700"
              >
                <i className="ri-linkedin-fill"></i>
              </Link>

              <Link
                href="mailto:happynegi238@gmail.com"
                target="_blank"
                aria-label="gmail account"
                className="bg-neutral-800 hover:bg-neutral-700/70  
              transition duration-300 px-3 py-2 rounded cursor-pointer
              shadow-[1px_1px_1px_0_rgba(255,255,255,0.6)] hover:shadow-[1px_1px_1px_0_rgba(255,255,255,0.6)]
              border border-neutral-700"
              >
                <Mail color="white" strokeWidth={1} size={20} />
              </Link>
            </div>

            <div className="mt-7 flex flex-wrap justify-center gap-4 lg:justify-start">
              <Link href="/pdf/chandrapal_resume.pdf" target="_blank">
                <button
                  className="rounded-lg flex gap-1 bg-white/90 px-6 py-3 font-medium text-black 
                tracking-tight transition hover:opacity-90 cursor-pointer"
                >
                  View Resume
                </button>
              </Link>
            </div>
          </div>

          <div className="relative">
            <div className="absolute inset-0 rounded-3xl bg-transparent" />
            <Image
              src={ProfileImage}
              alt="Happy Negi"
              loading="eager"
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
                p-1.5
              "
            />
          </div>
        </div>
      </div>
    </section>
  );
};
