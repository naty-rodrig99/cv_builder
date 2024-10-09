import { type PageProps } from "~/lib/page-props";
import { getUser } from "~/server/user";
import { notFound, redirect } from "next/navigation";
import { routeLogin, routeProject } from "~/app/routes";
import CvEditor from "~/components/cv/cv-editor";
import { newSchema } from "~/components/cv/schema.template";
import { newSimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.template";
import { saveCvSchema } from "~/app/projects/actions";

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

  // Todo: Grab this from the db.
  const cvData = {
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
        saveAction={async (schema) => {
          "use server";
          const result = await saveCvSchema(projectId, schema);
          if (!result.ok) throw new Error(result.error.message);
        }}
      />
    </main>
  );
}
