// eslint-disable-next-line import/no-anonymous-default-export
export default (state, action) => {
  switch(action.type) {
    case 'GET USERS':
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null
      }

    case 'GET A USER':
      return {
        ...state,
        loading: false,
        users: action.payload,
        error: null
      }  

    case 'ADD USER':
      return {
        ...state,
        loading: false,
        error: null,
        users: [action.payload, ...state.users]
      }
    
    case 'GET TRANSACTIONS':
      return {
        ...state,
        loading: false,
        error: null,
        transactions: action.payload
      }  

    case 'ADD TRANSACTION':
      return {
        ...state,
        loading: false,
        error: null,
        transactions: [action.payload, ...state.transactions]
      }  

    case 'TRANSACTION ERROR':
      return {
        ...state,
        error: action.payload
      }  

    case 'USER ERROR':
      return {
        ...state,
        error: action.payload
      }  
    default:
      return state;
  }
}