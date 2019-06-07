import React, {useReducer} from 'react';
import AlertContext from './alertContext';
import AlertReducer from './alertReducer';

import {
    SET_ALERT,
    REMOVE_ALERT
} from '../type';

const AlertState = props => {
    const initalState = null;

    const [state, dispatch] = useReducer(AlertReducer, initalState);

    // Set Alert
    const setAlert = (msg, type) => {
        dispatch({
            type: SET_ALERT,
            payload: { msg, type }
        });

        setTimeout(() => dispatch({type: REMOVE_ALERT}), 1000);
    }

    return <AlertContext.Provider
        value={{
            alert: state,
            setAlert,
        }}
    >
        {props.children}
    </AlertContext.Provider>
}

export default AlertState;