import React from 'react';
import {Text, FlatList, View, StyleSheet} from 'react-native';
import {useGetAllStarships} from '../apollo/queryHooks';

export const StarShips = (): React.JSX.Element => {
  const {data, loading} = useGetAllStarships();

  return (
    <>
      {loading ? (
        <Text>Loading...</Text>
      ) : (
        <>
          <Text style={styles.title}>Star Ships</Text>

          <FlatList
            style={styles.listContainer}
            data={data?.allStarships?.edges}
            keyExtractor={item => item?.node?.id}
            renderItem={({item: edge}) => (
              <View style={styles.itemContainer}>
                <Text style={styles.itemTitle}>{edge?.node?.name}</Text>
              </View>
            )}
          />
        </>
      )}
    </>
  );
};

const styles = StyleSheet.create({
  title: {
    paddingTop: 10,
    textAlign: 'center',
    fontWeight: '600',
    fontSize: 18,
  },
  listContainer: {
    marginTop: 10,
  },
  itemContainer: {
    marginTop: 15,
    paddingHorizontal: 12,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: '400',
  },
});
