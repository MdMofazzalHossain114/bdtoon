import { auth } from "@/auth";

export const getAuthenticatedUser = async () => {
  const session = await auth();

  console.log(session);

  return session?.user || null;
};
