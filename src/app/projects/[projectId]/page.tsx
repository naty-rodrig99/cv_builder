import { PageProps } from "~/lib/page-props";
import { getUser } from "~/server/user";
import { notFound, redirect } from "next/navigation";
import { routeLogin, routeProject } from "~/app/routes";

interface ProjectPageProps extends PageProps {
  params: { projectId: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projectId = params.projectId;
  if (!projectId) {
    // Todo: Validate params.id to be a valid id (e.g. it is properly formed and exists).
    return notFound();
  }

  const user = await getUser();
  if (!user) {
    redirect(routeLogin({ redirectTo: routeProject(projectId) }));
  }

  return (
    <main className="flex h-screen w-full items-center justify-center bg-background px-4">
      <ul>
        <li>List of things</li>
      </ul>
    </main>
  );
}
