import { entrance, entranceStep } from './entrance';

interface EntranceLinesProps {
  lines: string[];
  /** Entrance step of the first line; each line after it is one step later. */
  firstStep: number;
}

/** Each line rises out of its own mask. Place inside the heading or paragraph. */
export function EntranceLines({ lines, firstStep }: EntranceLinesProps) {
  return lines.map((line, index) => (
    <span key={line} className={entrance.line}>
      <span className={entrance.lineInner} style={entranceStep(firstStep + index)}>
        {line}
      </span>{' '}
    </span>
  ));
}
