import * as React from 'react';
import {Provider} from 'react-redux';
import {
    Action,
    applyMiddleware,
    createStore, Reducer,
} from 'redux';
import logger from 'redux-logger';

interface OwnProps<S> {
    app: Reducer<S, Action<string>>;
    dev?: boolean;
}

export default class StoreCreator<S> extends React.Component<OwnProps<S>, Record<string, never>> {
    public render() {
        const {app, dev} = this.props;
        const store = dev === true ? createStore(app, applyMiddleware(logger)) : createStore(app);

        return <Provider store={store}>
            {this.props.children}
        </Provider>;
    }
}
