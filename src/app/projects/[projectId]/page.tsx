import { type PageProps } from "~/lib/page-props";
import { getUser } from "~/server/user";
import { notFound, redirect } from "next/navigation";
import { routeLogin, routeProject } from "~/app/routes";
import CvEditor from "~/components/cv/cv-editor";
import { saveCvSchema } from "~/app/projects/actions";
import { retrieveCvData } from "./retrieveCvData";

interface ProjectPageProps extends PageProps {
  params: { projectId: string };
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const projectId = decodeURIComponent(params.projectId);
  if (!projectId) {
    // Todo: Validate params.id to be a valid id (e.g. it is properly formed and exists).
    return notFound();
  }
  const user = await getUser();
  if (!user) {
    redirect(routeLogin({ redirectTo: routeProject(projectId) }));
  }

  const cvData = await retrieveCvData(projectId);

  return (
    <main className="flex h-screen w-full flex-col items-center bg-background px-4">
      <CvEditor
        projectId={projectId}
        cv={cvData}
        saveAction={async (cvData) => {
          "use server";
          const result = await saveCvSchema(projectId, cvData);
          if (!result.ok) throw new Error(result.error.message);
        }}
      />
    </main>
  );
}
