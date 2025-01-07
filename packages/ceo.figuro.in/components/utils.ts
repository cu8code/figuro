// compoennts/utils.ts
type AnimationParams = {
  timestamp: number;
  rows: number;
  columns: number;
};

export function createSpinningDonut({ timestamp, rows, columns }: AnimationParams): string[] {
  const config = {
    shades: ".,-~:;=!*#$@".split(""),
    innerRadius: 2,
    r1Points: 90,
    r2Points: 314,
    fov: 5,
    scale: Math.min(rows, columns),
  };

  const angles = {
    a: timestamp * 0.001,
    b: timestamp * 0.001,
  };

  const buffer = Array.from({ length: rows }, () => " ".repeat(columns));
  const zBuffer = Array(columns * rows).fill(0);

  for (let j = 0; j < 6.28; j += 6.28 / config.r1Points) {
    for (let i = 0; i < 6.28; i += 6.28 / config.r2Points) {
      const h = Math.cos(j) + config.innerRadius;
      const D =
        1 /
        (Math.sin(i) * h * Math.sin(angles.a) +
          Math.sin(j) * Math.cos(angles.a) +
          config.fov);

      const x = Math.floor(
        columns / 2 +
          config.scale *
            D *
            (Math.cos(i) * h * Math.cos(angles.b) -
              (Math.sin(i) * h * Math.cos(angles.a) - Math.sin(j) * Math.sin(angles.a)) *
                Math.sin(angles.b))
      );
      const y = Math.floor(
        rows / 2 +
          (config.scale / 2) *
            D *
            (Math.cos(i) * h * Math.sin(angles.b) +
              (Math.sin(i) * h * Math.cos(angles.a) - Math.sin(j) * Math.sin(angles.a)) *
                Math.cos(angles.b))
      );

      if (y >= 0 && y < rows && x >= 0 && x < columns && D > zBuffer[x + columns * y]) {
        const N = Math.floor(
          8 *
            ((Math.sin(j) * Math.sin(angles.a) -
              Math.sin(i) * Math.cos(j) * Math.cos(angles.a)) *
              Math.cos(angles.b) -
              Math.sin(i) * Math.cos(j) * Math.sin(angles.a) -
              Math.sin(j) * Math.cos(angles.a) -
              Math.cos(i) * Math.cos(j) * Math.sin(angles.b))
        );

        zBuffer[x + columns * y] = D;
        buffer[y] =
          buffer[y].substring(0, x) + config.shades[Math.max(0, N)] + buffer[y].substring(x + 1);
      }
    }
  }

  return buffer;
}

export function createSpinningCube({ timestamp, rows, columns }: AnimationParams): string[] {
  const config = {
    k1: Math.min(rows, columns),
    distance: 70,
    increment: 0.3,
    width: Math.min(rows, columns) / 2,
  };

  const angles = {
    a: timestamp * 0.0003,
    b: timestamp * 0.0007,
    c: timestamp * 0.001,
  };

  const buffer = Array.from({ length: rows }, () => Array(columns).fill(" "));
  const zBuffer = Array(columns * rows).fill(0);

  function project(point: { x: number; y: number; z: number }) {
    const { sin, cos } = Math;
    return {
      x:
        point.y * sin(angles.a) * sin(angles.b) * cos(angles.c) -
        point.z * cos(angles.a) * sin(angles.b) * cos(angles.c) +
        point.y * cos(angles.a) * sin(angles.c) +
        point.z * sin(angles.a) * sin(angles.c) +
        point.x * cos(angles.b) * cos(angles.c),
      y:
        point.y * cos(angles.a) * cos(angles.c) +
        point.z * sin(angles.a) * cos(angles.c) -
        point.y * sin(angles.a) * sin(angles.b) * sin(angles.c) +
        point.z * cos(angles.a) * sin(angles.b) * sin(angles.c) -
        point.x * cos(angles.b) * sin(angles.c),
      z:
        point.z * cos(angles.a) * cos(angles.b) -
        point.y * sin(angles.a) * cos(angles.b) +
        point.x * sin(angles.b),
    };
  }

  function drawPoint(point: { x: number; y: number; z: number }, ch: string) {
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
      drawPoint({ x, y, z: -config.width }, "@");
      drawPoint({ x: config.width, y, z: x }, "$");
      drawPoint({ x: -config.width, y, z: -x }, "~");
      drawPoint({ x: -x, y, z: config.width }, "#");
      drawPoint({ x, y: -config.width, z: -y }, ";");
      drawPoint({ x, y: config.width, z: y }, "+");
    }
  }

  return buffer.map((row) => row.join(""));
}

