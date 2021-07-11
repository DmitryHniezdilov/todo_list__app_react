import React, {useReducer} from 'react';
import ReactDOM from 'react-dom';
import {initialState} from "./reducer/state";
import {Context} from "./context";
import toDoReducer from "./reducer/reducers/todo";
import App from './components/app';
import {createTodoItem, localStorageHelper} from "./utils";
import './index.css';

const InitContext = () => {
    const [state, dispatch] = useReducer(toDoReducer, initialState, init);

    function init(state) {
        const initialTodoData = localStorageHelper.load() || [createTodoItem('Make Awesome App')];
        return {
            ...state,
            todoData: initialTodoData,
        }
    }

    return (
        <Context.Provider value={{dispatch, state}}>
            <App/>
        </Context.Provider>
    )
};

ReactDOM.render(
    <React.StrictMode>
        <InitContext/>
    </React.StrictMode>,
    document.getElementById('root')
);
