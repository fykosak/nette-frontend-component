import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {NetteActions} from '../NetteActions/netteActions';
import {ComponentType} from 'react';

export type mapRegisterCallback = (element: Element, frontendId: string, data: string, actions: NetteActions) => void;

type DataComponent<OwnProps, Data = unknown> = ComponentType<OwnProps & { data: Data }>

type ActionComponent<OwnProps = Record<string, never>, Data = unknown> = ComponentType<OwnProps & { data: Data, actions: NetteActions }>;

interface ComponentDatum<Component extends ComponentType<OwnProps>, OwnProps = Record<string, never>> {
    component: Component;
    params: OwnProps;
}

export default class HashMapLoader {
    private components: {
        [frontendId: string]: ComponentDatum<ComponentType<any>, any>;
    } = {};
    private actionsComponents: {
        [frontendId: string]: ComponentDatum<ActionComponent<any>, any>;
    } = {};

    private dataComponents: {
        [frontendId: string]: ComponentDatum<DataComponent<any>, any>;
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

    public registerActionsComponent<Data = unknown, OwnProps = Record<string, never>>(
        frontendId: string,
        component: ActionComponent<OwnProps, Data>,
        params: OwnProps = null,
    ): void {
        this.checkConflict(frontendId);
        this.actionsComponents[frontendId] = {component, params};
    }

    public registerDataComponent<Data = unknown, OwnProps = Record<string, never>>(
        frontendId: string,
        component: DataComponent<OwnProps, Data>,
        params: OwnProps = null,
    ): void {
        this.checkConflict(frontendId);
        this.dataComponents[frontendId] = {component, params};
    }

    public registerComponent<OwnProps = Record<string, never>>(
        frontendId: string,
        component: ComponentType<OwnProps>,
        params: OwnProps = null,
    ): void {
        this.checkConflict(frontendId);
        this.components[frontendId] = {component, params};
    }

    public render(element: Element): boolean {
        const frontendId = element.getAttribute('data-frontend-id');

        if (this.components.hasOwnProperty(frontendId)) {
            const {component, params} = this.components[frontendId];
            ReactDOM.render(React.createElement(component, params), element);
            return true;
        }

        const rawData = element.getAttribute('data-data');
        const data = JSON.parse(rawData);
        if (this.dataComponents.hasOwnProperty(frontendId)) {
            const {component, params} = this.dataComponents[frontendId];
            ReactDOM.render(React.createElement(component, {data, ...params}), element);
            return true;
        }

        const actionsData = JSON.parse(element.getAttribute('data-actions'));
        const actions = new NetteActions(actionsData);
        if (this.actionsComponents.hasOwnProperty(frontendId)) {
            const {component, params} = this.actionsComponents[frontendId];
            ReactDOM.render(React.createElement(component, {actions, data, ...params}), element);
            return true;
        }

        if (this.apps.hasOwnProperty(frontendId)) {
            this.apps[frontendId](element, frontendId, rawData, actions);
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
