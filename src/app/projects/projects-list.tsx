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
import Link from "next/link";
import { routeProject } from "../routes";
import { cn } from "~/lib/utils";
import { TrashIcon } from "@radix-ui/react-icons";

export interface ProjectsListProps {
  projects: { id: string; name: string }[];
  newProject: () => void;
  deleteProject: (projectId: string) => void;
}
export default function ProjectsList({
  projects,
  newProject,
  deleteProject,
}: ProjectsListProps) {

  return (
    <Card>
      <CardHeader>
        <CardTitle className={cn("text-2xl")}>Your projects:</CardTitle>
      </CardHeader>
      <CardContent>
        {projects.map((project, i) => (
          <div key={i} className="space-between flex">
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
            <Button
              variant="ghost"
              className="tiny"
              onClick={() => {
                deleteProject(project.id);
              }}
            >
              <TrashIcon />
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button
          onClick={() => {
            newProject();
          }}
        >
          Create a new CV
        </Button>
      </CardFooter>
    </Card>
  );
}
