'use client';
import { cn } from '@/lib/utils';
import { useToggleOnscroll } from '@/lib/systaliko-ui/use-toggle-onscroll';
import { HTMLMotionProps, motion } from 'motion/react';
import Link from 'next/link';
import { AdminDialog } from '../admindialog/admindialog';

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
  const { isHidden, setIsHidden } = toggleOnScroll
    ? useToggleOnscroll()
    : { isHidden: false, setIsHidden: () => {} };
  const showHeader = () => setIsHidden(false);

  return (
    <motion.header
      className={cn(
        'flex items-center w-full justify-between px-10',
        className
      )}
      animate={isHidden ? { y: '-120%' } : { y: '0%' }}
      transition={{ duration: 0.4, ease: 'easeOut' }}
      whileHover={{ y: '0%' }}
      onFocusCapture={showHeader}
      {...props}
    >
      <nav
        className="flex gap-10 text-sm justify-center items-center text-center 
      py-3 px-8 bg-neutral-400/20  rounded-sm
          border border-neutral-600 border-dashed shadow-[inset_0_0_4px_0_rgba(255,255,255,0.1)]
          backdrop-blur-lg"
      >
        {links &&
          links.map((link) => (
            <Link key={link.href} href={link.href}>
              {link.label}
            </Link>
          ))}
      </nav>

      <AdminDialog
        className="px-6 py-3 rounded-sm
          border border-neutral-600 border-dashed shadow-[inset_0_0_4px_0_rgba(255,255,255,0.1)]
          backdrop-blur-lg bg-neutral-400/20 text-sm"
      />
    </motion.header>
  );
}
