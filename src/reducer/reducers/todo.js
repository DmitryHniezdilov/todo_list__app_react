import * as types from '../actionTypes';

const toDoReducer = (state, action) => {
    switch (action.type) {
        case types.SET_TODO_DATA:
            return {
                ...state,
                todoData: action.todoData,
            };

        case types.SET_FILTER_VALUE:
            return {
                ...state,
                filter: action.filterValue,
            };

        case types.SET_IS_EDITABLE:
            return {
                ...state,
                isEditable: action.isEditable,
            };

        case types.SET_EDITABLE_ID:
            return {
                ...state,
                editableId: action.editableId,
            };

        case types.SET_TERM:
            return {
                ...state,
                term: action.term,
            };

        default:
            return state
    }
};

export default toDoReducer;
