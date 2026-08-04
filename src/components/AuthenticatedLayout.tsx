import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AppNav } from './AppNav';

export function AuthenticatedLayout() {
  return (
    <ProtectedRoute>
      <AppNav />
      <main>
        <Outlet />
      </main>
    </ProtectedRoute>
  );
}
