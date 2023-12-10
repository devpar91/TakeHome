import {getDistance, convertDistance} from 'geolib';
import {Coordinates} from '../types/distance.type';

export const calculateDistance = (
  pointA: Coordinates,
  pointB: Coordinates,
  unit: string = 'mi',
) => {
  const distanceInMeter = getDistance(pointA, pointB);
  return convertDistance(distanceInMeter, unit);
};
