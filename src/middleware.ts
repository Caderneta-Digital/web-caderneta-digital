import { NextRequest, NextResponse } from "next/server";
import { UserTypeEnum } from "./types/userTypes";
import { InternBusinessLogic } from "./utils/internBusinessLogin";
import { InternType } from "./types/internTypes";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;
  const userType = req.cookies.get("type")?.value as UserTypeEnum;
  const user = req.cookies.get("user")?.value;

  if (!token && req.url.includes("login")) {
    return NextResponse.next();
  }

  if (!token) {
    return NextResponse.redirect(new URL(`/`, req.url));
  }

  if (user && userType === UserTypeEnum.INTERN) {
    const intern = JSON.parse(user) as InternType;
    if (InternBusinessLogic.shouldConcludeProfile(intern)) {
      return NextResponse.redirect(new URL(`/concludeProfile/intern`, req.url));
    }

    if (!req.url.includes("dashboard")) {
      return NextResponse.redirect(new URL(`/dashboard/intern`, req.url));
    }

    return NextResponse.next();
  }

  if (user && userType === UserTypeEnum.SUPERVISOR) {
    if (!req.url.includes("dashboard")) {
      return NextResponse.redirect(new URL(`/dashboard/supervisor`, req.url));
    }

    return NextResponse.next();
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login/:path*", "/dashboard/:path*", "/concludeProfile/:path"],
};
