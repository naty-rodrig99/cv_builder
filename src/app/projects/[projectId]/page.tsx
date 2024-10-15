import { type PageProps } from "~/lib/page-props";
import { getUser } from "~/server/user";
import { notFound, redirect } from "next/navigation";
import { routeLogin, routeProject, routeProjectExport } from "~/app/routes";
import CvEditor from "~/components/cv/cv-editor";
import { saveCvSchema } from "~/app/projects/actions";
import { retrieveCvData } from "./retrieveCvData";
import { type CvSchema } from "~/components/cv/schema";

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

  const saveAction = async (cvData: {
    name: string | null;
    schema: CvSchema;
  }) => {
    "use server";
    const result = await saveCvSchema(projectId, cvData);
    if (!result.ok) throw new Error(result.error.message);
  };

  const exportAction = async (cvData: {
    name: string | null;
    schema: CvSchema;
  }) => {
    "use server";
    const result = await saveCvSchema(projectId, cvData);
    if (!result.ok) throw new Error(result.error.message);
    redirect(routeProjectExport(projectId));
  };

  return (
    <main className="flex h-screen w-full flex-col items-center bg-background px-4">
      <CvEditor
        cv={cvData}
        saveAction={saveAction}
        exportAction={exportAction}
      />
    </main>
  );
}
