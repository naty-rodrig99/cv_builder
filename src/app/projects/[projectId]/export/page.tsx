import { PageProps } from "~/lib/page-props";
import { getUser } from "~/server/user";
import { notFound, redirect } from "next/navigation";
import { routeLogin, routeProjectExport } from "~/app/routes";
import CvPrint from "~/components/cv/cv-print";
import { retrieveCvData } from "../retrieveCvData";

interface ProjectPageProps extends PageProps {
  params: { projectId: string };
}

export default async function ProjectExportPage({ params }: ProjectPageProps) {
  const projectId = decodeURIComponent(params.projectId);
  if (!projectId) {
    // Todo: Validate params.id to be a valid id (e.g. it is properly formed and exists).
    return notFound();
  }

  const user = await getUser();
  if (!user) {
    redirect(routeLogin({ redirectTo: routeProjectExport(projectId) }));
  }

  const cvData = await retrieveCvData(projectId);

  return (
    <div className="flex h-screen w-full flex-col items-center bg-background px-4">
      <CvPrint
        projectId={projectId}
        name={cvData.name}
        schema={cvData.schema}
      />
    </div>
  );
}
