import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {NetteActions} from '../NetteActions/netteActions';

export type mapRegisterCallback = (element: Element, frontendId: string, data: string, actions: NetteActions) => void;

interface RegisteredComponent<O = any> {
    component: React.ComponentClass<O>;
    params: O;
}

interface RegisteredDataComponent<O = any, D = any> {
    component: React.ComponentClass<O & { data: D }>;
    params: O;
}

interface RegisteredActionComponent<O = any, D = any> {
    component: React.ComponentClass<O & { data: D; actions: NetteActions }>;
    params: O;
}

export default class HashMapLoader {
    private components: {
        [frontendId: string]: RegisteredComponent;
    } = {};
    private actionsComponents: {
        [frontendId: string]: RegisteredActionComponent;
    } = {};

    private dataComponents: {
        [frontendId: string]: RegisteredDataComponent;
    } = {};
    private apps: {
        [frontendId: string]: mapRegisterCallback;
    } = {};
    private keys: {
        [frontendId: string]: boolean;
    } = {};

    public register(frontendId: string, callback: mapRegisterCallback): void {
        this.checkConflict(frontendId);
        this.apps[frontendId] = callback;
    }

    public registerActionsComponent<T = any, P = Record<string, never>>(
        frontendId: string,
        component: React.ComponentClass<{ actions: NetteActions; data: T } & P>,
        params: P = null,
    ): void {
        this.checkConflict(frontendId);
        this.actionsComponents[frontendId] = {component, params};
    }

    public registerDataComponent<T = any, P = Record<string, never>>(
        frontendId: string,
        component: React.ComponentClass<{ data: T } & P>,
        params: P = null,
    ): void {
        this.checkConflict(frontendId);
        this.dataComponents[frontendId] = {component, params};
    }

    public registerComponent<P = Record<string, never>>(
        frontendId: string,
        component: React.ComponentClass<P>,
        params: P = null,
    ): void {
        this.checkConflict(frontendId);
        this.components[frontendId] = {component, params};
    }

    public render(element): boolean {
        const frontendId = element.getAttribute('data-frontend-id');
        const rawData = element.getAttribute('data-data');
        const actionsData = JSON.parse(element.getAttribute('data-actions'));
        const actions = new NetteActions(actionsData);

        const data = JSON.parse(rawData);
        if (this.apps.hasOwnProperty(frontendId)) {
            this.apps[frontendId](element, frontendId, rawData, actions);
            return true;
        }
        if (this.actionsComponents.hasOwnProperty(frontendId)) {
            const {component, params} = this.actionsComponents[frontendId];
            ReactDOM.render(React.createElement(component, {actions, data, ...params}), element);
            return true;
        }
        if (this.dataComponents.hasOwnProperty(frontendId)) {
            const {component, params} = this.dataComponents[frontendId];
            ReactDOM.render(React.createElement(component, {data, ...params}), element);
            return true;
        }
        if (this.components.hasOwnProperty(frontendId)) {
            const {component, params} = this.components[frontendId];
            ReactDOM.render(React.createElement(component, params), element);
            return true;
        }
        return false;
    }

    private checkConflict(frontendId: string): void {
        if (this.keys.hasOwnProperty(frontendId)) {
            throw new Error('App with "' + frontendId + '" is already registred.');
        }
        this.keys[frontendId] = true;
    }
}
