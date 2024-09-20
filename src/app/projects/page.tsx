import { getUser } from "~/server/user";
import { redirect } from "next/navigation";
import { routeLogin, routeProjects } from "~/app/routes";

export default async function ProjectsPage() {
  const user = await getUser();

  if (!user) {
    return redirect(routeLogin({ redirectTo: routeProjects() }));
  }

  return (
    <main className="flex h-screen w-full items-center justify-center bg-background px-4">
      <ul>
        <li>List of things</li>
      </ul>
    </main>
  );
}
