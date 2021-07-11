import * as types from '../actionTypes';

const toDoReducer = (state, action) => {
    switch (action.type) {
        case types.SET_FILTER_VALUE:
            return {
                ...state,
                filter: action.filterValue,
            };

        case types.SET_EDITABLE:
            return {
                ...state,
                isEditable: action.valueEditable,
            };

        default:
            return state
    }
};

export default toDoReducer;
