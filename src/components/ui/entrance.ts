import type { CSSProperties } from 'react';
import styles from './Entrance.module.css';

/** Classes for the on-load entrance: `enter`, `line` + `lineInner`, and `heroPace`. */
export const entrance = styles;

/** Places an element in the entrance sequence. */
export const entranceStep = (index: number) => ({ '--step': index }) as CSSProperties;
