import {NetteActions, NetteActionsData} from '../NetteActions/netteActions';

export interface Message {
    level: string;
    text: string;
}

export interface RawResponse<Data> {
    actions: NetteActionsData;
    data: Data;
    messages: Message[];
}

export interface Response<Data> {
    actions: NetteActions;
    data: Data;
    messages: Message[];
}
