import UserNavbar from "./UserNavbar";

interface UserLayoutProps {
  children: React.ReactNode;
  onLogout: () => void;
}

export default function UserLayout({ children, onLogout }: UserLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      <UserNavbar onLogout={onLogout} />
      <main className="pb-8">
        {children}
      </main>
    </div>
  );
}