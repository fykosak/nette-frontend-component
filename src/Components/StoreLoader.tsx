import * as React from 'react';
import {connect} from 'react-redux';
import {Action, Dispatch} from 'redux';
import {DataResponse} from '../Responses/response';
import {fetchSuccess} from '../fetch/redux/actions';

interface OwnProps<Data> {
    initialData: DataResponse<Data>;
    children: React.ReactNode;
}

interface DispatchProps<Data> {
    onInit(data: DataResponse<Data>): void;
}

class StoreLoader<Data> extends React.Component<OwnProps<Data> & DispatchProps<Data>, Record<string, never>> {
    public componentDidMount() {
        const {initialData, onInit} = this.props;
        onInit(initialData);
    }

    public render() {
        return <>
            {this.props.children}
        </>;
    }
}

function mapDispatchToProps<Data>(dispatch: Dispatch<Action<string>>): DispatchProps<Data> {
    return {
        onInit: (data) => dispatch(fetchSuccess<Data>(data)),
    };
}

export default connect(
    null,
    mapDispatchToProps,
)(StoreLoader);
