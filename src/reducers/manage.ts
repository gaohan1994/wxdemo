import { RECEIVE_MANAGE_STAFF, ADD_STAFF, EDIT_STAFF } from '../constants/constants';

type ManageReducer = {
  staffList: any[];
}

const INITIAL_STATE: ManageReducer = {
  staffList: []
}

export default function manage(state = INITIAL_STATE, action) {
  switch(action.type) {
    case RECEIVE_MANAGE_STAFF: {
      const { payload } = action;

      if (payload.page === 1) {
        return {
          ...state,
          staffList: payload.list
        }
      } else {
        return {
          ...state,
          staffList: state.staffList.concat(payload.list)
        }
      }
    }
    case ADD_STAFF: {
      const { payload } = action;
      state.staffList.push(payload)
      return {
        ...state,
        staffList: state.staffList
      }
    }
    case EDIT_STAFF: {
      const { payload } = action;
      const index = state.staffList.findIndex(s => s.id === payload.id);
      if (index !== -1) {
        const newStaffList = state.staffList; 
        newStaffList[index] = payload;
        return {
          ...state,
          staffList: newStaffList
        }
      } else {
        return {
          ...state
        }
      }
    }
    default:
      return state
  }
}
