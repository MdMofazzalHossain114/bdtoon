import { decryptUsername } from "@/lib/aes-algorithm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const encryptedData = searchParams.get("username");
  console.log("Username Encrypted - ", encryptedData);

  const username = decryptUsername(encryptedData);
  console.log("Username Encrypted - ", username);

  return Response.json(
    {
      success: true,
      message: username,
    },
    { status: 200 }
  );
}
