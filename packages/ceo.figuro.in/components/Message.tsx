import Image from "next/image";
import { Heart } from 'lucide-react';
import { markdownToHtml } from "./utils";
import profile from "@/app/profile.png"

export const Message: React.FC<{ text: string; author: string; timestamp: string }> = ({ text, author, timestamp }) => {
  return (
    <div className="flex flex-col mb-4 px-6">
      <div className="flex items-start space-x-3">
        <Image
          src={profile}
          alt="Profile"
          className="rounded-full"
          width={40}
          height={40}
          style={{ objectFit: 'cover', aspectRatio: '1 / 1' }}
        />
        <div className="flex flex-col flex-grow">
          <div className="text-sm text-white">
            <strong>{author}</strong>
            <span className="text-gray-400 text-xs ml-2">{timestamp}</span>
          </div>
          <div
            dangerouslySetInnerHTML={{ __html: markdownToHtml(text) }}
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
