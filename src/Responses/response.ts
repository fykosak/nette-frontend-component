import {NetteActions, NetteActionsData} from '../NetteActions/netteActions';

export interface Message {
    level: string;
    text: string;
}

export interface RawDataResponse<Data> {
    actions: NetteActionsData;
    data: Data;
    messages: Message[];
}

export interface DataResponse<Data> {
    actions: NetteActions;
    data: Data;
    messages: Message[];
}
