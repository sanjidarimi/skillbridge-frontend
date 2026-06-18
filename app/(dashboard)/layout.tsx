import DashboardSidebar from "@/components/dashboard/DashboardSidebar";

export default async function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  // Replace this mock with  Auth  fetch logic
  const userSession = {
    role: "TUTOR" as const, 
    name: "Rahat Khan",
    email: "rahat@student.com"
  };

  return (
    <div className="min-h-screen flex flex-col lg:flex-row bg-background">
    
      <DashboardSidebar 
        role={userSession.role} 
        userName={userSession.name} 
        userEmail={userSession.email} 
      />

      <div className="flex-1 w-full overflow-y-auto">
        {children}
      </div>
    </div>
  );
}