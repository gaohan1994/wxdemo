import { createAction } from '../utils/redux';
import { RECEIVE_MANAGE_STAFF, ADD_STAFF, EDIT_STAFF } from '../constants/constants';

class Staff {

  private name: string;
  private phone: string;
  private id: string;

  constructor (options: any = {}) {
    const { name, phone } = options;
    this.name = name || `Name-${Math.ceil(Math.random() * 100)}`;
    this.phone = phone || this.generatePhone();
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