import React, { useId } from 'react';

interface TerrainDividerProps {
  /** Fill of the lower/incoming section (its --bg-* var) */
  fill: string;
  /** Optional cap material drawn along the jagged edge (e.g. grass) */
  cap?: string;
  /** Background behind the jag = previous section's bg */
  className?: string;
  height?: number;
}

/** Jagged block-terrain transition strip between themed sections. */
export function TerrainDivider({ fill, cap, className = '', height = 40 }: TerrainDividerProps) {
  const id = useId().replace(/[:]/g, '');
  const cols: Array<[number, number]> = [
    [0, 16],
    [16, 4],
    [32, 24],
    [48, 10],
  ];

  return (
    <div aria-hidden className={`w-full overflow-hidden leading-none ${className}`}>
      <svg className="block w-full" height={height} width="100%" shapeRendering="crispEdges">
        <defs>
          <pattern id={id} width="64" height={height} patternUnits="userSpaceOnUse">
            {cols.map(([x, y]) => (
              <g key={x}>
                {cap && <rect x={x} y={y} width={16} height={8} fill={cap} />}
                <rect x={x} y={cap ? y + 8 : y} width={16} height={height} fill={fill} />
              </g>
            ))}
          </pattern>
        </defs>
        <rect width="100%" height={height} fill={`url(#${id})`} />
      </svg>
    </div>
  );
}
