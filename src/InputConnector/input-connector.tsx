import {setInitialData} from './actions';
import * as React from 'react';
import {useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux';
import {InputConnectorStateMap} from './reducer';

export interface OwnProps {
    input: HTMLInputElement;
}

export default function InputConnector({input}: OwnProps) {
    const values = useSelector((state: { inputConnector: InputConnectorStateMap }) => state.inputConnector?.data);
    const newData = {};
    const dispatch = useDispatch();
    useEffect(() => {
        if (input.value) {
            dispatch(setInitialData(JSON.parse(input.value)));
        }
    }, []);
    useEffect(() => {
        let hasValue = false;
        for (const key in values) {
            if (values.hasOwnProperty(key) && (values[key] !== null)) {
                newData[key] = values[key];
                hasValue = true;
            }
        }
        input.value = hasValue ? JSON.stringify(newData) : null;
        input.dispatchEvent(new Event('change')); // netteForm compatibility

    }, [values]);
    return null;
}
