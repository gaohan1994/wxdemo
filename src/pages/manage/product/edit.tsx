import { ComponentClass } from 'react'
import Taro, { Component, Config } from '@tarojs/taro'
import { View, Text, ScrollView } from '@tarojs/components'
import './index.less'
import { getWindowHeight } from '../../../utils/style';
import { AtInput, AtButton, AtModal } from 'taro-ui';
import invariant from 'invariant';
import * as actions from '../../../actions/manage';
import { connect } from '@tarojs/redux';

type PageStateProps = {
  userInfo: any;
}

type PageDispatchProps = {
  addStaff: (payload: any) => void;
}

type PageOwnProps = {}

type IProps = PageStateProps & PageDispatchProps & PageOwnProps
type State = {
  name: string;
  qrcode: string;
  inventory: string;
  checkInventory: string;
  price: string;
  cancelOpen: boolean;
  confirmOpen: boolean;
}
@connect(state => state.manage, actions)
class ProductList extends Component<IProps, State> {

  /**
   * 指定config的类型声明为: Taro.Config
   *
   * 由于 typescript 对于 object 类型推导只能推出 Key 的基本类型
   * 对于像 navigationBarTextStyle: 'black' 这样的推导出的类型是 string
   * 提示和声明 navigationBarTextStyle: 'black' | 'white' 类型冲突, 需要显示声明类型
   */
  config: Config = {
    navigationBarTitleText: '编辑商品'
  }

  constructor (props: any) {
    super(props);
    const item = this.$router.params && this.$router.params.item && JSON.parse(this.$router.params.item) || {};
    this.state = {
      ...item,
      changeCheckInventory: '',
      cancelOpen: false,
      confirmOpen: false,
    }
  }

  componentWillReceiveProps () {
    
  }

  public onScrollToUpper = () => {

  }

  public changeName = (value: string) => {
    this.setState({ name: value });
  }
  public changeQrcode = (value: string) => {
    this.setState({ qrcode: value });
  }
  public changeInventory = (value: string) => {
    this.setState({ inventory: value });
  }
  public changePrice = (value: string) => {
    this.setState({ price: value });
  }
  public onCancel = () => {
    
  }
  public onConfirm = () => {
    
  }
  public changeCheckInventory = (value: string) => {
    this.setState({checkInventory: value});
  }

  render () {
    return (
      <View className='index'>
        <AtInput
          name="name"
          title="商品名称"
          value={this.state.name}
          onChange={this.changeName}
        />
        <AtInput
          name="qrcode"
          title="商品条码"
          value={this.state.qrcode}
          onChange={this.changeQrcode}
        />
        <AtInput
          name="price"
          title="商品售价"
          value={this.state.price}
          onChange={this.changePrice}
        />
        <AtInput
          name="price"
          title="进货价"
          value={'5.00'}
          disabled={true}
          onChange={this.changePrice}
        />
        <AtInput
          name="inventory"
          title="可用库存"
          value={this.state.inventory}
          onChange={this.changeInventory}
        />
        <AtInput
          name="changeCheckInventory"
          title="预警库存"
          value={this.state.checkInventory}
          onChange={this.changeCheckInventory}
        />

        <View className="ct-button-contaienr">
          <AtButton
            className="ct-button"
            type="primary"
            onClick={this.onConfirm}
          >
            保存
          </AtButton>
        </View>
        <View className="ct-button-contaienr">
          <AtButton
            type="primary"
            className="ct-button ct-button-white"
            onClick={this.onCancel}
          >
            取消
          </AtButton>
        </View>
        {/* <AtModal
          isOpened={this.state.cancelOpen}
          cancelText='取消'
          confirmText='确认'
          onClose={ this.handleClose }
          onCancel={ this.handleCancel }
          onConfirm={ this.handleConfirm }
          content='欢迎加入京东凹凸实验室\n\r欢迎加入京东凹凸实验室'
        /> */}
      </View>
    )
  }
}

export default ProductList;
