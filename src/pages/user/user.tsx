
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { } from 'taro-ui';

@connect((store) => {
  console.log('store: ', store);
  return store;
}, (dispatch) => {
  console.log('dispatch: ', dispatch);
  return {};
})
class User extends Component {

  config: Config = {
    navigationBarTitleText: '我的'
  }

  render () {
    return (
      <View>
        <Text>User</Text>
      </View>
    );
  }
}

export default User;