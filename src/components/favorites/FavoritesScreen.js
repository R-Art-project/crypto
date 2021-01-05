import react from 'react';
import React, {Component} from 'react';
import {View, FlatList, StyleSheet} from 'react-native';
import FavoritesEmptyState from './FavoritesEmtyState';
import CoinItem from '../coins/CoinItem';
import Storage from '../../libs/Storage';

class FavoritesScreen extends Component {
  state = {
    favorites: []
  }
  
  getFavorites = async () => {
    try{
      const allKeys = await Storage.instance.getAllkeys();
      const keys = allKeys.filter((key) => key.includes("favorite-"));
      const favs = await Storage.instance.multiGet(keys);
      const favorites = favs.map((fav) => JSON.parse(fav[1]));
      console.log("keys", favorites);
      this.setState({favorites});
    }catch(err){
      console.log("get favorites err", err);
    }
  }

  coinPress = (coin) => {
    this.props.navigation.navigate("CoinsDetail", {coin});
  }

  componentDidMount() {
    this.getFavorites();
    this.props.navigation.addListener("focus", this.getFavorites);
  }
  componentWillUnmount() {
    this.props.navigation.removeListener("focus", this.getFavorites);

  }

  render() {
    const {favorites} = this.state;

    return (
      <View style={styles.container}>
        {favorites.length === 0 ?
        <FavoritesEmptyState />
      : null  
      }
      {favorites.length > 0 ?
        <FlatList
          data={favorites}
          renderItem={({item}) =>
          <CoinItem item={item} 
            onPress={() => this.coinPress(item)} 
            />
          } 
        />
      : null
      }
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
