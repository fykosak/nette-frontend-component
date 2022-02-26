import {
    ACTION_CHANGE_DATA,
    ACTION_SET_INITIAL_DATA,
    ActionChangeData,
    ActionSetInitialData,
} from './actions';
import {Reducer} from 'redux';

export interface InputConnectorStateMap {
    data: Record<string, number>;
    initialData: Record<string, number>;
}

export type AllowedActions = ActionChangeData | ActionSetInitialData;

export const inputConnectorReducer: Reducer<InputConnectorStateMap, AllowedActions> = (state = {
    data: {},
    initialData: {},
}, action): InputConnectorStateMap => {
    switch (action.type) {
        case ACTION_CHANGE_DATA:
            return setData(state, <ActionChangeData>action);
        case ACTION_SET_INITIAL_DATA:
            return setInitialData(state, <ActionSetInitialData>action);
        default:
            return state;
    }
};

const setData = (state: InputConnectorStateMap, action: ActionChangeData): InputConnectorStateMap => {
    return {
        ...state,
        data: {
            ...state.data,
            [action.key]: action.value,
        },
    };
};

const setInitialData = (state: InputConnectorStateMap, action: ActionSetInitialData): InputConnectorStateMap => {
    if (action.data) {
        return {
            ...state,
            data: action.data,
            initialData: action.data,
        };
    }
    return state;
};


