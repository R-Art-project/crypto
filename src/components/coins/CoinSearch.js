import React, {Component} from 'react';
import {TextInput, Platform, View, StyleSheet} from 'react-native';
import Colors from 'crypto/src/res/colors';

class CoinSearch extends Component {
  state = {
    query: '',
  };

  Search = (query) => {
    this.setState({query});

    if (this.props.onChange) {
      this.props.onChange(query);
    }
  };

  render() {
    const {query} = this.state;
    return (
      <View style={styles.container}>
        <TextInput
          style={[
            styles.Input,
            Platform.OS === 'ios' ? styles.InputIOS : styles.InputAndroid,
          ]}
          onChangeText={this.Search}
          value={query}
          placeholder="Search Coin"
          placeholderTextColor="#fff"
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.darckdetail,
  },
  Input: {
    height: 40,
    //margin: 20,
    //padding: 10,
    borderColor: Colors.yelowOK,
    paddingLeft: 16,
    color: '#FFE816',
    marginBottom: 20,
  },
  InputAndroid: {
    borderBottomWidth: 2,
    borderBottomColor: Colors.yelowOK,
  },
  InputIOS: {
    margin: 8,
    borderRadius: 20,
    borderWidth: 1,
  },
});

export default CoinSearch;
