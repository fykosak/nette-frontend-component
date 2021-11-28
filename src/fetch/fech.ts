import {parseResponse} from './redux/netteFetch';
import {RawResponse, Response} from '../Responses/response';

export async function netteFetch<ResponseData>(
    url: string,
    data: BodyInit | null,
    success: (data: Response<ResponseData>) => void = () => null,
    error: (e: Error | any) => void = () => null,
): Promise<Response<ResponseData> | void> {
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
        .then((d: RawResponse<ResponseData>) => {
            const parsedResponse = parseResponse<ResponseData>(d);
            success(parsedResponse);
            return parsedResponse;
        }).catch((e: Error | any) => {
            error(e);
        });
}
