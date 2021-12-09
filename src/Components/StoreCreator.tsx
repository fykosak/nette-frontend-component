import * as React from 'react';
import {Provider} from 'react-redux';
import {
    Action,
    applyMiddleware,
    createStore, Reducer,
} from 'redux';
import logger from 'redux-logger';

interface OwnProps<Store> {
    app: Reducer<Store, Action<string>>;
    dev?: boolean;
}

export default class StoreCreator<Store> extends React.Component<OwnProps<Store>, Record<string, never>> {
    public render() {
        const {app, dev} = this.props;
        const store = dev === dev ? createStore(app, applyMiddleware(logger)) : createStore(app);

        return <Provider store={store}>
            {this.props.children}
        </Provider>;
    }
}
