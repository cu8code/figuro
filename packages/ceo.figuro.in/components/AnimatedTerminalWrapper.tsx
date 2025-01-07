// components/AnimatedTerminalWrapper.tsx
"use client";

import AnimatedTerminal from "@/components/animated_terminal";

type AnimationParams = {
  timestamp: number;
  rows: number;
  columns: number;
};

type AnimationFunction = (params: AnimationParams) => string[];

interface AnimatedTerminalWrapperProps {
  rows: number;
  columns: number;
  animationFunction: AnimationFunction;
}

export default function AnimatedTerminalWrapper({
  rows,
  columns,
  animationFunction,
}: AnimatedTerminalWrapperProps) {
  return (
    <AnimatedTerminal
      columns={columns}
      rows={rows}
      generateLines={animationFunction}
    />
  );
}
