import * as React from 'react';
import {Provider} from 'react-redux';
import {Action, applyMiddleware, createStore, Reducer} from 'redux';
import logger from 'redux-logger';

interface OwnProps<Store> {
    app: Reducer<Store, Action<string>>;
    dev?: boolean;
    children: React.ReactNode;
}

export default function StoreCreator<Store>({app, dev, children}: OwnProps<Store>) {
    const store = dev === dev ? createStore(app, applyMiddleware(logger)) : createStore(app);
    return <Provider store={store}>
        {children}
    </Provider>;
}
