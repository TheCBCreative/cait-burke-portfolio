import type { RouteObject } from 'react-router-dom';
import { RootLayout } from './components/layout/RootLayout';
import { LandingPage } from './pages/LandingPage';
import { HomePage } from './pages/HomePage';
import { CaseStudyPage } from './pages/CaseStudyPage';
import { NotFoundPage } from './pages/NotFoundPage';

export const routes: RouteObject[] = [
  {
    element: <RootLayout />,
    children: [
      { path: '/', element: <LandingPage /> },
      { path: '/home', element: <HomePage /> },
      { path: '/work/:slug', element: <CaseStudyPage /> },
      { path: '*', element: <NotFoundPage /> },
    ],
  },
];
