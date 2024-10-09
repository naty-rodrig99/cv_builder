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
import { createNewProject, deleteProject } from "./actions";
import Link from "next/link";
import { routeProject } from "../routes";
import { cn } from "~/lib/utils";
import { TrashIcon } from "@radix-ui/react-icons";
import { useState } from "react";

export interface ProjectsListProps {
  projects: { id: string; name: string }[];
}
export default function ProjectsList({ projects }: ProjectsListProps) {
  const [projectList, setProjectList] = useState(projects);
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
              onClick={async () => {
                await deleteProject(project.id).then(() =>
                  setProjectList(projectList.splice(i, 1)),
                );
              }}
            >
              <TrashIcon />
            </Button>
          </div>
        ))}
      </CardContent>
      <CardFooter>
        <Button
          onClick={async () => {
            await createNewProject();
          }}
        >
          Create a new CV
        </Button>
      </CardFooter>
    </Card>
  );
}
