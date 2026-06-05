import Image from "next/image";

import LightNextLogo from "@/../public/icon/light-next.js.svg";
import LightExpressLogo from "@/../public/icon/light-express.js.svg";
import JavascriptLogo from "@/../public/icon/js.svg";
import TypescriptLogo from "@/../public/icon/typescript.svg";
import ReactLogo from "@/../public/icon/react.js.svg";
import NodeLogo from "@/../public/icon/node.js.svg";
import PostgresSql from "@/../public/icon/postgresql.svg";
import Mongodb from "@/../public/icon/mongo.svg";

import Mongoose from "@/../public/icon/mongoose.svg";
import Git from "@/../public/icon/git.svg";
import Github from "@/../public/icon/github.svg";
import Drizzle from "@/../public/icon/drizzle.svg";
import Zod from "@/../public/icon/zod.svg";

export const About = () => {
  return (
    <section className="w-full" id="about">
      <div className="border-y border-dashed border-neutral-800 px-10 py-10">
        <div className="grid gap-10 lg:grid-cols-2">
          {/* Left Side */}
          <div className="space-y-6">
            <h1 className="mt-2 text-4xl font-bold tracking-tigh">About</h1>

            <p className="max-w-xl leading-6 text-neutral-400">
              I am Chandrapal Singh Negi, a Full Stack Developer who enjoys
              building modern web applications and learning new technologies.
            </p>

            <p className="max-w-xl leading-6 text-neutral-400">
              I have worked on both frontend and backend development.
            </p>

            <p className="max-w-xl leading-6 text-neutral-400">
              I primarily work with Next.js, React.js, TypeScript, JavaScript,
              MySQL, PostgreSQL, Tailwind CSS, and Drizzle ORM. I also use tools
              such as Git, GitHub, Nodemailer, and Razorpay to build reliable
              and maintainable applications.
            </p>
          </div>

          <div className="flex flex-col divide-y divide-dashed divide-neutral-800 border border-dashed border-neutral-800 rounded">
            <div className="p-6">
              <h1 className="mb-4 font-medium text-neutral-400">Frontend</h1>

              <div className="flex flex-wrap gap-4 text-sm">
                <Image src={LightNextLogo} width={28} height={28}  alt="next.js"></Image>
                <Image src={ReactLogo} width={28} height={28}  alt="react.js"></Image>
                <Image src={TypescriptLogo} width={28} height={28}  alt="typescript"></Image>
                <Image src={JavascriptLogo}  width={28} height={28} alt="javascript"></Image>
              </div>
            </div>

            <div className="p-6">
              <h2 className="mb-4 font-medium  text-neutral-400">Backend</h2>

              <div className="flex flex-wrap gap-4 text-sm">
                <Image src={LightExpressLogo} width={28} height={28}  alt="express.js"></Image>
                <Image src={NodeLogo} width={28} height={28}  alt="node.js"></Image>
                <Image src={PostgresSql} width={28} height={28}  alt="postgres"></Image>
                <Image src={Mongodb} width={28} height={28}  alt="Mongodb"></Image>
                {/* <Image src={MysqlLogo} width={45} height={45}  alt="mysql"></Image> */}

              </div>
            </div>

            <div className="p-6">
              <h3 className="mb-4 font-medium  text-neutral-400">Tools</h3>

              <div className="flex flex-wrap gap-4 text-sm">
                <Image src={Git} width={28} height={28}  alt="git"></Image>
                <Image src={Github} width={30} height={30}  alt="github"></Image>
                <Image src={Mongoose} width={28} height={28}  alt="mongoose"></Image>
                <Image src={Drizzle} width={28} height={28}  alt="drizzle"></Image>
                <Image src={Zod} width={28} height={28}  alt="zod"></Image>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
