import {Action, Dispatch} from 'redux';
import {fetchFail, fetchStart, fetchSuccess} from './actions';
import {RawDataResponse, DataResponse} from '../../Responses/response';
import {NetteActions} from '../../NetteActions/netteActions';
import {netteFetch} from '../fech';

export function parseResponse<Data>(rawResponse: RawDataResponse<Data>): DataResponse<Data> {
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
    success: (data: DataResponse<ResponseData>) => void = () => null,
    error: (e: Response) => void = () => null,
): Promise<DataResponse<ResponseData> | void> {
    dispatch(fetchStart());
    return netteFetch(url, data, (parsedResponse) => {
        dispatch(fetchSuccess<ResponseData>(parsedResponse));
        success(parsedResponse);
    }, (e: Response) => {
        dispatch(fetchFail(e));
        error(e);
    });
}
