import {DataResponse} from '../Responses/response';
import {NetteActions} from '../NetteActions/nette-actions';

export async function netteFetch<ResponseData>(
    url: string,
    data: BodyInit | null,
): Promise<DataResponse<ResponseData>> {
    const response = await fetch(url, {
        body: data,
        method: 'POST',
    });
    if (response.redirected) {
        window.location.href = response.url;
        return;
    }
    const responseData = await response.json();
    return {
        ...responseData,
        actions: new NetteActions(responseData.actions),
    };
}
