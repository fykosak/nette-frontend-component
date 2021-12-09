import {Action, Dispatch} from 'redux';
import {fetchFail, fetchStart, fetchSuccess} from './actions';
import {DataResponse} from '../../Responses/response';
import {netteFetch} from '../fech';

export async function dispatchNetteFetch<ResponseData>(
    url: string,
    dispatch: Dispatch<Action<string>>,
    data: BodyInit | null,
): Promise<DataResponse<ResponseData>> {
    dispatch(fetchStart());

    try {
        const responseData = await netteFetch<ResponseData>(url, data);
        dispatch(fetchSuccess<ResponseData>(responseData));
        return responseData;
    } catch (exception) {
        dispatch(fetchFail(exception));
        throw exception;
    }
}
