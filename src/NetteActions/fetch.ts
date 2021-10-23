import { NetteActions } from './NetteActions';
import { fetchFail, fetchStart, fetchSuccess } from '../Fetch/actions';
import { RawResponse, Response } from '../Responses/response';
import { Action, Dispatch } from 'redux';

export function parseResponse<Data>(rawResponse: RawResponse): Response<Data> {
    return {
        ...rawResponse,
        actions: new NetteActions(JSON.parse(rawResponse.actions)),
        data: JSON.parse(rawResponse.data),
    };
}

export async function dispatchFetch<ResponseData>(
    url: string,
    dispatch: Dispatch<Action<string>>,
    data: BodyInit | null,
    success: (data: Response<ResponseData>) => void = () => null,
    error: (e: Error | any) => void = () => null,
): Promise<Response<ResponseData> | void> {
    dispatch(fetchStart());
    return fetch(url, {
        body: data,
        method: 'POST',
    })
        .then((response) => {
            if (response.redirected) {
                window.location.href = response.url;
                throw new Error();
            }
            return response.json();
        })
        .then((d: RawResponse) => {
            const parsedResponse = parseResponse<ResponseData>(d);
            dispatch(fetchSuccess<ResponseData>(parsedResponse));
            success(parsedResponse);
            return parsedResponse;
        }).catch((e: Error | any) => {
            dispatch(fetchFail(e));
            error(e);
        });
}
