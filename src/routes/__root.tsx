import { createRootRoute, Outlet } from '@tanstack/react-router';
import { Footer } from '@/layouts/footer';
import { Nav } from '@/layouts/nav/nav';

export const Route = createRootRoute({
  component: RootLayout,
});

function RootLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
