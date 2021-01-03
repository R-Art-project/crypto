import react from 'react';
import React, {Component} from 'react';
import {View, StyleSheet} from 'react-native';
import FavoritesEmptyState from './FavoritesEmtyState';

class FavoritesScreen extends Component {
  render() {
    return (
      <View style={styles.container}>
        <FavoritesEmptyState />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0D4976',
  },
  tetx: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 18,
    alignSelf: 'center',
  },
});

export default FavoritesScreen;
