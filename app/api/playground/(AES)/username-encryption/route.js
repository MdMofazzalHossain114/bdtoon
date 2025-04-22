import { encrypt } from "@/lib/aes-algorithm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const data = searchParams.get("data");
  console.log("Username - ", data);

  if (!data) {
    return Response.json(
      {
        success: false,
        message:
          "Username not found, please provide data in query params (data=YourName)",
      },
      { status: 400 }
    );
  }

  const eUsername = await encrypt(data);
  console.log("Username Encrypted - ", eUsername);

  return Response.json(
    {
      success: true,
      message: eUsername,
    },
    { status: 200 }
  );
}
