"use client";

import { Button } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "~/components/ui/card";
import { Label } from "~/components/ui/label";
import { createDummyProject } from "./actions";

export interface ProjectsListProps {
  projects: { id: string; name: string }[];
}
export default function ProjectsList({projects}: ProjectsListProps) {
  return (
    <Card>
      <CardHeader>
        <Label>Your projects:</Label>
      </CardHeader>
      <CardContent>
        {projects.map((project, i) => (
          <div key={project.id}>
            <Label>{project.name}</Label>
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
