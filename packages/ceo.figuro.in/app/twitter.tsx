"use client"
import { useState } from 'react';

import profile from "./profile-2.gif"
import Image from "next/image";
import { Heart } from 'lucide-react';

const project_1 = `**[removebackground.figuro.in](https://removebackground.figuro.in)**  
This project was inspired by a video from @theo, where he shared that he was charging $6 for 100 images. At the time, I was skeptical, thinking I could do better. However, I soon realized the value of creating a simple, efficient solution for removing backgrounds, and this project became my response to that challenge.

*Using a custom fork of Three.js to do some browser magic!*
*100% client-side*
*With Mask Editor*
`;

const project_2 = `**[cal.figuro.in](https://cal.figuro.in)**  
is a minimalist calendar I designed for the new year. The goal was to keep it simple and focused—displaying only the essential information needed. The design is clean and functional, aiming to provide an intuitive experience without unnecessary clutter.
`;

const project_3 = `**[super-cool-github-graph-generator](https://github.com/cu8code/super-cool-github-graph-generator)**  
Some people unfortunately judge others solely based on their GitHub graph, so I created this tool to help improve those profiles and give people the best chance to showcase their work.
`;


const about_me = `
Hello! I'm a **${new Date().getFullYear() - 2004}-year-old** software developer from Kolkata. 

With over **${new Date().getFullYear() - 2022}-year** of experience in the industry, I have a passion for creating innovative solutions. I enjoy **anime**, though the recent privacy restrictions have limited my viewing time. 

I thrive on learning and sharing information, and I believe that no one is inherently smarter than anyone else; we are all just navigating our own paths of knowledge. I strive to remain humble and cherish the time spent with my family. 

My aspiration is to dedicate myself to a meaningful cause, which I am still in the process of discovering!
`

