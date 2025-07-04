"use client";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import type { InterpretMedicalCodeOutput } from "@/ai/flows/interpret-medical-code";
import { Stethoscope, Siren, ClipboardList, HeartPulse, Globe } from "lucide-react";

interface CodexResultsProps {
  data: InterpretMedicalCodeOutput;
}

const InfoSection: React.FC<{ title: string; children: React.ReactNode; }> = ({ title, children }) => (
  <div className="mb-4 last:mb-0">
    <h3 className="text-md font-semibold mb-2 text-foreground/90">{title}</h3>
    <div className="text-sm text-muted-foreground prose prose-sm max-w-none prose-p:my-0 prose-ul:my-0">{children}</div>
  </div>
);

const InfoText: React.FC<{ value?: string | number | null }> = ({ value }) => {
  if (value === null || value === undefined || value === '') return <p>N/A</p>;
  return <p className="whitespace-pre-wrap">{value}</p>;
};

const InfoList: React.FC<{ items?: string[] }> = ({ items }) => {
  if (!items || items.length === 0) return <p>N/A</p>;
  return (
    <ul className="list-disc pl-5 space-y-1">
      {items.map((item, index) => (
        <li key={index}>{item}</li>
      ))}
    </ul>
  );
};


export function CodexResults({ data }: CodexResultsProps) {
  return (
    <div className="space-y-6 animate-in fade-in-50 duration-500">
      <Card className="shadow-md">
        <CardHeader>
          <div className="flex justify-between items-start gap-4">
            <div>
              <CardTitle className="font-headline text-primary font-code text-3xl">{data.code_id}</CardTitle>
              <CardDescription className="text-lg mt-1">{data.code_title}</CardDescription>
            </div>
            <div className="text-right flex flex-col gap-2 items-end flex-shrink-0">
              {data.hcc_number && <Badge>HCC: {data.hcc_number}</Badge>}
              {data.version_number && <Badge variant="secondary">Version: {data.version_number}</Badge>}
            </div>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <InfoSection title="Definition">
            <InfoText value={data.code_definition} />
          </InfoSection>
          <div className="grid md:grid-cols-2 gap-x-4 gap-y-2 text-sm pt-2 border-t">
            <div><span className="font-semibold text-foreground/90">Type:</span> {data.type || 'N/A'}</div>
            <div><span className="font-semibold text-foreground/90">Parent Code:</span> {data.parent_code || 'N/A'}</div>
          </div>
        </CardContent>
      </Card>

      <Accordion type="multiple" defaultValue={['clinical-info']} className="w-full space-y-4">
        
        <AccordionItem value="clinical-info" className="border-b-0">
            <AccordionTrigger className="text-lg font-semibold bg-card rounded-lg p-4 hover:no-underline shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent rounded-md">
                        <Stethoscope className="w-5 h-5 text-accent-foreground" />
                    </div>
                    Clinical Information
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 pt-2">
                <Card><CardContent className="pt-6 grid md:grid-cols-2 gap-x-8 gap-y-4"><InfoSection title="Diagnosis Criteria"><InfoText value={data.diagnosis_criteria} /></InfoSection><InfoSection title="Clinical Guidelines"><InfoText value={data.clinical_guidelines} /></InfoSection><InfoSection title="Treatment Protocols"><InfoText value={data.treatment_protocols} /></InfoSection><InfoSection title="Medication Guidelines"><InfoText value={data.medication_guidelines} /></InfoSection><InfoSection title="Severity or Stage"><InfoText value={data.severity_or_stage} /></InfoSection></CardContent></Card>
            </AccordionContent>
        </AccordionItem>
        
        <AccordionItem value="risk-epidemiology" className="border-b-0">
            <AccordionTrigger className="text-lg font-semibold bg-card rounded-lg p-4 hover:no-underline shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent rounded-md"><Siren className="w-5 h-5 text-accent-foreground" /></div>
                    Risk & Epidemiology
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 pt-2">
                <Card><CardContent className="pt-6 grid md:grid-cols-2 gap-x-8 gap-y-4"><InfoSection title="Risk Factors"><InfoList items={data.risk_factors} /></InfoSection><InfoSection title="Comorbidities"><InfoList items={data.comorbidities} /></InfoSection><InfoSection title="Epidemiology"><InfoText value={data.epidemiology} /></InfoSection><InfoSection title="Statistical Incidence and Prevalence Rates"><InfoText value={data.statistical_incidence_and_prevalence_rates} /></InfoSection><InfoSection title="Demographics"><InfoText value={data.demographics} /></InfoSection></CardContent></Card>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="coding-admin" className="border-b-0">
            <AccordionTrigger className="text-lg font-semibold bg-card rounded-lg p-4 hover:no-underline shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent rounded-md"><ClipboardList className="w-5 h-5 text-accent-foreground" /></div>
                    Coding & Administrative
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 pt-2">
                <Card><CardContent className="pt-6 grid md:grid-cols-2 gap-x-8 gap-y-4"><InfoSection title="Inclusion Terms"><InfoList items={data.inclusion_terms} /></InfoSection><InfoSection title="Exclusion Terms"><InfoList items={data.exclusion_terms} /></InfoSection><InfoSection title="Frequently Associated Codes"><InfoList items={data.frequently_associated_codes} /></InfoSection><InfoSection title="Procedural Codes Linkage (CPT)"><InfoList items={data.procedural_codes_linkage} /></InfoSection><InfoSection title="Reimbursement Guidelines"><InfoText value={data.reimbursement_guidelines} /></InfoSection><InfoSection title="Audit Criteria"><InfoText value={data.audit_criteria} /></InfoSection><InfoSection title="Chart Preparation"><InfoText value={data.chart_preparation} /></InfoSection><InfoSection title="Notes"><InfoText value={data.notes} /></InfoSection></CardContent></Card>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="patient-impact" className="border-b-0">
            <AccordionTrigger className="text-lg font-semibold bg-card rounded-lg p-4 hover:no-underline shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent rounded-md"><HeartPulse className="w-5 h-5 text-accent-foreground" /></div>
                    Patient Impact & Resources
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 pt-2">
                <Card><CardContent className="pt-6 grid md:grid-cols-2 gap-x-8 gap-y-4"><InfoSection title="Quality of Life Impact"><InfoText value={data.quality_of_life_impact} /></InfoSection><InfoSection title="Outcomes"><InfoText value={data.outcomes} /></InfoSection><InfoSection title="Prevention"><InfoText value={data.prevention} /></InfoSection><InfoSection title="Patient Education Resources"><InfoList items={data.patient_education_resources} /></InfoSection></CardContent></Card>
            </AccordionContent>
        </AccordionItem>

        <AccordionItem value="broader-context" className="border-b-0">
            <AccordionTrigger className="text-lg font-semibold bg-card rounded-lg p-4 hover:no-underline shadow-sm">
                <div className="flex items-center gap-3">
                    <div className="p-2 bg-accent rounded-md"><Globe className="w-5 h-5 text-accent-foreground" /></div>
                    Broader Context
                </div>
            </AccordionTrigger>
            <AccordionContent className="p-0 pt-2">
                <Card><CardContent className="pt-6 grid md:grid-cols-2 gap-x-8 gap-y-4"><InfoSection title="Cost of Care"><InfoText value={data.cost_of_care ? `$${data.cost_of_care.toLocaleString()}` : 'N/A'} /></InfoSection><InfoSection title="Legal and Ethical Considerations"><InfoText value={data.legal_and_ethical_considerations} /></InfoSection><InfoSection title="International Variations"><InfoText value={data.international_variations} /></InfoSection><InfoSection title="Historical Data"><InfoText value={data.historical_data} /></InfoSection><InfoSection title="Research Links"><InfoList items={data.research_links} /></InfoSection><InfoSection title="Clinical Decision Support"><InfoText value={data.clinical_decision_support} /></InfoSection><InfoSection title="Technology and Digital Health Links"><InfoText value={data.technology_and_digital_health_links} /></InfoSection><InfoSection title="Interoperability Considerations"><InfoText value={data.interoperability_considerations} /></InfoSection></CardContent></Card>
            </AccordionContent>
        </AccordionItem>

      </Accordion>
    </div>
  );
}
