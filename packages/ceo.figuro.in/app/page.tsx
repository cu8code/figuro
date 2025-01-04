"use client";

import AnimatedTerminal from "@/components/animated_terminal";
import { Twitter } from "./twitter";

type Point3D = {
  x: number;
  y: number;
  z: number;
};

type AnimationParams = {
  timestamp: number;
  rows: number;
  columns: number;
};

function createSpinningDonut({ timestamp, rows, columns }: AnimationParams): string[] {
  const config = {
    shades: ".,-~:;=!*#$@".split(""),
    innerRadius: 2,
    r1Points: 90,
    r2Points: 314,
    fov: 5,
    // Increased scale factor for larger donut
    scale: Math.min(rows, columns) 
  };

  const angles = {
    a: timestamp * 0.001,
    b: timestamp * 0.001
  };

  const buffer = Array.from({ length: rows }, () => " ".repeat(columns));
  const zBuffer = Array(columns * rows).fill(0);
  
  for (let j = 0; j < 6.28; j += 6.28 / config.r1Points) {
    for (let i = 0; i < 6.28; i += 6.28 / config.r2Points) {
      const h = Math.cos(j) + config.innerRadius;
      const D = 1 / (Math.sin(i) * h * Math.sin(angles.a) + Math.sin(j) * Math.cos(angles.a) + config.fov);
      
      const x = Math.floor(columns/2 + config.scale * D * (Math.cos(i) * h * Math.cos(angles.b) - 
        (Math.sin(i) * h * Math.cos(angles.a) - Math.sin(j) * Math.sin(angles.a)) * Math.sin(angles.b)));
      const y = Math.floor(rows/2 + (config.scale/2) * D * (Math.cos(i) * h * Math.sin(angles.b) + 
        (Math.sin(i) * h * Math.cos(angles.a) - Math.sin(j) * Math.sin(angles.a)) * Math.cos(angles.b)));
      
      if (y >= 0 && y < rows && x >= 0 && x < columns && D > zBuffer[x + columns * y]) {
        const N = Math.floor(8 * ((Math.sin(j) * Math.sin(angles.a) - Math.sin(i) * Math.cos(j) * Math.cos(angles.a)) * 
          Math.cos(angles.b) - Math.sin(i) * Math.cos(j) * Math.sin(angles.a) - Math.sin(j) * Math.cos(angles.a) - 
          Math.cos(i) * Math.cos(j) * Math.sin(angles.b)));
        
        zBuffer[x + columns * y] = D;
        buffer[y] = buffer[y].substring(0, x) + config.shades[Math.max(0, N)] + buffer[y].substring(x + 1);
      }
    }
  }
  
  return buffer;
}

function createSpinningCube({ timestamp, rows, columns }: AnimationParams): string[] {
  const config = {
    k1: Math.min(rows, columns),
    distance: 70,
    increment: 0.3,
    width: Math.min(rows, columns) / 2
  };

  // Reduced speed multipliers by about 66%
  const angles = {
    a: timestamp * 0.0003, // was 0.001
    b: timestamp * 0.0007, // was 0.002
    c: timestamp * 0.001   // was 0.003
  };

  const buffer = Array.from({ length: rows }, () => Array(columns).fill(' '));
  const zBuffer = Array(columns * rows).fill(0);

  function project(point: Point3D): { x: number; y: number; z: number } {
    const { sin, cos } = Math;
    return {
      x: point.y * sin(angles.a) * sin(angles.b) * cos(angles.c) - 
         point.z * cos(angles.a) * sin(angles.b) * cos(angles.c) +
         point.y * cos(angles.a) * sin(angles.c) + 
         point.z * sin(angles.a) * sin(angles.c) + 
         point.x * cos(angles.b) * cos(angles.c),
      y: point.y * cos(angles.a) * cos(angles.c) + 
         point.z * sin(angles.a) * cos(angles.c) - 
         point.y * sin(angles.a) * sin(angles.b) * sin(angles.c) +
         point.z * cos(angles.a) * sin(angles.b) * sin(angles.c) -
         point.x * cos(angles.b) * sin(angles.c),
      z: point.z * cos(angles.a) * cos(angles.b) - 
         point.y * sin(angles.a) * cos(angles.b) + 
         point.x * sin(angles.b)
    };
  }

  function drawPoint(point: Point3D, ch: string): void {
    const projected = project(point);
    const z = projected.z + config.distance;
    const ooz = 1 / z;
    
    const xp = Math.floor(columns / 2 + config.k1 * ooz * projected.x * 2);
    const yp = Math.floor(rows / 2 + config.k1 * ooz * projected.y);
    
    if (xp >= 0 && xp < columns && yp >= 0 && yp < rows) {
      const idx = xp + yp * columns;
      if (ooz > zBuffer[idx]) {
        zBuffer[idx] = ooz;
        buffer[yp][xp] = ch;
      }
    }
  }

  for (let x = -config.width; x < config.width; x += config.increment) {
    for (let y = -config.width; y < config.width; y += config.increment) {
      drawPoint({ x, y, z: -config.width }, '@');
      drawPoint({ x: config.width, y, z: x }, '$');
      drawPoint({ x: -config.width, y, z: -x }, '~');
      drawPoint({ x: -x, y, z: config.width }, '#');
      drawPoint({ x, y: -config.width, z: -y }, ';');
      drawPoint({ x, y: config.width, z: y }, '+');
    }
  }

  return buffer.map(row => row.join(''));
}

export default function Home() {
  const dimensions = {
    mobile: {
      rows: 30,
      columns: 30
    },
    desktop: {
      rows: 30,
      columns: 60
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row justify-center max-w-6xl mx-auto">
      <div className="flex flex-col items-center basis-1/2 mx-4">
        <div className="flex flex-1 items-center justify-center w-full md:w-auto">
          <div className="md:hidden">
            <AnimatedTerminal
              columns={dimensions.mobile.columns}
              rows={dimensions.mobile.rows}
              generateLines={(params) => createSpinningDonut(params)}
            />
          </div>
          <div className="hidden md:block">
            <AnimatedTerminal
              columns={dimensions.desktop.columns}
              rows={dimensions.desktop.rows}
              generateLines={(params) => createSpinningDonut(params)}
            />
          </div>
        </div>
        <div className="hidden xl:flex flex-1 items-center justify-center w-full md:w-auto">
          <AnimatedTerminal
            columns={dimensions.desktop.columns}
            rows={dimensions.desktop.rows}
            generateLines={(params) => createSpinningCube(params)}
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
