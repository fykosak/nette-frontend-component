import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {DataResponse} from '../Responses/response';
import {fetchSuccess} from '../fetch/redux/actions';

interface OwnProps<Data> {
    initialData: DataResponse<Data>;
    children: React.ReactNode;
}

export default function StoreLoader<Data>({initialData, children}: OwnProps<Data>) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSuccess<Data>(initialData));
    }, []);
    return <>
        {children}
    </>;
}