function markdownToHtml(markdown: string): string {
	// Pre-process: normalize line endings and add spacing
	markdown = markdown.replace(/\r\n/g, '\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();

	// Process markdown in steps to avoid conflicts
	const convertParagraphs = (text: string): string => {
		// First, protect lists and headers from paragraph processing
		const blocks: string[] = [];
		text = text.replace(/(?:^|\n)((?:[ ]*[-*+]|\d+\.)[ ].+\n?)+/g, (match) => {
			blocks.push(match);
			return `\n[[BLOCK${blocks.length - 1}]]\n`;
		});

		text = text.replace(/^(#{1,6})\s+(.+)$/gm, (match) => {
			blocks.push(match);
			return `[[BLOCK${blocks.length - 1}]]`;
		});

		// Process paragraphs
		text = text
			.split(/\n\n+/)
			.map(para => {
				const blockMatch = para.match(/\[\[BLOCK(\d+)\]\]/) ?? [];
				if (blockMatch?.length > 1) {
					const idx = parseInt(blockMatch[1], 10);
					return blocks[idx];
				}
				return `<p>${para.trim()}</p>`;
			})
			.join('\n\n');

		return text;
	};

	const convertHeader = (text: string): string => {
		return text.replace(/^(#{1,6})\s+(.+)$/gm, (_, level, content) => 
			`<h${level.length}>${content.trim()}</h${level.length}>`
		);
	};

	const convertInlineStyles = (text: string): string => {
		return text
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			.replace(/`(.+?)`/g, '<code>$1</code>');
	};

	const convertLinks = (text: string): string => {
		return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g, 
			'<a style="color:#1c94e5" href="$2">$1</a>'
		);
	};

	const convertLists = (text: string): string => {
		// Handle nested lists by processing each list block
		const listBlocks = text.match(/(?:^|\n)((?:[ ]*[-*+]|\d+\.)[ ].+\n?)+/g) || [];

		listBlocks.forEach(block => {
			const isOrdered = /^\d+\./.test(block.trim());
			const listTag = isOrdered ? 'ol' : 'ul';
			const processed = block
			.trim()
			.split('\n')
			.map(line => {
				const indentMatch = line.match(/^[ ]*/);
				const indent = indentMatch ? indentMatch[0].length : 0;
				const content = line.replace(/^[ ]*(?:[-*+]|\d+\.)[ ]/, '');
				return `${'  '.repeat(indent)}<li>${content}</li>`;
			})
			.join('\n');

			text = text.replace(block, `<${listTag}>\n${processed}\n</${listTag}>`);
		});

		return text;
	};

	// Apply transformations in sequence
	let html = markdown;
	html = convertParagraphs(html);  // Process paragraphs first
	html = convertHeader(html);
	html = convertInlineStyles(html);
	html = convertLinks(html);
	html = convertLists(html);

	// Final cleanup
	html = html
		.replace(/\n{2,}/g, '\n\n')
		.trim();

	return html;
}

const Message: React.FC<{ text: string; author: string; timestamp: string }> = ({ text, author, timestamp }) => {
	return (
		<div className="flex flex-col mb-4 px-6">
			<div className="flex items-start space-x-3">
				<Image
					src={profile} // Replace with your hosted GIF URL
					alt="Profile"
					className="rounded-full"
					width={40} // Adjusted width for better aspect ratio
					height={40} // Adjusted height for better aspect ratio
					style={{
						objectFit: 'cover', // Ensures the image covers the area without distortion
						aspectRatio: '1 / 1' // Maintains a square aspect ratio
					}}
				/>
				<div className="flex flex-col flex-grow">
					<div className="text-sm text-white">
						<strong>{author}</strong>
						<span className="text-gray-400 text-xs ml-2">{timestamp}</span>
					</div>

					<div
						dangerouslySetInnerHTML={{
							__html: markdownToHtml(text)
						}}
						className="mt-2 text-gray-300 text-sm"
					/>

					<div className="flex items-center space-x-4 mt-3">
						<button className="text-gray-400 hover:text-gray-200 transition-colors">
							<Heart size={16} />
						</button>
					</div>
				</div>
			</div>
		</div>
	);
};

interface AnimatedProfileRingProps {
  alt?: string;
  width?: number;
  height?: number;
}

const AnimatedProfileRing: React.FC<AnimatedProfileRingProps> = ({
  alt = "Profile",
  width = 70,
  height = 70,
}) => {
  return (
    <div className="relative">
      {/* Animated gradient border */}
      <div 
        className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-purple-600 animate-spin-slow"
      >
        {/* White ring separator */}
        <div className="w-full h-full rounded-full bg-gray-900 p-[2px]">
          {/* Profile image */}
          <Image
            src={profile}
            alt={alt}
            width={width}
            height={height}
            className="rounded-full"
            style={{
              objectFit: 'cover',
              aspectRatio: '1 / 1'
            }}
          />
        </div>
      </div>
      
      {/* Static base image (prevents layout shift during animation) */}
      <div className="opacity-0">
        <Image
          src={profile}
          alt=""
          width={width}
          height={height}
          className="rounded-full"
          style={{
            objectFit: 'cover',
            aspectRatio: '1 / 1'
          }}
        />
      </div>
    </div>
  );
};

const Seperator = () => {
	return (
		<div className="flex flex-row flex-1 h-[1px] w-full border-white/20 border-b-[1px]" />
	)

}

const VideoBanner: React.FC = () => {
	return (
		<div className="relative w-full h-48 overflow-hidden">
			<iframe
				className="absolute inset-0 w-full h-full"
				src="https://www.youtube.com/embed/6Ny2nbm15GY?autoplay=1&mute=1&loop=1&playlist=6Ny2nbm15GY&controls=0" // Updated URL with controls=0
				frameBorder="0"
				allow="autoplay; encrypted-media"
				allowFullScreen
				title="YouTube Video Banner"
			></iframe>
		</div>
	);
};

const GoldenBadge: React.FC = () => {
	return (
		<svg
			className="w-6 h-6 text-yellow-300 text-box" // Set the color to blue
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
		</svg>
	);
};

const VerifiedBadge: React.FC = () => {
	return (
		<svg
			className="w-6 h-6 text-blue-500 text-box" // Set the color to blue
			viewBox="0 0 24 24"
			fill="currentColor"
		>
			<path d="M20.396 11c-.018-.646-.215-1.275-.57-1.816-.354-.54-.852-.972-1.438-1.246.223-.607.27-1.264.14-1.897-.131-.634-.437-1.218-.882-1.687-.47-.445-1.053-.75-1.687-.882-.633-.13-1.29-.083-1.897.14-.273-.587-.704-1.086-1.245-1.44S11.647 1.62 11 1.604c-.646.017-1.273.213-1.813.568s-.969.854-1.24 1.44c-.608-.223-1.267-.272-1.902-.14-.635.13-1.22.436-1.69.882-.445.47-.749 1.055-.878 1.688-.13.633-.08 1.29.144 1.896-.587.274-1.087.705-1.443 1.245-.356.54-.555 1.17-.574 1.817.02.647.218 1.276.574 1.817.356.54.856.972 1.443 1.245-.224.606-.274 1.263-.144 1.896.13.634.433 1.218.877 1.688.47.443 1.054.747 1.687.878.633.132 1.29.084 1.897-.136.274.586.705 1.084 1.246 1.439.54.354 1.17.551 1.816.569.647-.016 1.276-.213 1.817-.567s.972-.854 1.245-1.44c.604.239 1.266.296 1.903.164.636-.132 1.22-.447 1.68-.907.46-.46.776-1.044.908-1.681s.075-1.299-.165-1.903c.586-.274 1.084-.705 1.439-1.246.354-.54.551-1.17.569-1.816zM9.662 14.85l-3.429-3.428 1.293-1.302 2.072 2.072 4.4-4.794 1.347 1.246z"></path>
		</svg>
	);
};

export const Twitter: React.FC = () => {
	const [activeTab, setActiveTab] = useState<string>('about'); // Default tab is 'projects'

	const handleTabClick = (tab: string) => {
		setActiveTab(tab);
	};

	return (
		<div className="flex flex-col w-full h-full overflow-hidden">
			{/* Video Banner */}
			<VideoBanner />

			{/* Profile Section */}
			<div className="relative -mt-16 px-6 flex items-center z-10">
					<AnimatedProfileRing height={100} width={100} />
			</div>

			{/* Profile Name and Username */}
			<div className="ml-6 z-10">
				<div className="flex flex-row items-center mt-2">
					{/* Profile Name */}
					<div className="flex text-white font-semibold text-lg items-center">
						Ankan
					</div>

					{/* Verified Badge */}
					<VerifiedBadge />
					<GoldenBadge />
				</div>
				<div className="text-gray-300">
					@cu8code
				</div>
			</div>

			{/* Bio Section */}
			<div className="mt-4 px-6 z-10">
				<div className="text-gray-300 text-sm">
					<b>We are echoes within echoes, shaping a voice that will someday call beyond us</b>
					<p>--Anonymous</p>
				</div>
			</div>

			{/* Tabs */}
			<div className="mt-6 z-10">
				<nav className="flex justify-around text-gray-400 text-sm border-b-[1px] border-b-white/20">
					{/* Tab Buttons */}
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
						className={`pb-2 px-4 ${activeTab === 'list' ? 'text-white border-b-2 border-white' : 'hover:text-white'}`}
						onClick={() => handleTabClick('list')}
					>
						List
					</button>
				</nav>
			</div>

			{/* Content Section */}
			<div className="mt-4 flex-grow overflow-y-auto z-10">
				{/* Conditionally Render Content Based on Active Tab */}
				{activeTab === 'about' && (
					<div>
						{/* About Me Content */}
						<Message text = {about_me} author='ceo' timestamp={'000-00-00'} />
						<Seperator />
					</div>
				)}

				{activeTab === 'projects' && (
					<div className='space-y-3'>
						<Message text={project_1} author='ceo' timestamp='2024-06-02' />
						<Seperator />
						<Message text={project_2} author='ceo' timestamp='2025-01-01' />
						<Seperator />
						<Message text={project_3} author='ceo' timestamp='2024-01-04' />
						<Seperator />
					</div>
				)}

				{activeTab === 'list' && (
					<div className='space-y-3'>
						{/* Images Content */}
						<Message text='cooking' author='ceo' timestamp='2025-01-01' />
						<Seperator />
					</div>
				)}
			</div>
		</div>
	);
};

