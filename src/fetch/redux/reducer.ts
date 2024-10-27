import {
    ACTION_FETCH_FAIL,
    ACTION_FETCH_START,
    ACTION_FETCH_SUCCESS,
    ActionFetchFail,
    ActionFetchSuccess,
} from './actions';
import {NetteActions} from '../../NetteActions/nette-actions';
import {Message, DataResponse} from '../../Responses/response';
import {Action, Reducer} from 'redux';

export interface FetchStateMap {
    submitting?: boolean;
    error?: Response | string | number | Error;
    messages: Message[];
    actions?: NetteActions;
    initialLoaded: boolean;
}

export type AllowedActions = ActionFetchSuccess<DataResponse<unknown>> | ActionFetchFail | Action<string>;

export const fetchReducer: Reducer<FetchStateMap, AllowedActions> = <Data>(state = {
    initialLoaded: false,
    messages: [],
}, action) => {
    switch (action.type) {
        case ACTION_FETCH_START:
            return fetchStart(state);
        case ACTION_FETCH_FAIL:
            return fetchFail(state, <ActionFetchFail>action);
        case ACTION_FETCH_SUCCESS:
            return fetchSuccess<Data>(state, <ActionFetchSuccess<DataResponse<Data>>>action);
        default:
            return state;
    }
};

const fetchStart = (state: FetchStateMap): FetchStateMap => {
    return {
        ...state,
        error: null,
        messages: [],
        submitting: true,
    };
};
const fetchFail = (state: FetchStateMap, action: ActionFetchFail): FetchStateMap => {
    return {
        ...state,
        error: action.error,
        messages: [{
            level: 'danger',
            text: action.error.toString(),
        }],
        submitting: false,
    };
};

const fetchSuccess = <Data>(state: FetchStateMap, action: ActionFetchSuccess<DataResponse<Data>>): FetchStateMap => {
    return {
        ...state,
        actions: action.data.actions,
        initialLoaded: true,
        messages: action.data.messages,
        submitting: false,
    };
};

