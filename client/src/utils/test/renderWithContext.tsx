import { render } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
export function renderWithContext(component: JSX.Element) {
    render(<BrowserRouter>{component}</BrowserRouter>);
}
