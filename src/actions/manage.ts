import { createAction } from '../utils/redux';
import { RECEIVE_MANAGE_STAFF, ADD_STAFF, EDIT_STAFF } from '../constants/constants';

const names = ['张三', '李四', '王五', '赵六', '钱七', '孙八', '杨九', '吴十', '林二'];
const phones = ['15659990001=0', '15659990001', '15659990002' ,'15659990003' ,'15659990004' ,'15659990005' ,'15659990006' ,'15659990007' ,'15659990008' ,'15659990009'];


class Staff {

  private name: string;
  private phone: string;
  private id: string;

  constructor (options: any = {}) {
    const { name, phone } = options;
    this.name = name || names[Math.abs(Math.ceil(Math.random() * names.length))];
    this.phone = phone || phones[Math.abs(Math.ceil(Math.random() * phones.length))];
    this.id = this.generateId();
  }

  generatePhone = () => {
    let phone = '';
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.ceil(Math.random() * 9);
      phone += `${randomNum}`;
    }
    return phone;
  }

  generateId = () => {
    let id = '';
    for (let i = 0; i < 10; i++) {
      const randomNum = Math.ceil(Math.random() * 9);
      id += `${randomNum}`;
    }
    return id;
  }
}

export const fetchStaff = (payload) => createAction({
  type: RECEIVE_MANAGE_STAFF,
  payload: {
    ...payload,
    list: new Array(3).fill({}).map(() => {
      return new Staff();
    })
  }
});

export const receiveStaff = (payload) => createAction({
  type: RECEIVE_MANAGE_STAFF,
  payload: {
    list: payload,
    page: 1
  }
})

export const addStaff = (payload) => createAction({
  type: ADD_STAFF,
  payload: new Staff(payload)
});

export const editStaff = (payload) => createAction({
  type: EDIT_STAFF,
  payload
});