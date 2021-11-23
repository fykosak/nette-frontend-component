import * as React from 'react';
import {NetteActions} from '../NetteActions/netteActions';
import HashMapLoader from './HashMapLoader';

export type App = (element: Element, reactId: string, rawData: string, actions: NetteActions) => boolean;

export default class Renderer {
    public hashMapLoader: HashMapLoader;

    public constructor() {
        this.hashMapLoader = new HashMapLoader();
    }

    public run(): void {

        document.querySelectorAll('.react-root,[data-react-root]').forEach((element: Element) => {
            if (element.getAttribute('data-served')) {
                return;
            }

            if (this.hashMapLoader.render(element)) {
                element.setAttribute('data-served', '1');
                return;
            }
            throw new Error('no match type');
        });
    }
}

