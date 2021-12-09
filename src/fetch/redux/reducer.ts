import {
    ACTION_FETCH_FAIL,
    ACTION_FETCH_START,
    ACTION_FETCH_SUCCESS,
    ActionFetchFail,
    ActionFetchSuccess,
} from './actions';
import {NetteActions} from '../../NetteActions/netteActions';
import {Message, DataResponse} from '../../Responses/response';
import {Action} from 'redux';

export interface FetchReducer {
    submitting?: boolean;
    error?: Response | string | number | Error;
    messages: Message[];
    actions?: NetteActions;
    initialLoaded: boolean;
}

const fetchStart = (state: FetchReducer): FetchReducer => {
    return {
        ...state,
        error: null,
        messages: [],
        submitting: true,
    };
};
const fetchFail = (state: FetchReducer, action: ActionFetchFail): FetchReducer => {
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

function fetchSuccess<Data>(state: FetchReducer, action: ActionFetchSuccess<DataResponse<Data>>): FetchReducer {
    return {
        ...state,
        actions: action.data.actions,
        initialLoaded: true,
        messages: action.data.messages,
        submitting: false,
    };
}

const initState: FetchReducer = {
    initialLoaded: false,
    messages: [],
};

export function fetchReducer<Data>(state: FetchReducer = initState, action: Action<string>): FetchReducer {
    switch (action.type) {
        case ACTION_FETCH_START:
            return fetchStart(state);
        case ACTION_FETCH_FAIL:
            // @ts-ignore
            return fetchFail(state, action);
        case ACTION_FETCH_SUCCESS:
            // @ts-ignore
            return fetchSuccess<Data>(state, action);
        default:
            return state;
    }
}
