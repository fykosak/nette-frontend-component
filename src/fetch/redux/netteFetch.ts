import {Action, Dispatch} from 'redux';
import {fetchFail, fetchStart, fetchSuccess} from './actions';
import {RawResponse, Response} from '../../Responses/response';
import {NetteActions} from '../../NetteActions/netteActions';
import {netteFetch} from '../fech';

export function parseResponse<Data>(rawResponse: RawResponse<Data>): Response<Data> {
    return {
        ...rawResponse,
        actions: new NetteActions(rawResponse.actions),
        data: rawResponse.data,
    };
}


export async function dispatchNetteFetch<ResponseData>(
    url: string,
    dispatch: Dispatch<Action<string>>,
    data: BodyInit | null,
    success: (data: Response<ResponseData>) => void = () => null,
    error: (e: Error | any) => void = () => null,
): Promise<Response<ResponseData> | void> {
    dispatch(fetchStart());
    return netteFetch(url, data, (parsedResponse) => {
        dispatch(fetchSuccess<ResponseData>(parsedResponse));
        success(parsedResponse);
    }, (e) => {
        dispatch(fetchFail(e));
        error(e);
    });
}
