import { Action } from 'redux';

export const ACTION_SET_INITIAL_DATA = '@@input-connector/SET_INITIAL_DATA';

export interface ActionSetInitialData extends Action<string> {
    data: Record<string, number>;
}

export const setInitialData = (data: Record<string, number>): ActionSetInitialData => {
    return {
        data,
        type: ACTION_SET_INITIAL_DATA,
    };
};

export const ACTION_CHANGE_DATA = '@@input-connector/CHANGE_DATA';

export interface ActionChangeData extends Action<string> {
    key: string;
    value: number;
}

export const changeData = (key: string, value: number): ActionChangeData => {
    return {
        key,
        type: ACTION_CHANGE_DATA,
        value,
    };
};
