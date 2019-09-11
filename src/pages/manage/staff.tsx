import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import './index.less';
import "../home/index.less";
import { getWindowHeight } from '../../utils/style';
import * as actions from '../../actions/manage';
import { connect } from '@tarojs/redux';
import { AtButton, AtModal } from 'taro-ui';

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
  staffList: any[];
}

type PageDispatchProps = {
  fetchStaff: (payload: any) => void;
  receiveStaff: (payload: any) => void;
}

type PageOwnProps = {}

type PageState = {
  page: number;
  deleteModal: boolean;
}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

@connect(state => state.manage, actions)
class Staff extends Component<IProps, PageState> {

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '店员管理 '
  }

  state = {
    page: 1,
    deleteModal: false,
  }

  componentWillReceiveProps () { }

  async componentDidMount() { }

  async componentDidShow() {
    console.log('this.props.staffList: ', this.props.staffList);
    if (this.props.staffList && this.props.staffList.length > 0) {
      this.props.receiveStaff(this.props.staffList);
    } else {
      await this.changePage(1);
      this.fetchData();
    }
  }

  changePage = (page: number) => {
    return this.setState({ page });
  }

  changeDeleteModal = (value: boolean) => {
    this.setState({ deleteModal: value });
  }

  public fetchData = async () => {
    Taro.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 1000
    });

    await this.props.fetchStaff({page: this.state.page});
    this.changePage(this.state.page + 1);
  }

  public onScrollToUpper = () => {
    this.fetchData();
  }

  public navigateToAdd = () => {
    Taro.navigateTo({
      url: `/pages/manage/staff-add`
    })
  }
  
  public onStaffClickHandle = (item: any) => {
    Taro.navigateTo({
      url: `/pages/manage/staff-edit?item=${JSON.stringify(item)}`
    })
  }

  public onDeleteHandle = () => {
    this.changeDeleteModal(true);
  }

  public handleConfirm = () => {
    Taro.showToast({
      icon: 'success',
      title: '删除成功',
    });
    this.changeDeleteModal(false);
  }

  render () {
    const { staffList } = this.props;
    return (
      <View className='ct-manage-staff'>
        <ScrollView
          scrollY={true}
          style={{height: getWindowHeight() }}
        >
          {staffList && staffList.length > 0 ? staffList.map((staffItem: any) => {
            return (
              <View 
                key={staffItem.phone}
                className='ct-manage-staff-item'
              >
                <View className='ct-manage-staff-item-content'> 
                  <Image src="http://net.huanmusic.com/wx/icon_default.png" className="ct-manage-staff-avator" />
                  <View className="ct-manage-staff-item-content-detail">
                    <Text className="ct-manage-staff-name" >{staffItem.name}</Text>
                    <Text className="ct-manage-staff-font" >{staffItem.phone}</Text>  
                  </View>
                </View>
                <View className="ct-home-card-buttons">
                  <View 
                    onClick={() => this.onStaffClickHandle(staffItem)}
                    className="ct-manage-staff-item-button border-right"
                  >
                    <Image src="http://net.huanmusic.com/wx/icon_redact.png" className="ct-manage-staff-item-button-img" />
                    <Text className="ct-manage-staff-font ct-manage-staff-font-edit">编辑</Text>
                  </View>
                  <View 
                    onClick={() => this.onDeleteHandle()}
                    className="ct-manage-staff-item-button"
                  >
                    <Image src="http://net.huanmusic.com/wx/icon_del.png" className="ct-manage-staff-item-button-img" />
                    <Text className="ct-manage-staff-font ct-manage-staff-font-edit">删除</Text>
                  </View>
                </View>
              </View>
            )
          }) : (
            <View>
              <Text>添加店员可以</Text>
              <Text>1、接收店铺的收款通知</Text>
              <Text>2、查看店铺近7天的收款记录</Text>
            </View>
          )}

          <View className="ct-button-container ct-manage-staff-add" >
            <AtButton
              type="primary"
              className="ct-button"
              onClick={this.navigateToAdd}
            >
              添加店员
            </AtButton>
          </View>

          <AtModal
            isOpened={this.state.deleteModal}
            cancelText='取消'
            confirmText='确认'
            onClose={() => this.changeDeleteModal(false)}
            onCancel={() => this.changeDeleteModal(false)}
            onConfirm={this.handleConfirm}
            content='确定删除该员工吗？'
          />
          
        </ScrollView>
      </View>
    )
  }
}

export default Staff;
