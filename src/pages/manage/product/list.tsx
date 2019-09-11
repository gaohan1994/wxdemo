import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView, Image } from '@tarojs/components'
import './index.less'
import "../index.less";
import "../../home/index.less";
import { getWindowHeight } from '../../../utils/style';
import { AtInput, AtButton } from 'taro-ui';
import invariant from 'invariant';
import * as actions from '../../../actions/manage';
import { connect } from '@tarojs/redux';
import Menu from './menu/index';
import List from './list/index';

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
  addStaff: (payload: any) => void;
}

type PageOwnProps = {}

type PageState = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps

interface ProductList {
  props: IProps;
  height: string;
}

@connect(state => state.manage, actions)
class ProductList extends Component {
    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '商品列表'
  }

  state = {
    loading: false,
    height: '',
  }

  componentWillReceiveProps () {
    
  }

  async componentDidMount () {
    setTimeout(() => {
      this.calculateScrollViewHeight();
    }, 100);
  }

  public calculateScrollViewHeight = () => {
    const that = this;
    const height = Taro.getSystemInfoSync().windowHeight;
    const query = Taro.createSelectorQuery();
    query.select('#ct-product-search').boundingClientRect();
    query.select('#ct-home-card-buttons').boundingClientRect();
    query.exec((res) => {
      const searchHeight = res[0].height;
      const buttonsHeight = res[1].height;

      that.setState({height: `${height - searchHeight - buttonsHeight}px`});
    });
    // const searchHeight = this.refs.search.boundingClientRect().exec(res => console.log('res:', res));
    
  }

  public onScrollToUpper = () => {
    
  }

  render () {
    const { loading } = this.state;
    return (
      <View className='ct-product'>
        <View className="ct-product-search" id="ct-product-search" >
          <View className="ct-product-search-input" />
          <Image src="http://net.huanmusic.com/wx/icon_scan.png" className="ct-product-search-scan" />
        </View>
        <View className="ct-product-list">
          <ScrollView
            scrollY={true}
            className="ct-product-menu-container"
            style={{ height: this.state.height }}
          >
            <Menu 
              menu={[{name: '冠军面包'}, {name: '中秋礼盒'}, {name: '精致西点'}, {name: '特调饮品'}]} 
            />
          </ScrollView>
          {loading === true ? (
            <View>
              <Text>暂无商品</Text>
            </View>
          ) : (
            <ScrollView
              scrollY={true}
              className="ct-product-list-container"
              style={{ height: this.state.height }}
            >
              <View>
                <List 
                  list={new Array(4).fill({}).map((_, index: number) => {
                    return {
                      id: index + 1,
                      name: '香芋甜心（面包）',
                      price: '3.00',
                      qrcode: '条码：1034789456',
                      inventory: 30,
                    }
                  })
                }
                />
              </View>
            </ScrollView>
          )}
        </View>
        <View className="ct-home-card-buttons" id="ct-home-card-buttons">
          <View 
            // onClick={() => this.onStaffClickHandle(staffItem)}
            className="ct-manage-staff-item-button border-right"
          >
            <Image src="http://net.huanmusic.com/wx/icon_classify.png" className="ct-manage-staff-item-button-img" />
            <Text className="ct-manage-staff-font ct-manage-staff-font-edit">分类设置</Text>
          </View>
          <View 
            // onClick={() => this.onDeleteHandle()}
            className="ct-manage-staff-item-button"
          >
            <Image src="http://net.huanmusic.com/wx/icon_add.png" className="ct-manage-staff-item-button-img" />
            <Text className="ct-manage-staff-font ct-manage-staff-font-edit">新增商品</Text>
          </View>
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

export default ProductList as ComponentClass<PageOwnProps, PageState>
