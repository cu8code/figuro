// components/SpinningDonut.tsx
"use client";

import AnimatedTerminal from "@/components/animated_terminal";
import { createSpinningDonut } from "@/components/utils";

export default function SpinningDonut({ rows, columns }: { rows: number; columns: number }) {
  return (
    <AnimatedTerminal
      columns={columns}
      rows={rows}
      generateLines={(params) => createSpinningDonut(params)}
    />
  );
}
