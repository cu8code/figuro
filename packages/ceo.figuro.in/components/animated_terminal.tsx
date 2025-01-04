"use client";

import { useState, useEffect } from 'react';
import Terminal from './terminal';

interface AnimatedTerminalProps {
  columns: number;
  rows: number;
  generateLines: (params: {
    timestamp: number;
    rows: number;
    columns: number;
  }) => string[];
}

class AnimationManager {
  private rafId: number | null = null;
  private isRunning = false;
  private callback: (timestamp: number) => void;

  constructor(callback: (timestamp: number) => void) {
    this.callback = callback;
  }

  private animate = (timestamp: number) => {
    if (!this.isRunning) return;
    this.callback(timestamp);
    this.rafId = requestAnimationFrame(this.animate);
  };

  start() {
    if (this.isRunning) return;
    this.isRunning = true;
    this.rafId = requestAnimationFrame(this.animate);
  }

  pause() {
    if (!this.isRunning) return;
    this.isRunning = false;
    if (this.rafId !== null) {
      cancelAnimationFrame(this.rafId);
      this.rafId = null;
    }
  }
}

function adjustLines(lines: string[], targetRows: number, targetColumns: number): string[] {
  const adjusted = lines.slice(0, targetRows).map(line => 
    line.length > targetColumns ? line.slice(0, targetColumns) : line.padEnd(targetColumns, ' ')
  );
  
  while (adjusted.length < targetRows) {
    adjusted.push(' '.repeat(targetColumns));
  }
  
  return adjusted;
}

export default function AnimatedTerminal({
  columns,
  rows,
  generateLines
}: AnimatedTerminalProps) {
  const [currentLines, setCurrentLines] = useState<string[]>([]);
  
  const animationManager = useState(
    () => new AnimationManager((timestamp) => {
      const lines = generateLines({ timestamp, rows, columns });
      const adjustedLines = adjustLines(lines, rows, columns);
      setCurrentLines(adjustedLines);
    })
  )[0];

  useEffect(() => {
    const handleFocus = () => animationManager.start();
    const handleBlur = () => animationManager.pause();
    
    window.addEventListener("focus", handleFocus);
    window.addEventListener("blur", handleBlur);
    
    animationManager.start();
    
    return () => {
      window.removeEventListener("focus", handleFocus);
      window.removeEventListener("blur", handleBlur);
      animationManager.pause();
    };
  }, [animationManager]);

  return (
    <Terminal
      columns={columns}
      rows={rows}
      lines={currentLines}
    />
  );
}
