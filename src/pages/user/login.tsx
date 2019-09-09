
import Taro, { Component, Config } from '@tarojs/taro';
import { View } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtInput, AtButton, } from 'taro-ui';
import invariant from 'invariant';
import * as actions from '../../actions/user';

interface User {
  props: {
    dispatchLogin: (payload: any) => void;
  }
}

@connect((store) => {
  // console.log('store: ', store);
  return store;
}, actions)
class User extends Component {
  config: Config = {
    navigationBarTitleText: '登录'
  }

  state = {
    username: '',
    password: '',
    loading: false,
  }

  public changeUsername = (value: string) => {
    this.setState({ username: value });
    return value;
  }

  public changePassword = (value: string) => {
    this.setState({ password: value });
    return value;
  }

  public changeLoading = (loading: boolean) => {
    this.setState({ loading });
  }

  public onLoginHandle = () => {
    this.changeLoading(true);
    
    try {
      invariant(this.state.username === 'admin' && this.state.password === '123', '登录失败');

      this.props.dispatchLogin({
        username: this.state.username,
        password: this.state.password,
      });
      this.changeLoading(false);
      Taro.navigateBack({});
    } catch (error) {
      this.changeLoading(false);
      Taro.showToast({
        title: error.message,
        icon: 'loading'
      });
    }
  }

  render () {
    return (
      <View>
        <AtInput
          name="username"
          title='账号'
          type='text'
          placeholder='请输入账号'
          value={this.state.username}
          onChange={this.changeUsername.bind(this)}
        />
        <AtInput
          name="password"
          title='密码'
          type='password'
          placeholder='请输入密码'
          value={this.state.password}
          onChange={this.changePassword.bind(this)}
        />

        <AtButton
          type="primary"
          loading={this.state.loading}
          onClick={this.onLoginHandle.bind(this)}
        >
          登录
        </AtButton>
      </View>
    );
  }
}

export default User;