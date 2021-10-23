import { NetteActions } from '../NetteActions/NetteActions';

export interface Message {
    level: string;
    text: string;
}

export interface RawResponse {
    actions: string;
    data: string;
    messages: Message[];
}

export interface Response<D> {
    actions: NetteActions;
    data: D;
    messages: Message[];
}
