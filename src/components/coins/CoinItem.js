import React from 'react';
import {View, Pressable, Text, StyleSheet, Image, Platform} from 'react-native';

const CoinItem = ({item, onPress}) => {
  const getImagArrow = () => {
    if (item.percent_change_1h > 0) {
      return require('crypto/src/assets/UP.png');
    } else {
      return require('crypto/src/assets/DWON.png');
    }
  };

  return (
    <Pressable onPress={onPress} style={styles.container}>
      <View style={styles.row}>
        <Text style={styles.CoinSimbl}>{item.symbol}</Text>
        <Text style={styles.CoinName}>{item.name}</Text>
      </View>
      <View style={styles.row}>
        <Text style={styles.CoinPrice}>{`$${item.price_usd}`}</Text>
        <Text style={styles.Variation}>{item.percent_change_1h} 1h</Text>
        <Image style={styles.ImageUPorDWON} source={getImagArrow()} />
      </View>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 16,
    borderBottomColor: '#FFE816',
    borderBottomWidth: 1,
    marginLeft: Platform.OS === 'ios' ? 15 : 0,
    marginRight: Platform.OS === 'ios' ? 15 : 0,
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  CoinSimbl: {
    color: '#FFE816',
    fontSize: 18,
    fontWeight: 'bold',
  },
  CoinName: {
    fontSize: 12,
    color: '#FFE816',
    marginLeft: 10,
  },
  CoinPrice: {
    color: 'white',
    //backgroundColor: 'black',
    padding: 2,
    marginRight: 30,
  },
  ImageUPorDWON: {
    width: 20,
    height: 20,
    marginLeft: 5,
  },
  Variation: {
    color: '#FFE816',
  },
});

export default CoinItem;
