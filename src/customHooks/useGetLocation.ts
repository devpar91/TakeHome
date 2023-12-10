import {useEffect, useState} from 'react';
import {Coordinates} from '../types/distance.type';
import Geolocation from 'react-native-geolocation-service';
import {check, PERMISSIONS, RESULTS, request} from 'react-native-permissions';

export const useGetLocation = (OS: string) => {
  const [locationAllowed, setLocationAllowed] = useState(false);
  const [location, setLocation] = useState<null | Coordinates>(null);
  const [locationError, setLocationError] =
    useState<Geolocation.GeoError | null>(null);

  const getCurrentLocation = () => {
    return Geolocation.getCurrentPosition(
      position => {
        const {latitude, longitude} = position.coords;
        setLocation({latitude, longitude});
        setLocationError(null);
      },
      error => {
        setLocationError(error);
        setLocation(null);
      },
      {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000},
    );
  };

  useEffect(() => {
    const checkLocationPermission = async () => {
      const locationPerOS =
        OS === 'ios'
          ? PERMISSIONS.IOS.LOCATION_WHEN_IN_USE
          : PERMISSIONS.ANDROID.ACCESS_FINE_LOCATION;

      const permission = await check(locationPerOS);

      switch (permission) {
        case RESULTS.GRANTED:
          setLocationAllowed(true);
          getCurrentLocation();
          break;
        case RESULTS.DENIED:
          const locationPermissionType = await request(locationPerOS);
          if (locationPermissionType === 'blocked') {
            setLocationAllowed(false);
          } else if (locationPermissionType === 'granted') {
            setLocationAllowed(true);
            getCurrentLocation();
          }
          break;
        case RESULTS.BLOCKED:
          setLocationAllowed(false);
          break;
      }
    };

    checkLocationPermission();
  }, [OS]);

  return {locationAllowed, location, locationError};
};
