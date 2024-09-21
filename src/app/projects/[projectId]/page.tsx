import { PageProps } from "~/lib/page-props";
import { getUser } from "~/server/user";
import { notFound, redirect } from "next/navigation";
import { routeLogin, routeProject } from "~/app/routes";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "~/components/ui/resizable";
import { ScrollArea } from "~/components/ui/scroll-area";
import { cn } from "~/lib/utils";
import { Card, CardContent } from "~/components/ui/card";
import { Separator } from "~/components/ui/separator";

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
      <ResizablePanelGroup direction="horizontal">
        <ResizablePanel defaultSize={150}>
          <ScrollArea
            className={cn(
              "inline-flex",
              "items-center",
              "size-full",
              "bg-orange-500",
            )}
          >
            <Card className={cn("self-center", "w-full", "aspect-[21/29.7]")}>
              <CardContent>
                <ul>
                  <li>List of things</li>
                </ul>
              </CardContent>
            </Card>
          </ScrollArea>
        </ResizablePanel>
        <ResizableHandle />
        <ResizablePanel defaultSize={50}>
          <ScrollArea className="size-full">
            {[...Array(25)].map((e, i) => (
              <>
                <div key={e}>Add Component here</div>
                <Separator className="my-2" />
              </>
            ))}
          </ScrollArea>
        </ResizablePanel>
      </ResizablePanelGroup>
    </main>
  );
}
