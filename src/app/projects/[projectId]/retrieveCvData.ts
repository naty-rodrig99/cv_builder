import { newSimpleTextElement } from "~/components/cv/elements/simple-text/simple-text.template";
import { CvSchema } from "~/components/cv/schema";
import { newSchema } from "~/components/cv/schema.template";
import { eq } from "drizzle-orm";
import { db } from "~/server/db";
import { cvTable } from "~/server/db/schema";

export async function retrieveCvData(projectId: string) {
  const retrievedCv = await db
    .select({ cvName: cvTable.cvName, cvData: cvTable.cvData })
    .from(cvTable)
    .where(eq(projectId as any, cvTable.id));
  return retrievedCv.length === 1 && retrievedCv[0] && retrievedCv[0]?.cvData
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
}
