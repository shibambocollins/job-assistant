import { Outlet } from 'react-router-dom';
import { ProtectedRoute } from './ProtectedRoute';
import { AppNav } from './AppNav';
import { AppFooter } from './AppFooter';

export function AuthenticatedLayout() {
  return (
    <ProtectedRoute>
      <div className="min-h-screen flex flex-col">
        <AppNav />
        <main className="flex-1 flex flex-col">
          <Outlet />
        </main>
        <AppFooter />
      </div>
    </ProtectedRoute>
  );
}
