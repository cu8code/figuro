import React from 'react';

export interface TerminalProps {
  columns: number;
  rows: number;
  lines: string[];
}

const Terminal: React.FC<TerminalProps> = ({
  columns,
  rows,
  lines,
}) => {
  // const maxLineNumberDigits = lines.length.toString().length;
  
  // const padLineNumber = (num: number): string => {
  //   return num.toString().padStart(maxLineNumberDigits, ' ');
  // };

  return (
    <div
      className={`terminal grid grid-cols-[repeat(${columns},minmax(0,1fr))] 
        grid-rows-[repeat(${rows},minmax(0,1fr))] 
        h-[${rows}vh] w-[${columns}vw] leading-4 font-mono text-gray-300`}
    >
      {lines.map((line, i) => (
        <div
          key={i}
          className={`terminal-line whitespace-pre`}
          style={{ whiteSpace: 'pre-wrap' }}
          dangerouslySetInnerHTML={{
            __html: `${line}`,
          }}
        />
      ))}
    </div>
  );
};

export default Terminal;
