import { getProjects, getUser } from "~/server/user";
import { redirect } from "next/navigation";
import { routeLogin, routeProjects } from "~/app/routes";
import { cn } from "~/lib/utils";
import { Separator } from "@radix-ui/react-menubar";
import { Label } from "~/components/ui/label";

export default async function ProjectsPage() {
  const user = await getUser();

  if (!user) {
    return redirect(routeLogin({ redirectTo: routeProjects() }));
  }

  const projects = await getProjects();
  if (!projects || projects.length == 0) {
    return (
      <main className="flex h-screen w-full items-center justify-center bg-background px-4">
        <Label>No projects created yet</Label>
      </main>
    );
  }

  return (
    <main className="flex h-screen w-full items-center justify-center bg-background px-4">
      {projects.map((project, i) => (
        <>
          {i > 0 ? <Separator /> : <></>}
          <Label>{project.name}</Label>
        </>
      ))}
    </main>
  );
}
