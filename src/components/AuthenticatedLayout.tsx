import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AppNav } from './AppNav';
import { AppFooter } from './AppFooter';

export function AuthenticatedLayout() {
  return (
    <ProtectedRoute>
      <AppNav />
      <main>
        <Outlet />
      </main>
      <AppFooter />
    </ProtectedRoute>
  );
}
