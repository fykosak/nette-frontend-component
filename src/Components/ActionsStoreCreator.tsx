import * as React from 'react';
import {Action, Reducer} from 'redux';
import {DataResponse} from '../Responses/response';
import StoreCreator from './StoreCreator';
import StoreLoader from './StoreLoader';

interface OwnProps<Store, Data> {
    initialData: DataResponse<Data>;
    app: Reducer<Store, Action<string>>;
}

export default class ActionsStoreCreator<Store, Data> extends React.Component<OwnProps<Store, Data>, Record<string, never>> {

    public render() {
        const {initialData, app} = this.props;
        return <StoreCreator app={app}>
            <StoreLoader initialData={initialData}>{this.props.children}</StoreLoader>
        </StoreCreator>;
    }
}
