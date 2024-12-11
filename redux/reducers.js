const SET_ERRORS = 'SET_ERRORS';

const initialState = {
  errors:[]
};


export const countErrors = (state = initialState,action) => {
  switch (action.type) {
    case SET_ERRORS:
        alert ("hshshsh")
      return { ...state, errors:[...state.errors,action.payload] };    
    default:
      return state;
  }
};
