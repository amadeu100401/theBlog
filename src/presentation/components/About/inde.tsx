import { AboutGuidingValues } from './aboutGuidingValues';
import { AboutPurposeBlock } from './aboutPurposeBlock';
import { AboutStatus } from './aboutStatus';
import { AboutTitle } from './aboutTitle';

export function AboutContent() {
  return (
    <main className='mx-auto w-full max-w-7xl px-4 pb-24 pt-10 sm:px-6 lg:px-8'>
      <AboutTitle />
      <AboutStatus />
      <AboutPurposeBlock />
      <AboutGuidingValues />
    </main>
  );
}
