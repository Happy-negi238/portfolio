'use client';
import { cn } from '@/lib/utils';
import { HTMLMotionProps, motion } from 'motion/react';
import Link from 'next/link';
// import { ThemeMode } from '../thememode/thememode';

export function HeaderLogo({
  ...props
}: React.AnchorHTMLAttributes<HTMLAnchorElement>) {
  return <Link aria-label="logo" href="/" {...props} />;
}

type HeaderProps = HTMLMotionProps<'header'> & {
  toggleOnScroll?: boolean;
  links?: {
    label: string;
    href: string;
  }[];
};

export function Header({
  toggleOnScroll = true,
  className,
  links,
  ...props
}: HeaderProps) {
  return (
    <header
      className={cn(
        'flex items-center w-full justify-between px-10 py-5 bg-black/20 backdrop-blur-md sticky top-0 z-20',
        className
      )}
    >
      <nav className="flex gap-10 text-sm justify-center items-center text-center">
        {links &&
          links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
      </nav>
      {/* <ThemeMode /> */}
    </header>
  );
}
