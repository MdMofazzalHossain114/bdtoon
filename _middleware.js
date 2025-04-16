// import { NextResponse } from "next/server";
// import { auth } from "@/auth";

// const protectedRoutes = ["/user-info"];

// export default async function middleware(request) {
//   const session = await auth();

//   const { pathname } = request.nextUrl;

//   const isProtected = protectedRoutes.some((route) =>
//     pathname.startWith(route)
//   );

//   if (isProtected && !session) {
//     return NextResponse.redirect(new URL("/login", request.url));
//   }

//   return NextResponse.next();
// }
