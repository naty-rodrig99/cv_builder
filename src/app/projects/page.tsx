import { getProjects, getUser } from "~/server/user";
import { redirect } from "next/navigation";
import { routeLogin, routeProjects } from "~/app/routes";
import { Label } from "~/components/ui/label";
import ProjectsList from "./projects-list";
import { createNewProject, deleteProject } from "./actions";
import { useState } from "react";

export default async function ProjectsPage() {
  const user = await getUser();

  if (!user) {
    return redirect(routeLogin({ redirectTo: routeProjects() }));
  }

  const projects = await getProjects();
  if (!projects) {
    return (
      <main className="flex h-screen w-full items-center justify-center bg-background px-4">
        <Label>No projects created yet</Label>
      </main>
    );
  }
  const [projectList, setProjectList] = useState(projects);

  return (
    <main className="flex h-screen w-full items-center justify-center bg-background px-4">
      <ProjectsList
        projects={projects}
        newProject={async () => {
          await createNewProject();
        }}
        deleteProject={async (projectId, index) => {
          await deleteProject(projectId).then(() =>
            setProjectList(projectList.splice(index, 1)),
          );
        }}
      />
    </main>
  );
}
