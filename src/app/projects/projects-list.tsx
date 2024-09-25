"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { createDummyProject } from "./actions";
import Link from "next/link";
import { routeProject } from "../routes";
import { cn } from "~/lib/utils";

export interface ProjectsListProps {
  projects: { id: string; name: string }[];
}
export default function ProjectsList({ projects }: ProjectsListProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("text-2xl")}>Your projects:</CardTitle>
      </CardHeader>
      <CardContent>
        {projects.map((project, i) => (
          <div key={i}>
            <Link
              href={routeProject(project.id)}
              className={cn(
                "w-full",
                "px-6",
                "rounded-l",
                "hover:bg-accent",
                "hover:text-accent-foreground",
              )}
            >
              <Label>{project.name}</Label>
            </Link>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button
          onClick={async () => {
            await createDummyProject();
          }}
        >
          Create one more
        </Button>
      </CardFooter>
    </Card>
  );
}
