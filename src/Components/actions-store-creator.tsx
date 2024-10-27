import * as React from 'react';
import {Action, Reducer} from 'redux';
import {DataResponse} from '../Responses/response';
import StoreCreator from './store-creator';
import StoreLoader from './store-loader';

interface OwnProps<Store, Data> {
    initialData: DataResponse<Data>;
    app: Reducer<Store, Action<string>>;
}

export default function ActionsStoreCreator<Store, Data>(
    {
        initialData,
        app,
        children,
    }: React.PropsWithChildren<OwnProps<Store, Data>>,
) {
    return <StoreCreator app={app}>
        <StoreLoader initialData={initialData}>{children}</StoreLoader>
    </StoreCreator>;
}
