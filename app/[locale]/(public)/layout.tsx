import { Suspense } from "react";

export default function PublicLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Suspense>
      <div className="flex flex-col min-h-screen">
        {/* Header buraya gelecek */}
        <main className="flex-1">{children}</main>
        {/* Footer buraya gelecek */}
      </div>
    </Suspense>
  );
}
