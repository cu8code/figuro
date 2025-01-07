// app/page.tsx
import SpinningDonut from "@/components/SpinningDonut";
import SpinningCube from "@/components/SpinningCube";
import { Twitter } from "@/components/Twitter";

export default async function Home() {

  const dimensions = {
    mobile: {
      rows: 30,
      columns: 30,
    },
    desktop: {
      rows: 30,
      columns: 60,
    },
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center max-w-6xl mx-auto">
      <div className="flex flex-col items-center basis-1/2 mx-4">
        <div className="flex flex-1 items-center justify-center w-full md:w-auto">
          <div className="md:hidden">
            <SpinningDonut
              rows={dimensions.mobile.rows}
              columns={dimensions.mobile.columns}
            />
          </div>
          <div className="hidden md:block">
            <SpinningDonut
              rows={dimensions.desktop.rows}
              columns={dimensions.desktop.columns}
            />
          </div>
        </div>
        <div className="hidden xl:flex flex-1 items-center justify-center w-full md:w-auto">
          <SpinningCube
            rows={dimensions.desktop.rows}
            columns={dimensions.desktop.columns}
          />
        </div>
      </div>
      <div className="flex flex-col basis-1/2 mx-4 mt-6 md:mt-0">
        <div className="flex flex-1 border-l-[1px] border-r-[1px] border-white/20 w-full md:h-full">
          <Twitter />
        </div>
      </div>
    </div>
  );
}
