// middleware.ts

import { withAuth } from "next-auth/middleware";

export default withAuth({
  pages: {
    signIn: "/auth/signin", // redirect to your sign-in page
  },
});

export const config = {
  matcher: ["/protected/:path*"], // protect these routes
};
