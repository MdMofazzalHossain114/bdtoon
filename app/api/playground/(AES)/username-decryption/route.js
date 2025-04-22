import { decrypt } from "@/lib/aes-algorithm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);
  const encryptedData = searchParams.get("data");

  // data encrypted using AES algorithm
  const data = await decrypt(encryptedData);

  return Response.json(
    {
      success: true,
      message: data,
    },
    { status: 200 }
  );
}
