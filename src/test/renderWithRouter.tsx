import type { ReactElement } from 'react';
import { render } from '@testing-library/react';
import { createMemoryRouter, RouterProvider } from 'react-router-dom';

/** Renders a component that uses router links, outside the app's routes. */
export function renderWithRouter(element: ReactElement) {
  const router = createMemoryRouter([{ path: '*', element }]);
  return render(<RouterProvider router={router} />);
}
