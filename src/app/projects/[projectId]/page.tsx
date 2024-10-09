import { type PageProps } from "~/lib/page-props";
import { getUser } from "~/server/user";
import { eq } from "drizzle-orm";
import { notFound, redirect } from "next/navigation";
import { routeLogin, routeProject } from "~/app/routes";
import CvEditor from "~/components/cv/cv-editor";
import { newSchema } from "~/components/cv/schema.template";
import { newSimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.template";
import { saveCvSchema } from "~/app/projects/actions";
import { db } from "~/server/db";
import { cvTable } from "~/server/db/schema";
import { CvSchema } from "~/components/cv/schema";

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

  const retrievedCv = await db
    .select({ cvName: cvTable.cvName, cvData: cvTable.cvData })
    .from(cvTable)
    .where(eq(projectId as any, cvTable.id));
  const cvData =
    retrievedCv.length === 1 && retrievedCv[0] && retrievedCv[0]?.cvData
      ? {
          name: retrievedCv[0].cvName,
          schema: retrievedCv[0].cvData as CvSchema,
        }
      : {
          name: `Example (${projectId})`,
          schema: newSchema({
            elements: [
              newSimpleTextElement({ text: "my text" }),
              newSimpleTextElement({ text: "my other text" }),
            ],
          }),
        };

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
