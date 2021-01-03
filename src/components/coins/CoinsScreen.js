import React, {Component} from 'react';
import {View, ActivityIndicator, FlatList, StyleSheet} from 'react-native';
import Http from '../../libs/Http';
import Colors from '../../res/colors';
import CoinItem from './CoinItem';
import CoinSearch from './CoinSearch';

class CoinsScreen extends Component {
  state = {
    coins: [],
    allCoins: [],
    loagin: false,
  };
  componentDidMount = async () => {
    this.getCoins();
  };

  getCoins = async () => {
    this.setState({loading: true});
    const res = await Http.instance.get(
      'https://api.coinlore.net/api/tickers/',
    );
    this.setState({coins: res.data, allCoins: res.data, loading: false});
  };

  CoinInformation = (coin) => {
    this.props.navigation.navigate('CoinsDetail', {coin});
  };

  handlePress = () => {
    this.props.navigation.navigate('CoinsDetail2');
  };

  handleSearch = (query) => {
    const {allCoins} = this.state;

    const coinsfiltered = allCoins.filter((coin) => {
      return (
        coin.name.toLowerCase().includes(query.toLowerCase()) ||
        coin.symbol.toLowerCase().includes(query.toLowerCase())
      );
    });
    this.setState({coins: coinsfiltered});
  };

  render() {
    const {coins, loading} = this.state;

    return (
      <View style={styles.container}>
        <CoinSearch onChange={this.handleSearch} />

        {loading ? (
          <ActivityIndicator
            style={styles.loader}
            color="#FFE816"
            size="large"
          />
        ) : null}

        <FlatList
          data={coins}
          renderItem={({item}) => (
            <CoinItem item={item} onPress={() => this.CoinInformation(item)} />
          )}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.BCKG,
  },
  btn: {
    padding: 8,
    backgroundColor: '#FFE816',
    margin: 20,
    borderRadius: 20,
  },
  btnText: {
    color: 'black',
    textAlign: 'center',
  },
  loader: {
    marginTop: '50%',
  },
});

export default CoinsScreen;
