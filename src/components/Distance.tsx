import React from 'react';
import {Text, Platform, View, StyleSheet} from 'react-native';
import {calculateDistance} from '../utils/calculateDistance';
import {Coordinates} from '../types/distance.type';
import {useGetLocation} from '../customHooks/useGetLocation';

export const Distance = (): React.JSX.Element => {
  const STAR_WARS_LAND_LOCATION: Coordinates = {
    latitude: 33.814831976267016,
    longitude: -117.92057887641796,
  };

  const {locationAllowed, location, locationError} = useGetLocation(
    Platform.OS,
  );

  return (
    <View style={styles.distanceContainer}>
      <Text style={styles.question}>How far am I from star wars land?</Text>
      {!locationAllowed && (
        <Text style={[styles.response, styles.alert]}>
          Turn on location to find the distance
        </Text>
      )}

      {location && (
        <Text style={styles.response}>
          {calculateDistance(location, STAR_WARS_LAND_LOCATION)} mi
        </Text>
      )}
      {locationError && (
        <Text style={[styles.response, styles.error]}>
          {locationError.message}
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  distanceContainer: {
    paddingTop: 10,
    paddingBottom: 10,
    backgroundColor: '#F0F8FF',
  },
  question: {
    textAlign: 'center',
    color: 'blue',
  },
  response: {
    textAlign: 'center',
    color: 'green',
  },
  error: {
    color: 'red',
  },
  alert: {
    color: 'grey',
    fontStyle: 'italic',
  },
});
