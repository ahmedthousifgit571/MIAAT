export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Don't protect the login page
  // The login page is at /admin/login, which we handle specially
  // Protected routes are handled in (dashboard) layout

  return <>{children}</>
}

