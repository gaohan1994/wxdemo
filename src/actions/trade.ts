import { createAction } from '../utils/redux';
import { RECEIVE_TRADE_HISTORY } from '../constants/constants';

class Trade {
  private id: number;
  private totalNumber: number;
  private totalMoney: number;
  private trandeList: any[];
  constructor (options: any = {}) {
    this.id = options.id || Math.round(Math.random() * 100);
    this.totalNumber = options.totalNumber || Math.round(Math.random() * 10);
    this.totalMoney = options.totalMoney || Math.round(Math.random() * 100);
    this.trandeList = options.trandeList || new Array(Math.round(Math.random() * 10)).fill({}).map(() => {
      return {
        way: Math.random() * 10 > 5 ? 'alipay' : 'wechat',
        type: Math.random() * 10 > 5 ? 1 : 0,
        time: '09:40:22',
        money: Math.round(Math.random() * 20)
      };
    })
  }
}

export const fetchTradeHistory = (payload: any) => createAction({
  type: RECEIVE_TRADE_HISTORY,
  payload: {
    ...payload,
    list: new Array(5).fill({}).map(() => {
      return new Trade();
    })
  }
});