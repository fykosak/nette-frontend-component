import * as React from 'react';
import {connect} from 'react-redux';
import {Action, Dispatch} from 'redux';
import {Response} from '../Responses/response';
import {fetchSuccess} from '../fetch/redux/actions';

interface OwnProps<D> {
    storeMap: Response<D>;
    children: React.ReactNode;
}

interface DispatchProps<D> {
    onInit(data: Response<D>): void;
}

class StoreLoader<D> extends React.Component<OwnProps<D> & DispatchProps<D>, Record<string, never>> {
    public componentDidMount() {
        const {storeMap, onInit} = this.props;
        onInit(storeMap);
    }

    public render() {
        return <>
            {this.props.children}
        </>;
    }
}

function mapDispatchToProps<D>(dispatch: Dispatch<Action<string>>): DispatchProps<D> {
    return {
        onInit: (data) => dispatch(fetchSuccess(data)),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(StoreLoader);
