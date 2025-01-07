import Image from "next/image";
import profile from "@/app/profile.png"

export const AnimatedProfileRing: React.FC<{ alt?: string; width?: number; height?: number }> = ({
  alt = "Profile",
  width = 70,
  height = 70,
}) => {
  return (
    <div className="relative">
      <div className="absolute inset-0 rounded-full p-[2px] bg-gradient-to-tr from-yellow-400 via-fuchsia-500 to-purple-600 animate-spin-slow">
        <div className="w-full h-full rounded-full bg-gray-900 p-[2px]">
          <Image
            src={profile}
            alt={alt}
            width={width}
            height={height}
            className="rounded-full"
            style={{ objectFit: 'cover', aspectRatio: '1 / 1' }}
          />
        </div>
      </div>
      <div className="opacity-0">
        <Image
          src="/profile-2.gif"
          alt=""
          width={width}
          height={height}
          className="rounded-full"
          style={{ objectFit: 'cover', aspectRatio: '1 / 1' }}
        />
      </div>
    </div>
  );
};
