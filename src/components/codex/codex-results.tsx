"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { InterpretMedicalCodeOutput } from "@/ai/flows/interpret-medical-code";
import { ClipboardList, Hospital, Milestone, Stethoscope } from "lucide-react";

interface CodexResultsProps {
  data: InterpretMedicalCodeOutput;
}

export function CodexResults({ data }: CodexResultsProps) {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card className="shadow-md">
        <CardHeader>
          <CardTitle className="font-headline text-primary font-code text-3xl">{data.code_id}</CardTitle>
          <CardDescription className="text-lg">{data.description}</CardDescription>
        </CardHeader>
      </Card>

      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <div className="p-2 bg-accent rounded-md">
                <Milestone className="w-6 h-6 text-accent-foreground" />
            </div>
            <CardTitle>Category</CardTitle>
          </CardHeader>
          <CardContent>
            <p>{data.category}</p>
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <div className="p-2 bg-accent rounded-md">
                <Hospital className="w-6 h-6 text-accent-foreground" />
            </div>
            <CardTitle>Applicable Settings</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-wrap gap-2">
            {data.applicable_settings.map((setting) => (
              <Badge key={setting} variant="secondary">{setting}</Badge>
            ))}
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <div className="p-2 bg-accent rounded-md">
                <Stethoscope className="w-6 h-6 text-accent-foreground" />
            </div>
            <CardTitle>Diagnostic Criteria</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{data.diagnostic_criteria}</p>
        </CardContent>
      </Card>
      
      <Card>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0 pb-2">
            <div className="p-2 bg-accent rounded-md">
                <ClipboardList className="w-6 h-6 text-accent-foreground" />
            </div>
            <div>
                <CardTitle>MEAT Compliance</CardTitle>
                <CardDescription>Monitor, Evaluate, Assess, Treat</CardDescription>
            </div>
        </CardHeader>
        <CardContent>
          <p className="whitespace-pre-wrap">{data.MEAT_compliance_recommendations}</p>
        </CardContent>
      </Card>
    </div>
  );
}
