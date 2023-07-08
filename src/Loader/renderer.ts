import HashMapLoader from './hash-map-loader';

export default class Renderer {
    public readonly hashMapLoader: HashMapLoader;

    public constructor() {
        this.hashMapLoader = new HashMapLoader();
    }

    public run(): void {

        document.querySelectorAll('.frontend-root,[data-frontend-root]').forEach((element: Element) => {
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

