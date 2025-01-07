// components/SkeletonLoader.tsx
export default function SkeletonLoader() {
  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center max-w-6xl p-2 md:p-5 xl:p-10 mx-auto animate-pulse">
      <div className="flex flex-col items-center basis-1/2 mx-4">
        <div className="flex flex-1 items-center justify-center w-full md:w-auto">
          <div className="md:hidden">
            <div className="bg-gray-700 rounded-lg" style={{ width: "30ch", height: "30ch" }} />
          </div>
          <div className="hidden md:block">
            <div className="bg-gray-700 rounded-lg" style={{ width: "60ch", height: "30ch" }} />
          </div>
        </div>
        <div className="hidden xl:flex flex-1 items-center justify-center w-full md:w-auto">
          <div className="bg-gray-700 rounded-lg" style={{ width: "60ch", height: "30ch" }} />
        </div>
      </div>
      <div className="flex flex-col basis-1/2 mx-4 mt-6 md:mt-0">
        <div className="flex flex-1 border-l-[1px] border-r-[1px] border-white/20 w-full md:h-full">
          <div className="bg-gray-700 rounded-lg w-full h-full" />
        </div>
      </div>
    </div>
  );
}
