import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch} from 'react-redux';
import {DataResponse} from '../Responses/response';
import {fetchSuccess} from '../fetch/redux/actions';

interface OwnProps<Data> {
    initialData: DataResponse<Data>;
}

export default function StoreLoader<Data>({initialData, children}: React.PropsWithChildren<OwnProps<Data>>) {
    const dispatch = useDispatch();
    useEffect(() => {
        dispatch(fetchSuccess<Data>(initialData));
    }, []);
    return <>
        {children}
    </>;
}
