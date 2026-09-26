import { Outlet } from 'react-router-dom';
import { useScrollToHash } from '../../hooks/useScrollToHash';

export function RootLayout() {
  useScrollToHash();
  return <Outlet />;
}
