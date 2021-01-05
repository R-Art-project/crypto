import React, {Component} from 'react';
import {
  View,
  Text,
  Image,
  StyleSheet,
  FlatList,
  SectionList,
  Pressable,
  Alert,
} from 'react-native';
import Colors from 'crypto/src/res/colors';
import Http from 'crypto/src/libs/Http';
import CoinMarketItem from './CoinMarketItem';
import Storage from 'crypto/src/libs/Storage';

class CoinsDetailScreen extends Component {
  state = {
    coin: {},
    markets: [],
    isFavorite: false,
  };
  toogleFavorite = () => {
    if (this.state.isFavorite) {
      this.removeFavorite();
    } else {
      this.addFavorite();
    }
  };

  addFavorite = async () => {
    const coin = JSON.stringify(this.state.coin);
    const key = `favorite-${this.state.coin.id}`;

    const stored = await Storage.instance.store(key, coin);
    console.log('store', stored);
    if (stored) {
      this.setState({isFavorite: true});
    }
  };

  getFavorite = async () => {
    try {
      const key = `favorite-${this.state.coin.id}`;
      const favStr = await Storage.instance.get(key);
      if (favStr != null) {
        this.setState({isFavorite: true});
      }
    } catch (err) {
      console.log('get favorite err', err);
    }
  };

  removeFavorite = async () => {
    Alert.alert("Remove Favorite", "Are you sure?", [
      {
        text: "cancel",
        onPress: () => {},
        style: "cancel"
      },
      {
        text: "Remove",
        onPress: async () => {
          const key = `favorite-${this.state.coin.id}`;
          await Storage.instance.remove(key);
          this.setState({isFavorite: false});
        },
        style: "destructive"
      }
    ])
  };


  getSymbolIcon = (coinNameId) => {
    if (coinNameId) {
      return `https://c1.coinlore.com/img/25x25/${coinNameId}.png`;
    }
  };

  getSection = (coin) => {
    const section = [
      {
        title: 'Market cap',
        data: [coin.market_cap_usd],
      },
      {
        title: 'Price USD',
        data: [coin.price_usd],
      },
      {
        title: 'Volume 24h',
        data: [coin.volume24],
      },
      {
        title: 'Change 24h',
        data: [coin.percent_change_24h],
      },
    ];
    return section;
  };

  getMarkets = async (coinId) => {
    const url = `https://api.coinlore.net/api/coin/markets/?id=${coinId}`;
    const markets = await Http.instance.get(url);
    this.setState({markets});
  };

  componentDidMount() {
    const {coin} = this.props.route.params;
    this.props.navigation.setOptions({title: coin.symbol});
    this.getMarkets(coin.id);
    this.setState({coin}, () => {
      this.getFavorite();
    });
  }

  render() {
    const {coin, markets, isFavorite} = this.state;
    return (
      <View style={styles.Container}>
        <View style={styles.headerRow}>
          <View style={styles.headerRow}>
            <Image
              style={styles.CoinIcon}
              source={{uri: this.getSymbolIcon(coin.nameid)}}
            />
            <Text style={styles.CoinName}>{coin.name}</Text>
          </View>

          <Pressable
            onPress={this.toogleFavorite}
            style={[
              styles.btnFavorite,
              isFavorite ? styles.btnFavoriteRemove : styles.btnFavoriteAdd,
            ]}>
            <Text style={styles.btnFavoriteText}>
              {isFavorite ? 'Remove favorite' : 'Add favorite'}
            </Text>
          </Pressable>
        </View>
        <View style={styles.sectionContainer}>
          <SectionList
            sections={this.getSection(coin)}
            keyExtractor={(item) => item}
            renderItem={({item}) => (
              <View style={styles.sectionItem}>
                <Text style={styles.itemText}>{item}</Text>
              </View>
            )}
            renderSectionHeader={({section}) => (
              <View style={styles.sectionHeader}>
                <Text style={styles.sectionText}>{section.title}</Text>
              </View>
            )}
          />
        </View>

        <Text style={styles.sectionName}>Market</Text>

        <FlatList
          style={styles.list}
          horizontal={true}
          data={markets}
          renderItem={({item}) => <CoinMarketItem item={item} />}
        />
      </View>
    );
  }
}
const styles = StyleSheet.create({
  Container: {
    backgroundColor: Colors.BCKG,
    flex: 1,
  },
  headerRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    margin: 20,
  },
  CoinIcon: {
    width: 25,
    height: 25,
    marginRight: 10,
  },
  CoinName: {
    color: Colors.yelowOK,
    fontSize: 25,
    fontWeight: 'bold',
  },
  sectionContainer: {
    backgroundColor: Colors.darckdetail,
    padding: 20,
    marginLeft: 20,
    marginRight: 20,
    marginBottom: 20,
    borderRadius: 20,
    shadowColor: '#1C2C3D',
    shadowOffset: {
      width: 0,
      height: 5,
    },
    shadowOpacity: 0.36,
    shadowRadius: 6.68,

    elevation: 11,
  },
  list: {
    maxHeight: 100,
    paddingLeft: 20,
  },
  sectionHeader: {
    padding: 8,
    alignItems: 'center',
    borderRadius: 5,
  },
  sectionItem: {
    padding: 8,
  },
  itemText: {
    color: '#fff',
    fontSize: 18,
    alignSelf: 'center',
  },
  sectionText: {
    color: Colors.yelowOK,
    fontSize: 18,
    fontWeight: 'bold',
  },
  sectionName: {
    color: Colors.yelowOK,
    fontSize: 18,
    fontWeight: 'bold',
    margin: 20,
  },
  btnFavorite: {
    padding: 8,
    borderRadius: 8,
    height: 35,
  },
  btnFavoriteAdd: {
    backgroundColor: Colors.yelowOK,
  },
  btnFavoriteRemove: {
    backgroundColor: 'red',
  },
  btnFavoriteText: {
    color: Colors.darckdetail,
  },
});
export default CoinsDetailScreen;
