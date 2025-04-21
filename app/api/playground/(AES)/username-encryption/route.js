import { encryptUserId } from "@/lib/aes-algorithm";

export async function GET(request) {
  const { searchParams } = new URL(request.url);

  const username = searchParams.get("username");
  console.log("Username - ", username);

  if (!username) {
    return Response.json(
      {
        success: false,
        message:
          "Username not found, please provide username in query params (username=YourName)",
      },
      { status: 400 }
    );
  }

  const eUsername = encryptUserId(username);
  console.log("Username Encrypted - ", eUsername);

  return Response.json(
    {
      success: true,
      message: eUsername,
    },
    { status: 200 }
  );
}
