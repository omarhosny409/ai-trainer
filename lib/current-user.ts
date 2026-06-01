import { auth, currentUser } from "@clerk/nextjs/server";
import { prisma } from "@/lib/prisma";

export async function getDbUser() {
  const { userId } = await auth();
  if (!userId) return null;
  const clerkUser = await currentUser();
  return prisma.user.upsert({
    where: { clerkId: userId },
    update: { email: clerkUser?.emailAddresses?.[0]?.emailAddress, name: clerkUser?.fullName },
    create: { clerkId: userId, email: clerkUser?.emailAddresses?.[0]?.emailAddress, name: clerkUser?.fullName }
  });
}
