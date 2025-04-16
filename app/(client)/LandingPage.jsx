import Link from "next/link";

export default function LandingPage() {
  return (
    <div>
      <h1>Landing Page</h1>
      <Link href={"/login"}>Click to login</Link>
    </div>
  );
}
