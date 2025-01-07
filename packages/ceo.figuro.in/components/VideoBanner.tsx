export const VideoBanner: React.FC = () => {
  return (
    <div className="relative w-full h-48 overflow-hidden">
      <iframe
        className="absolute inset-0 w-full h-full"
        src="https://www.youtube.com/embed/6Ny2nbm15GY?autoplay=1&mute=1&loop=1&playlist=6Ny2nbm15GY&controls=0"
        frameBorder="0"
        allow="autoplay; encrypted-media"
        allowFullScreen
        title="YouTube Video Banner"
      />
    </div>
  );
};
