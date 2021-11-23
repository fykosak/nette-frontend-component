import * as React from 'react';
import {Action, Reducer} from 'redux';
import {Response} from '../Responses/response';
import StoreCreator from './StoreCreator';
import StoreLoader from './StoreLoader';

interface OwnProps<S, D> {
    storeMap: Response<D>;
    app: Reducer<S, Action<string>>;
}

export default class ActionsStoreCreator<S, D> extends React.Component<OwnProps<S, D>, Record<string, never>> {

    public render() {
        const {storeMap, app} = this.props;
        return <StoreCreator app={app}>
            <StoreLoader storeMap={storeMap}>{this.props.children}</StoreLoader>
        </StoreCreator>;
    }
}
