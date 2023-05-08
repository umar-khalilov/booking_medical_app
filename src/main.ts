import { App } from './App';

const main = async (): Promise<void> => {
    const app = await App.initialize();
    app.listen();
};

void main();
