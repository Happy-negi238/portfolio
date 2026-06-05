import { Marquee, MarqueeContent, MarqueeItem } from '@/components/ui/marquee';
import Image from 'next/image';

import ReactLogo from '@/../public/icon/react.js.svg';
import ExpressLogo from '@/../public/icon/express.js.svg';
import jsLogo from '@/../public/icon/js.svg';
import Nodelogo from '@/../public/icon/node.js.svg';
import tsLogo from '@/../public/icon/typescript.svg';
import nextLogo from '@/../public/icon/next.js.svg';

import postgres from "@/../public/icon/postgresql.svg"
import drizzle from "@/../public/icon/drizzle.svg";
import zod from "@/../public/icon/zod.svg";

export const Marqueeskill = () => {
  const skillClass = `flex items-center gap-2 bg-neutral-400/20  rounded-sm
          border border-neutral-600 border-dashed shadow-[inset_0_0_4px_0_rgba(255,255,255,0.1)]
          backdrop-blur-sm text-sm pl-1 pr-2 py-1`;

  return (
    <div className="w-full py-10">
      <Marquee>
        <MarqueeContent className="gap-1">
          <MarqueeItem className={skillClass}>
            <Image src={ReactLogo} alt="React" width={30} height={30} />{' '}
            <span>React</span>
          </MarqueeItem>

          <MarqueeItem className={skillClass}>
            <Image src={Nodelogo} alt="Node.js" width={30} height={30} />{' '}
            <span>Node.js</span>
          </MarqueeItem>

          <MarqueeItem className={skillClass}>
            <Image src={ExpressLogo} alt="Express" width={30} height={30} />{' '}
            <span>Express</span>
          </MarqueeItem>

          <MarqueeItem className={skillClass}>
            <Image src={tsLogo} alt="Typescript" width={30} height={30} />{' '}
            <span>Typescript</span>
          </MarqueeItem>

          <MarqueeItem className={skillClass}>
            <Image src={nextLogo} alt="Next.js" width={30} height={30} />{' '}
            <span>Next.js</span>
          </MarqueeItem>

          <MarqueeItem className={skillClass}>
            <Image src={jsLogo} alt="JavaScript" width={30} height={36} />{' '}
            <span>JavaScript</span>
          </MarqueeItem>

          <MarqueeItem className={skillClass}>
            <Image src={drizzle} alt="drizzle" width={30} height={36} />{' '}
            <span>Drizzle</span>
          </MarqueeItem>

          <MarqueeItem className={skillClass}>
            <Image src={postgres} alt="postgres" width={30} height={36} />{' '}
            <span>Postgres</span>
          </MarqueeItem>

          <MarqueeItem className={skillClass}>
            <Image src={zod} alt="zod" width={30} height={36} />{' '}
            <span>Zod</span>
          </MarqueeItem>

        </MarqueeContent>
      </Marquee>
    </div>
  );
};
