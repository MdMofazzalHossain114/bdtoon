import { decryptUserId } from "@/lib/aes-algorithm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const encryptedData = searchParams.get("username");

  // Username encrypted using AES algorithm
  const username = decryptUserId(encryptedData);

  return Response.json(
    {
      success: true,
      message: username,
    },
    { status: 200 }
  );
}
