import { Action } from 'redux';
import {Response} from '../../Responses/response';

export interface ActionFetchSuccess<Data> extends Action<string> {
    data: Data;
}

export const ACTION_FETCH_SUCCESS = '@@fetch-api/ACTION_FETCH_SUCCESS';

export function fetchSuccess<Data>(data: Response<Data>): ActionFetchSuccess<Response<Data>> {
    return {
        data,
        type: ACTION_FETCH_SUCCESS,
    };
}

export interface ActionFetchFail extends Action<string> {
    error: Error | any;
}

export const ACTION_FETCH_FAIL = '@@fetch-api/ACTION_FETCH_FAIL';

export const fetchFail = (error: Error | any): ActionFetchFail => {
    return {
        error,
        type: ACTION_FETCH_FAIL,
    };
};

export const ACTION_FETCH_START = '@@fetch-api/ACTION_FETCH_START';
export const fetchStart = (): Action<string> => {
    return {
        type: ACTION_FETCH_START,
    };
};
