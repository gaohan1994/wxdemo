
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import { connect } from '@tarojs/redux';
import { AtList, AtListItem } from 'taro-ui';
import "./index.less";

@connect((store) => {
  return store;
}, (dispatch) => {
  return {};
})
class User extends Component {

  config: Config = {
    navigationBarTitleText: '个人中心'
  }

  render () {
    return (
      <View className="ct-user">
        <View className="ct-user-card">
          <Image className="ct-user-card-avator" src="http://net.huanmusic.com/wx/icon_wechat.png" />
          <View className="ct-user-card-content">
            <Text className="ct-user-name">印象麦品软件园店</Text>
            <View className="ct-user-card-content-phone">
              <Image className="ct-user-card-content-phone-img" src="http://net.huanmusic.com/wx/icon_shop.png" />
              <Text className="ct-user-phone">13478523552</Text>
            </View>
          </View>
        </View>
        <View className="ct-user-container">
          <View className="ct-user-container-item">
            <View className="ct-user-container-item-left">
              <Image src="http://net.huanmusic.com/wx/icon_receipt.png" className="ct-user-container-item-left-img" />
              <Text className="ct-user-font">收款设备</Text>
            </View>
            {/* <Image src="http://net.huanmusic.com/wx/icon_into.png" className="ct-user-contaienr-item-right" /> */}
          </View>
          <View className="ct-user-container-item">
            <View className="ct-user-container-item-left">
              <Image src="http://net.huanmusic.com/wx/icon_voice.png" className="ct-user-container-item-left-img" />
              <Text className="ct-user-font">收款音箱</Text>
            </View>
            {/* <Image src="http://net.huanmusic.com/wx/icon_into.png" className="ct-user-contaienr-item-right" /> */}
          </View>
          <View className="ct-user-container-item">
            <View className="ct-user-container-item-left">
              <Image src="http://net.huanmusic.com/wx/icon_set.png" className="ct-user-container-item-left-img" />
              <Text className="ct-user-font">设置</Text>
            </View>
            {/* <Image src="http://net.huanmusic.com/wx/icon_into.png" className="ct-user-contaienr-item-right" /> */}
          </View>
        </View>
      </View>
    );
  }
}

export default User;