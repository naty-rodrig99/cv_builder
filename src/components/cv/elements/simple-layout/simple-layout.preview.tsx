import { Card, CardContent, CardHeader, CardTitle } from "~/components/ui/card";

export const SimpleLayoutPreview = () => {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Simple Layout</CardTitle>
      </CardHeader>
      <CardContent>
        Simple concatenating layout. Choose between vertical and horizontal
        direction.
      </CardContent>
    </Card>
  );
};
