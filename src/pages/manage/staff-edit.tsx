import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, } from '@tarojs/components'
import './index.less';
import { AtInput, AtButton } from 'taro-ui';
import invariant from 'invariant';
import { connect } from '@tarojs/redux';
import * as actions from '../../actions/manage';

// #region 书写注意
//
// 目前 typescript 版本还无法在装饰器模式下将 Props 注入到 Taro.Component 中的 props 属性
// 需要显示声明 connect 的参数类型并通过 interface 的方式指定 Taro.Component 子类的 props
// 这样才能完成类型检查和 IDE 的自动提示
// 使用函数模式则无此限制
// ref: https://github.com/DefinitelyTyped/DefinitelyTyped/issues/20796
//
// #endregion

type PageStateProps = {
  userInfo: any;
}

type PageDispatchProps = {
  editStaff: (payload: any) => void;
}

type PageOwnProps = {}

type PageState = {
  name: string;
  phone: string;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface StaffEdit {
  props: IProps;
}

@connect(state => state.manage, actions)
class StaffEdit extends Component<IProps, PageState> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '交易详情'
  }

  private item: any;
  constructor(props: any) {
    super(props);
    const item = JSON.parse(this.$router.params && this.$router.params.item || '{}') || {};
    this.state = {
      name: item.name || '',
      phone: item.phone || '',
    }
    this.item = item;
  }

  componentWillReceiveProps () {
    
  }

  componentDidMount() {
    
  }

  public changeName = (value: string) => {
    this.setState({name: value});
  }
  public changePhone = (value: string) => {
    this.setState({phone: value});
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
  
  public confirmEdit = async () => {
    try {
      invariant(!!this.state.name && !!this.state.phone, '请校验员工信息');
      const payload = {
        id: this.item.id,
        name: this.state.name,
        phone: this.state.phone
      }
      await this.props.editStaff(payload);
      Taro.showToast({
        title: '修改成功',
        icon: 'success',
        duration: 1000,
      });
      setTimeout(() => {
        Taro.navigateBack({delta: 1});
      }, 1200);
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
            name='staffname'
            title="收银员姓名"
            value={this.state.name}
            onChange={this.changeName}
            placeholder="收银员姓名"
          />
        </View>
        
        <View className="ct-input-container">
          <AtInput
            name='staffphone'
            title="收银员电话"
            value={this.state.phone}
            onChange={this.changePhone}
            placeholder="收银员电话"
          />
        </View>
        
        <View className="ct-button-container ct-manage-staff-add">
          <AtButton
            type="primary"
            className="ct-button"
            onClick={this.confirmEdit}
          >
            保存
          </AtButton>
        </View>
      </View>
    )
  }
}

// #region 导出注意
//
// 经过上面的声明后需要将导出的 Taro.Component 子类修改为子类本身的 props 属性
// 这样在使用这个子类时 Ts 才不会提示缺少 JSX 类型参数错误
//
// #endregion

export default StaffEdit;
