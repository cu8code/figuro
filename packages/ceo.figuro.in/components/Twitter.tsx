"use client";
import { useState } from 'react';
import { Message } from '@/components/Message';
import { AnimatedProfileRing } from '@/components/AnimatedProfileRing';
import { Seperator } from '@/components/Seperator';
import { VideoBanner } from '@/components/VideoBanner';
import { GoldenBadge, VerifiedBadge } from '@/components/Badges';

const data = {
  about: {
    text: `
Hello! I'm a **${new Date().getFullYear() - 2004}-year-old** software developer from Kolkata.

With over **${new Date().getFullYear() - 2022}-year** of experience in the industry, I have a passion for creating innovative solutions. I enjoy **anime**, though the recent privacy restrictions have limited my viewing time.

I thrive on learning and sharing information, and I believe that no one is inherently smarter than anyone else; we are all just navigating our own paths of knowledge. I strive to remain humble and cherish the time spent with my family.

My aspiration is to dedicate myself to a meaningful cause, which I am still in the process of discovering!
`,
    author: 'ceo',
    timestamp: '000-00-00',
  },
  projects: [
    {
      text: `**[fakeLiveStreamApp](https://fakelivestreamapp.figuro.in)**
FakeLiveStream is a fun prank app that simulates a live stream. Customize the title and viewer count to fool friends and family. Download now and start pulling hilarious pranks.`,
      author: 'ceo',
      timestamp: '2024-08-04',
    },
    {
      text: `**[removebackground.figuro.in](https://removebackground.figuro.in)**
This project was inspired by a video from @theo, where he shared that he was charging $6 for 100 images. At the time, I was skeptical, thinking I could do better. However, I soon realized the value of creating a simple, efficient solution for removing backgrounds, and this project became my response to that challenge.

*Using a custom fork of Three.js to do some browser magic!*
*100% client-side*
*With Mask Editor*`,
      author: 'ceo',
      timestamp: '2024-06-02',
    },
    {
      text: `**[cal.figuro.in](https://cal.figuro.in)**
is a minimalist calendar I designed for the new year. The goal was to keep it simple and focused—displaying only the essential information needed. The design is clean and functional, aiming to provide an intuitive experience without unnecessary clutter.`,
      author: 'ceo',
      timestamp: '2025-01-01',
    },
    {
      text: `**[super-cool-github-graph-generator](https://github.com/cu8code/super-cool-github-graph-generator)**
Some people unfortunately judge others solely based on their GitHub graph, so I created this tool to help improve those profiles and give people the best chance to showcase their work.`,
      author: 'ceo',
      timestamp: '2024-01-04',
    },
  ],
  previouslyAt: [
    {
      text: `**Freelance** Designed a custom page to take user feedback`,
      author: 'ceo',
      timestamp: '2023 Dec-2023 Feb',
    },
    {
      text: `**Cashcowlabs** Developed the site; Create an internal SASS tool for create blogs to increate SEO`,
      author: 'ceo',
      timestamp: '2024 Feb-May',
    },
    {
      text: `**Freelance** custom app with reactnative and expo`,
      author: 'ceo',
      timestamp: '2024 May-Jun',
    },
  ],
};

export const Twitter: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>('about');

  const handleTabClick = (tab: string) => {
    setActiveTab(tab);
  };

  return (
    <div className="flex flex-col w-full h-full overflow-hidden">
      <VideoBanner />
      <div className="relative -mt-16 px-6 flex items-center z-10">
        <AnimatedProfileRing height={100} width={100} />
      </div>
      <div className="ml-6 z-10">
        <div className="flex flex-row items-center mt-2">
          <div className="flex text-white font-semibold text-lg items-center">Ankan</div>
          <VerifiedBadge />
          <GoldenBadge />
        </div>
        <div className="text-gray-300">@cu8code</div>
      </div>
      <div className="mt-4 px-6 z-10">
        <div className="text-gray-300 text-sm">
          <b>We are echoes within echoes, shaping a voice that will someday call beyond us</b>
          <p>--Anonymous</p>
        </div>
      </div>
      <div className="mt-6 z-10">
        <nav className="flex justify-around text-gray-400 text-sm border-b-[1px] border-b-white/20">
          <button
            className={`pb-2 px-4 ${activeTab === 'about' ? 'text-white border-b-2 border-white' : 'hover:text-white'}`}
            onClick={() => handleTabClick('about')}
          >
            About Me
          </button>
          <button
            className={`pb-2 px-4 ${activeTab === 'projects' ? 'text-white border-b-2 border-white' : 'hover:text-white'}`}
            onClick={() => handleTabClick('projects')}
          >
            Projects
          </button>
          <button
            className={`pb-2 px-4 ${activeTab === 'previously-at' ? 'text-white border-b-2 border-white' : 'hover:text-white'}`}
            onClick={() => handleTabClick('previously-at')}
          >
            Previously-at
          </button>
        </nav>
      </div>
      <div className="mt-4 flex-grow overflow-y-auto z-10">
        {activeTab === 'about' && (
          <div>
            <Message text={data.about.text} author={data.about.author} timestamp={data.about.timestamp} />
            <Seperator />
          </div>
        )}
        {activeTab === 'projects' && (
          <div className='space-y-3'>
            {data.projects.map((project, index) => (
              <div key={index}>
                <Message text={project.text} author={project.author} timestamp={project.timestamp} />
                <Seperator />
              </div>
            ))}
          </div>
        )}
        {activeTab === 'previously-at' && (
          <div className='space-y-3'>
            {data.previouslyAt.map((experience, index) => (
              <div key={index}>
                <Message text={experience.text} author={experience.author} timestamp={experience.timestamp} />
                <Seperator />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
