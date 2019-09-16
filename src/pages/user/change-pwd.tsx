import Taro, { Component, Config } from '@tarojs/taro'
import { View } from '@tarojs/components'
import './index.less'
import "../manage/index.less";
import { AtInput, AtButton } from 'taro-ui';
import invariant from 'invariant';

type PageStateProps = {
  userInfo: any;
}

type PageDispatchProps = {
  addStaff: (payload: any) => void;
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
class ChangePwd extends Component<IProps, PageState> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '修改登录密码'
  }

  state = {
    oldPassword: '',
    password: '',
    confirmPassword: '',
  }
  public fetchData = () => {
    Taro.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    });
  }

  public onScrollToUpper = () => {
    this.fetchData();
  }

  public changeOldPassword = (value: string) => {
    this.setState({oldPassword: value });
  }
  public changePassword = (value: string) => {
    this.setState({password: value });
  }
  public changeConfirmPassword = (value: string) => {
    this.setState({confirmPassword: value });
  }
  
  public confirmAdd = async () => {
    try {
      Taro.hideKeyboard();
      invariant(!!this.state.oldPassword && !!this.state.password && !!this.state.confirmPassword, '请输入正确的密码格式');
      
      Taro.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 1000,
      });
      setTimeout(() => {
        Taro.navigateBack({delta: 1});
      }, 1000);
    } catch (error) {
      Taro.showToast({
        icon: 'none',
        title: error.message
      });
    }
  }

  render () {
    return (
      <View className='ct-manage-staff'>
        <View className="ct-input-container">
          <AtInput
            name='opwd'
            title="旧密码"
            value={this.state.oldPassword}
            onChange={this.changeOldPassword}
            placeholder="请输入旧密码"
          />
        </View>
        <View className="ct-input-container">
          <AtInput
            name='npwd'
            title="新密码"
            value={this.state.password}
            onChange={this.changePassword}
            placeholder="请输入新密码"
          />
        </View>
        <View className="ct-input-container">
          <AtInput
            name='ncpwd'
            title="确认新密码"
            value={this.state.confirmPassword}
            onChange={this.changeConfirmPassword}
            placeholder="请再次输入新密码"
          />
        </View>
        
        <View className="ct-button-container ct-manage-staff-add">
          <AtButton
            type="primary"
            className="ct-button"
            onClick={this.confirmAdd}
          >
            确认修改
          </AtButton>
        </View>
        
      </View>
    )
  }
}

export default ChangePwd;
