import * as React from 'react';
import {FunctionComponent} from 'react';
import {createRoot} from 'react-dom/client';
import {NetteActions} from '../NetteActions/nette-actions';

export type mapRegisterCallback = (element: Element, frontendId: string, data: string, actions: NetteActions) => void;

type DataComponent<OwnProps = unknown, Data = unknown> = FunctionComponent<OwnProps & { data: Data }>;

type ActionComponent<OwnProps = unknown, Data = unknown> = FunctionComponent<OwnProps & { data: Data, actions: NetteActions }>;

interface ComponentDatum<OwnProps = unknown, Component extends FunctionComponent<OwnProps> = FunctionComponent<OwnProps>> {
    component: Component;
    params: OwnProps;
}

export default class HashMapLoader {
    private components: { [key: string]: ComponentDatum<unknown, FunctionComponent> } = {};
    private actionsComponents: { [key: string]: ComponentDatum<unknown, ActionComponent> } = {};
    private dataComponents: { [key: string]: ComponentDatum<unknown, DataComponent> } = {};
    private apps: Record<string, mapRegisterCallback> = {};
    private keys: Record<string, boolean> = {};

    public register(frontendId: string, callback: mapRegisterCallback): void {
        this.checkConflict(frontendId);
        this.apps[frontendId] = callback;
    }

    public registerActionsComponent<Data = unknown, OwnProps = unknown>(
        frontendId: string,
        component: ActionComponent<OwnProps, Data>,
        params: OwnProps = null,
    ): void {
        this.checkConflict(frontendId);
        this.actionsComponents[frontendId] = {component, params};
    }

    public registerDataComponent<Data = unknown, OwnProps = unknown>(
        frontendId: string,
        component: DataComponent<OwnProps, Data>,
        params: OwnProps = null,
    ): void {
        this.checkConflict(frontendId);
        this.dataComponents[frontendId] = {component, params};
    }

    public registerComponent<OwnProps = Record<string, never>>(
        frontendId: string,
        component: FunctionComponent<OwnProps>,
        params: OwnProps = null,
    ): void {
        this.checkConflict(frontendId);
        this.components[frontendId] = {component, params};
    }

    public render(element: Element): boolean {
        const root = createRoot(element);
        const frontendId = element.getAttribute('data-frontend-id');

        if (Object.hasOwn(this.components, frontendId)) {
            const {component, params} = this.components[frontendId];
            root.render(React.createElement(component, params));
            return true;
        }

        const rawData = element.getAttribute('data-data');
        const data = JSON.parse(rawData);
        if (Object.hasOwn(this.dataComponents, frontendId)) {
            const {component, params} = this.dataComponents[frontendId];
            // @ts-ignore
            root.render(React.createElement(component, {data, ...params}));
            return true;
        }

        const actionsData = JSON.parse(element.getAttribute('data-actions'));
        const actions = new NetteActions(actionsData);
        if (Object.hasOwn(this.actionsComponents, frontendId)) {
            const {component, params} = this.actionsComponents[frontendId];
            // @ts-ignore
            root.render(React.createElement(component, {actions, data, ...params}));
            return true;
        }

        if (Object.hasOwn(this.apps, frontendId)) {
            this.apps[frontendId](element, frontendId, rawData, actions);
            return true;
        }
        return false;
    }

    private checkConflict(frontendId: string): void {
        if (Object.hasOwn(this.keys, frontendId)) {
            throw new Error('App with "' + frontendId + '" is already registred.');
        }
        this.keys[frontendId] = true;
    }
}
