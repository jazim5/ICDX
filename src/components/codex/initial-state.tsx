"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText } from "lucide-react";

export function InitialState() {
  return (
    <div className="flex items-center justify-center h-full animate-in fade-in-50 duration-500">
      <Card className="w-full max-w-md text-center shadow-none border-dashed bg-transparent">
        <CardHeader>
          <div className="mx-auto bg-muted rounded-full p-4 w-fit">
            <FileText className="h-12 w-12 text-muted-foreground" />
          </div>
          <CardTitle className="mt-4">Ready to Search</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Enter an ICD-10 code or a diagnostic phrase above to search. The analysis will appear here.
          </p>
        </CardContent>
      </Card>
    </div>
  );
}
