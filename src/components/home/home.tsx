import { Landing } from '@/components/landing/landing';
import { Header } from '@/components/systaliko-ui/header';
import { Marqueeskill } from '@/components/ui/marqueeskill';
import { Projects } from '@/components/projects/projects';
import { Contact } from '@/components/contact/contact';
import { Count } from '@/components/count/count';
import { About } from '@/components/about/about';

export const HomePage = () => {
  return (
    <>
      <Header
        links={[
          { label: 'Home', href: '/' },
          { label: 'About', href: '#about' },
          { label: 'Contact', href: '#contact' },
        ]}
      />

      <Landing />
      <Marqueeskill />
      <Projects />
      <About />
      <Contact />
      <Count />
    </>
  );
};
