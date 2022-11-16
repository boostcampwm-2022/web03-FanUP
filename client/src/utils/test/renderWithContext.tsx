import defaultStore from '@/store';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
export function renderWithContext(component: JSX.Element, store?: any) {
    const testStore = store || defaultStore;
    render(
        <BrowserRouter>
            <Provider store={testStore}>{component}</Provider>
        </BrowserRouter>
    );
}