export function markdownToHtml(markdown: string): string {
	// Pre-process: normalize line endings and add spacing
	markdown = markdown.replace(/\r\n/g, '\n')
		.replace(/\n{3,}/g, '\n\n')
		.trim();

	// Process markdown in steps to avoid conflicts
	const convertParagraphs = (text: string): string => {
		// First, protect lists and headers from paragraph processing
		const blocks: string[] = [];
		text = text.replace(/(?:^|\n)((?:[ ]*[-*+]|\d+\.)[ ].+\n?)+/g, (match) => {
			blocks.push(match);
			return `\n[[BLOCK${blocks.length - 1}]]\n`;
		});

		text = text.replace(/^(#{1,6})\s+(.+)$/gm, (match) => {
			blocks.push(match);
			return `[[BLOCK${blocks.length - 1}]]`;
		});

		// Process paragraphs
		text = text
			.split(/\n\n+/)
			.map(para => {
				const blockMatch = para.match(/\[\[BLOCK(\d+)\]\]/) ?? [];
				if (blockMatch?.length > 1) {
					const idx = parseInt(blockMatch[1], 10);
					return blocks[idx];
				}
				return `<p>${para.trim()}</p>`;
			})
			.join('\n\n');

		return text;
	};

	const convertHeader = (text: string): string => {
		return text.replace(/^(#{1,6})\s+(.+)$/gm, (_, level, content) =>
			`<h${level.length}>${content.trim()}</h${level.length}>`
		);
	};

	const convertInlineStyles = (text: string): string => {
		return text
			.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
			.replace(/\*(.+?)\*/g, '<em>$1</em>')
			.replace(/`(.+?)`/g, '<code>$1</code>');
	};

	const convertLinks = (text: string): string => {
		return text.replace(/\[([^\]]+)\]\(([^)]+)\)/g,
			'<a style="color:#1c94e5" href="$2">$1</a>'
		);
	};

	const convertLists = (text: string): string => {
		// Handle nested lists by processing each list block
		const listBlocks = text.match(/(?:^|\n)((?:[ ]*[-*+]|\d+\.)[ ].+\n?)+/g) || [];

		listBlocks.forEach(block => {
			const isOrdered = /^\d+\./.test(block.trim());
			const listTag = isOrdered ? 'ol' : 'ul';
			const processed = block
			.trim()
			.split('\n')
			.map(line => {
				const indentMatch = line.match(/^[ ]*/);
				const indent = indentMatch ? indentMatch[0].length : 0;
				const content = line.replace(/^[ ]*(?:[-*+]|\d+\.)[ ]/, '');
				return `${'  '.repeat(indent)}<li>${content}</li>`;
			})
			.join('\n');

			text = text.replace(block, `<${listTag}>\n${processed}\n</${listTag}>`);
		});

		return text;
	};

	// Apply transformations in sequence
	let html = markdown;
	html = convertParagraphs(html);  // Process paragraphs first
	html = convertHeader(html);
	html = convertInlineStyles(html);
	html = convertLinks(html);
	html = convertLists(html);

	// Final cleanup
	html = html
		.replace(/\n{2,}/g, '\n\n')
		.trim();

	return html;
}
