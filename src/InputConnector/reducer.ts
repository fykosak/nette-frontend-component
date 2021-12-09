import {
    ACTION_CHANGE_DATA,
    ACTION_SET_INITIAL_DATA,
    ActionChangeData,
    ActionSetInitialData,
} from './actions';

export interface InputConnectorReducer {
    data: Record<string, number>;
    initialData: Record<string, number>;
}

export interface Store {
    inputConnector: InputConnectorReducer;
}

const setData = (state: InputConnectorReducer, action: ActionChangeData): InputConnectorReducer => {
    return {
        ...state,
        data: {
            ...state.data,
            [action.key]: action.value,
        },
    };
};

const setInitialData = (state: InputConnectorReducer, action: ActionSetInitialData): InputConnectorReducer => {
    if (action.data) {
        return {
            ...state,
            data: action.data,
            initialData: action.data,
        };
    }
    return state;
};

export const inputConnectorReducer = (state: InputConnectorReducer = {
    data: {},
    initialData: {},
}, action): InputConnectorReducer => {
    switch (action.type) {
        case ACTION_CHANGE_DATA:
            return setData(state, action);
        case ACTION_SET_INITIAL_DATA:
            return setInitialData(state, action);
        default:
            return state;
    }
};
