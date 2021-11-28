import * as React from 'react';
import {Action, Reducer} from 'redux';
import {DataResponse} from '../Responses/response';
import StoreCreator from './StoreCreator';
import StoreLoader from './StoreLoader';

interface OwnProps<Store, Data> {
    storeMap: DataResponse<Data>;
    app: Reducer<Store, Action<string>>;
}

export default class ActionsStoreCreator<Store, Data> extends React.Component<OwnProps<Store, Data>, Record<string, never>> {

    public render() {
        const {storeMap, app} = this.props;
        return <StoreCreator app={app}>
            <StoreLoader storeMap={storeMap}>{this.props.children}</StoreLoader>
        </StoreCreator>;
    }
}
