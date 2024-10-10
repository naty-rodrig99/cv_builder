import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export function SimpleHeaderPreview() {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Simple Header</CardTitle>
      </CardHeader>
      <CardContent>A very simple header element.</CardContent>
    </Card>
  );
}
