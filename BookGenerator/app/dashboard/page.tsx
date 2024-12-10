import { getServerSession } from "next-auth/next";
import { redirect } from "next/navigation";
import { Card } from "@/components/ui/card";
import { authOptions } from "@/lib/auth";
import DesignsList from "@/components/designs-list";

export default async function DashboardPage() {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect("/api/auth/signin");
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">My Designs</h1>
      <Card className="p-6">
        <DesignsList userId={session.user.id} />
      </Card>
    </div>
  );
}