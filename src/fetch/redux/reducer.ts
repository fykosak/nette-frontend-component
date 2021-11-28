import {
    ACTION_FETCH_FAIL,
    ACTION_FETCH_START,
    ACTION_FETCH_SUCCESS,
    ActionFetchFail,
    ActionFetchSuccess,
} from './actions';
import {NetteActions} from '../../NetteActions/netteActions';
import {Message, Response} from '../../Responses/response';
import {Action} from 'redux';

export interface FetchApiState<> {
    submitting?: boolean;
    error?: Error | any;
    messages: Message[];
    actions?: NetteActions;
    initialLoaded: boolean;
}

const fetchStart = (state: FetchApiState): FetchApiState => {
    return {
        ...state,
        error: null,
        messages: [],
        submitting: true,
    };
};
const fetchFail = (state: FetchApiState, action: ActionFetchFail): FetchApiState => {
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

function fetchSuccess<Data = any>(state: FetchApiState, action: ActionFetchSuccess<Response<Data>>): FetchApiState {
    return {
        ...state,
        actions: action.data.actions,
        initialLoaded: true,
        messages: action.data.messages,
        submitting: false,
    };
}

const initState: FetchApiState = {
    initialLoaded: false,
    messages: [],
};

export function fetchApi<Data = Record<string, never>>(state: FetchApiState = initState, action: Action<string>): FetchApiState {
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
