import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import SessionProviderWrapper from "@/components/AdminComponents/SessionProviderWrapper";



export default async function SubscriptionListLayout({ children }) {
  const session = await getServerSession(authOptions);

  return (
    <SessionProviderWrapper session={session}>
      {children}
    </SessionProviderWrapper>
  );
}