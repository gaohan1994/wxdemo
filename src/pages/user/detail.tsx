
import Taro, { Component, Config } from '@tarojs/taro';
import { View, Text, Image } from '@tarojs/components';
import "./index.less";
import "../trade/history-item/index.less";

const cssPrefix = 'ct-history-item';

class User extends Component {

  config: Config = {
    navigationBarTitleText: '个人中心'
  }

  render () {
    return (
      <View className={`${cssPrefix}`}>
        <View className={`${cssPrefix}-title`}>
          <View className="ct-user-detail">
            <View className="ct-user-detail-bge" />
            <Text className={`ct-user-detail-name`}>基础信息</Text>
          </View>
        </View>
        <View className={`${cssPrefix}-content`}>
          <View className={`${cssPrefix}-content-item ct-user-detail-border`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>商户名称</Text>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>印象麦品软件园店</Text>
          </View>
          <View className={`${cssPrefix}-content-item ct-user-detail-border`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>商户简称</Text>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>印象麦品软件园店</Text>
          </View>
          <View className={`${cssPrefix}-content-item ct-user-detail-border`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>商户号</Text>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>13478523552</Text>
          </View>
          <View className={`${cssPrefix}-content-item ct-user-detail-border`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>地址</Text>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>福建省福州市鼓楼区软件园F区</Text>
          </View>
          <View className={`${cssPrefix}-content-item ct-user-detail-border`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>商户性质</Text>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>普通商户</Text>
          </View>
          <View className={`${cssPrefix}-content-item ct-user-detail-border`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>商户状态</Text>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>正常</Text>
          </View>
          <View className={`${cssPrefix}-content-item ct-user-detail-border`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>注册日期</Text>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>2019-01-02 18:15:50</Text>
          </View>
          <View className={`${cssPrefix}-content-item`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>联系人电话</Text>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>13164952348</Text>
          </View>
        </View>
        <View className={`${cssPrefix}-title`}>
          <View className="ct-user-detail">
            <View className="ct-user-detail-bge" />
            <Text className={`ct-user-detail-name`}>结算信息</Text>
          </View>
        </View>
        <View className={`${cssPrefix}-content`}>
          <View className={`${cssPrefix}-content-item ct-user-detail-border`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>结算账户账号</Text>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>6217001***12661277</Text>
          </View>
          <View className={`${cssPrefix}-content-item`}>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>结算账户户号</Text>
            <Text className={`${cssPrefix}-font ${cssPrefix}-font-detail`}>陈先生</Text>
          </View>
        </View>
      </View>
    );
  }
}

export default User;