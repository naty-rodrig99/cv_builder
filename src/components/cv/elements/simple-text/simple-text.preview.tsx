import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function SimpleTextPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Simple Text</CardTitle>
      </CardHeader>
      <CardContent>A very simple text element.</CardContent>
    </Card>
  );
}
