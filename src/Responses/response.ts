import {NetteActions} from '../NetteActions/netteActions';

export interface Message {
    level: string;
    text: string;
}

export interface DataResponse<Data> {
    actions: NetteActions;
    data: Data;
    messages: Message[];
}
