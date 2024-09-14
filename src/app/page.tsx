import Link from "next/link";
import { getUser } from "~/server/user";
import LogoutButton from "~/app/auth/logout/logout-button";
import { Button } from "~/components/ui/button";
import { H1, P } from "~/components/ui/typography";

export default async function HomePage() {
  const user = await getUser();

  return (
    <main className="bg-background flex h-screen w-full items-center justify-center px-4">
      <div className="container flex flex-col items-center justify-center gap-12 px-4 py-16">
        <div>
          <H1>Hello{user ? ` ${user?.username}` : ""}!</H1>
          <P>There isn't much here yet 👀</P>
          {user && <P>But you're here! 🥳</P>}
        </div>
        <div className="flex items-center gap-2">
          {!user && (
            <Button asChild variant="secondary">
              <Link href="/auth/signup">Sign Up</Link>
            </Button>
          )}
          {!user && (
            <Button asChild>
              <Link href="/auth/login">Log In</Link>
            </Button>
          )}
          {user && <LogoutButton />}
        </div>
      </div>
    </main>
  );
}
