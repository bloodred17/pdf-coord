import { writable } from 'svelte/store';
import type {PageViewport} from "pdfjs-dist";

export type Coordinate = {x: number, y: number};
export type Dimension = {width: number, height: number};

export const effectivePointerStore = writable<Coordinate>({x: 0, y: 0});
export const viewportStore = writable<PageViewport>();
export const canvasDimensionStore = writable<Dimension>();