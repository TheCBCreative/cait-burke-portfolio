import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';
import { routes } from '../routes';

/** Renders the app at `path`, the way the browser router would. */
export function renderRoute(path: string) {
  const router = createMemoryRouter(routes, { initialEntries: [path] });
  return { router, ...render(<RouterProvider router={router} />) };
}
