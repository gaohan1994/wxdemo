
export function createAction(options) {
  const { url, payload, method, fetchOptions, cb, type } = options
  return (dispatch) => {
    // return fetch({ url, payload, method, ...fetchOptions }).then((res) => {
    //   dispatch({ type, payload: cb ? cb(res) : res })
    //   return res
    // })
    return dispatch({type, payload: cb ? cb(payload) : payload});
  }
}
