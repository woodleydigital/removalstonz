/** US, Australia, Canada and Europe market pages, in route-map order. */
import { usHome, usCost, usTimes } from './us.js';
import { auHome, auCost, auTimes } from './au.js';
import { caHome, caCost, caTimes } from './ca.js';
import { europeHome, europeCost, europeTimes } from './europe.js';

export const MARKET_PAGES = [
  usHome, usCost, usTimes,
  auHome, auCost, auTimes,
  caHome, caCost, caTimes,
  europeHome, europeCost, europeTimes
];
