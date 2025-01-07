// components/SpinningCube.tsx
"use client";

import AnimatedTerminal from "@/components/animated_terminal";
import { createSpinningCube } from "@/components/utils";

export default function SpinningCube({ rows, columns }: { rows: number; columns: number }) {
  return (
    <AnimatedTerminal
      columns={columns}
      rows={rows}
      generateLines={(params) => createSpinningCube(params)}
    />
  );
}
