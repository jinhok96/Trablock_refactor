interface DashboardLayoutProps {
  children: React.ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="mx-auto">
      <main>{children}</main>
    </div>
  );
}
