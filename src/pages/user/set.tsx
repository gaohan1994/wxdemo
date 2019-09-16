
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text } from '@tarojs/components';
import "./index.less";
import "../manage/index.less";
import { AtButton, AtModal } from 'taro-ui';
import "../trade/history-item/index.less";

const cssPrefix = 'ct-history-item';

class Set extends Component {

  state = {
    modal: false
  }

  config: Config = {
    navigationBarTitleText: '个人中心'
  }

  public navigateToChangePwd = () => {
    Taro.navigateTo({
      url: `/pages/user/change-pwd`
    });
  }

  public changeModal = (value: boolean) => {
    this.setState({
      modal: value
    })
  }

  public logout = () => {
    this.changeModal(true);
  }

  public handleConfirm = () => {
    Taro.showToast({
      icon: 'success',
      title: '退出登录'
    });

    setTimeout(() => {
      // Taro.redirectTo({
      //   url: '/pages/user/login'
      // });
      Taro.navigateBack({});
    }, 1000);
  }

  render () {
    return (
      <View className={`${cssPrefix}`}>
        <View className={`${cssPrefix}-content`}>
          <View className={`${cssPrefix}-content-item ct-user-detail-border`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>更换登录手机号</Text>
            {/* <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>印象麦品软件园店</Text> */}
          </View>
          <View className={`${cssPrefix}-content-item ct-user-detail-border`} onClick={this.navigateToChangePwd}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>修改登录密码</Text>
            {/* <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>印象麦品软件园店</Text> */}
          </View>
        </View>
        
        <View className="ct-button-container ct-manage-staff-add" >
          <AtButton
            type="primary"
            className="ct-button"
            onClick={this.logout}
          >
            退出登录
          </AtButton>
        </View>

        <AtModal
          isOpened={this.state.modal}
          cancelText='取消'
          confirmText='确认'
          onClose={() => this.changeModal(false)}
          onCancel={() => this.changeModal(false)}
          onConfirm={this.handleConfirm}
          content='确定删除该员工吗？'
        />
        
      </View>
    );
  }
}

export default Set;