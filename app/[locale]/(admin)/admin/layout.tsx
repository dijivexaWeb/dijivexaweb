export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen bg-bg-light">
      {/* Admin Sidebar buraya gelecek */}
      <main className="flex-1 p-6">{children}</main>
    </div>
  );
}
