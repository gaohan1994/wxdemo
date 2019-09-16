import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import './index.less'
import * as actions from '../../../../actions/manage';
import { connect } from '@tarojs/redux';

type IProps = {
  menu: any[];
}

type State = {
  selected: string;
}

@connect(state => state.manage, actions)
class Menu extends Component<IProps, State> {

  constructor (props: any) {
    super(props);
    this.state = {
      selected: '冠军面包'
    }
  }

    /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */

  componentWillReceiveProps () {
    
  }

  public onScrollToUpper = () => {

  }

  public changeSelected = (value: string) => {
    this.setState({ selected: value });
  }

  render () {
    const { menu } = this.props;
    return (
      <View>
        {
          menu && menu.length > 0 ? menu.map((item) => {
            const active = item.name === this.state.selected
            return (
              <View 
                key={item.name}
                onClick={() => this.changeSelected(item.name)}
                className={`ct-product-list-menu-item ${active === true ? 'ct-product-list-menu-item-active' : ''}`}
              >
                {active === true && (<View className="ct-product-list-menu-item-bge" />)}
                <Text className={`ct-product-list-menu-name ${active === true ? 'ct-product-list-menu-name-active' : ''}`}>{item.name}</Text>
              </View>
            )
          }) : (
            <View />
          )
        }
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

export default Menu;
