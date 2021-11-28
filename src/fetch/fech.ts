import {parseResponse} from './redux/netteFetch';
import {RawDataResponse, DataResponse} from '../Responses/response';

export async function netteFetch<ResponseData>(
    url: string,
    data: BodyInit | null,
    success: (data: DataResponse<ResponseData>) => void = () => null,
    error: (error: Response) => void = () => null,
): Promise<DataResponse<ResponseData> | void> {
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
        .then((d: RawDataResponse<ResponseData>) => {
            const parsedResponse = parseResponse<ResponseData>(d);
            success(parsedResponse);
            return parsedResponse;
        }).catch((response: Response) => {
            error(response);
        });
}
