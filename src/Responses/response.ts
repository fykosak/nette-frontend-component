import {NetteActions} from '../NetteActions/nette-actions';

export interface Message {
    level: string;
    text: string;
}

export interface DataResponse<Data> {
    actions: NetteActions;
    data: Data;
    messages: Message[];
}
