import {Action} from 'redux';
import {DataResponse} from '../../Responses/response';

export interface ActionFetchSuccess<Data> extends Action<string> {
    data: Data;
}

export const ACTION_FETCH_SUCCESS = '@@nette-fetch/SUCCESS';

export function fetchSuccess<Data>(data: DataResponse<Data>): ActionFetchSuccess<DataResponse<Data>> {
    return {
        data,
        type: ACTION_FETCH_SUCCESS,
    };
}

export interface ActionFetchFail extends Action<string> {
    error: Response | string | number | Error;
}

export const ACTION_FETCH_FAIL = '@@nette-fetch/FAIL';

export const fetchFail = (error: Response | string | number | Error): ActionFetchFail => {
    return {
        error,
        type: ACTION_FETCH_FAIL,
    };
};

export const ACTION_FETCH_START = '@@nette-fetch/START';
export const fetchStart = (): Action<string> => {
    return {
        type: ACTION_FETCH_START,
    };
};
