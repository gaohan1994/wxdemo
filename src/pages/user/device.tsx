import Taro, { Component, Config } from '@tarojs/taro'
import { View, Image, Text } from '@tarojs/components'
import './index.less';
import '../manage/index.less';
import "../home/index.less";
import { AtButton } from 'taro-ui';
import invariant from 'invariant';
import * as actions from '../../actions/manage';
import { connect } from '@tarojs/redux';

type PageStateProps = {
  userInfo: any;
}

type PageDispatchProps = {
  addStaff: (payload: any) => void;
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(state => state.manage, actions)
class Device extends Component<IProps, PageState> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '设备收款'
  }

  state = {
    name: '',
    phone: '',
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

  public changeName = (value: string) => {
    this.setState({name: value});
  }
  public changePhone = (value: string) => {
    this.setState({phone: value});
  }
  public toast = () => {
    Taro.showToast({
      title: '权限未开放',
      icon: 'loading'
    })
  }
  
  public confirmAdd = async () => {
    try {
      Taro.hideKeyboard();
      invariant(!!this.state.name && !!this.state.phone, '请输入正确的员工格式');
      const payload = {
        name: this.state.name,
        phone: this.state.phone,
      };
      await this.props.addStaff(payload);
      Taro.showToast({
        title: '添加成功',
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

        <View className='ct-manage-staff-item'>
          <View className='ct-manage-staff-item-content ct-user-device-content'> 
            <View className="ct-manage-staff-item-content-detail ct-user-device-content-detail">
              <Text className="ct-user-device-name" >设备型号：云喇叭S01 </Text>
              <Text className="ct-user-device-number" >序列号：AAA123456789</Text>
            </View>
            <Image src="http://net.huanmusic.com/wx/icon_default.png" className="ct-manage-staff-avator" />
          </View>
          <View className="ct-home-card-buttons">
            <View 
              onClick={this.toast}
              className="ct-manage-staff-item-button border-right"
            >
              <Image src="http://net.huanmusic.com/wx/icon_device.png" className="ct-manage-staff-item-button-img" />
              <Text className="ct-manage-staff-font ct-manage-staff-font-edit">设备管理</Text>
            </View>
          </View>
        </View>

        <View className="ct-button-container ct-manage-staff-add" >
          <AtButton
            type="primary"
            className="ct-button"
            onClick={this.toast}
          >
            添加收款设备
          </AtButton>
        </View>
        
      </View>
    )
  }
}
export default Device;
