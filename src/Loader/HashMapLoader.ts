import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {NetteActions} from '../NetteActions/netteActions';

export type mapRegisterCallback = (element: Element, frontendId: string, data: string, actions: NetteActions) => void;

type Component<Props = any> = React.ComponentClass<Props> | React.FunctionComponent<Props>;

type DataComponent<OwnProps = any, Data = any> = Component<OwnProps & { data: Data }>

type ActionComponent<OwnProps = any, Data = any> = DataComponent<OwnProps & { actions: NetteActions }, Data>;

interface ComponentDatum<ComponentType extends Component<OwnProps>, OwnProps = any> {
    component: ComponentType;
    params: OwnProps;
}

export default class HashMapLoader {
    private components: {
        [frontendId: string]: ComponentDatum<Component>;
    } = {};
    private actionsComponents: {
        [frontendId: string]: ComponentDatum<ActionComponent>;
    } = {};

    private dataComponents: {
        [frontendId: string]: ComponentDatum<DataComponent>;
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

    public registerActionsComponent<Data = any, OwnProps = {}>(
        frontendId: string,
        component: ActionComponent<OwnProps, Data>,
        params: OwnProps = null,
    ): void {
        this.checkConflict(frontendId);
        this.actionsComponents[frontendId] = {component, params};
    }

    public registerDataComponent<Data = any, OwnProps = {}>(
        frontendId: string,
        component: DataComponent<OwnProps, Data>,
        params: OwnProps = null,
    ): void {
        this.checkConflict(frontendId);
        this.dataComponents[frontendId] = {component, params};
    }

    public registerComponent<OwnProps = {}>(
        frontendId: string,
        component: Component<OwnProps>,
        params: OwnProps = null,
    ): void {
        this.checkConflict(frontendId);
        this.components[frontendId] = {component, params};
    }

    public render(element): boolean {
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
