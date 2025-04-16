import { auth } from "@/auth";
import LandingPage from "./LandingPage";
import HomePage from "./HomePage";

export default async function Home() {
  const session = await auth();

  if (!session) {
    return <LandingPage />;
  }

  return <HomePage />;
}
