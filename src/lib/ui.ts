import type { EmploymentStatus, JobStatus, LeaveStatus, PipelineStage } from "@/lib/data";

export type Tone = "neutral" | "primary" | "success" | "warning" | "info" | "destructive";

export const employeeStatusTone: Record<EmploymentStatus, Tone> = {
  active: "success",
  probation: "info",
  "on-leave": "warning",
  offboarding: "destructive",
};

export const employeeStatusLabel: Record<EmploymentStatus, string> = {
  active: "Active",
  probation: "Probation",
  "on-leave": "On leave",
  offboarding: "Offboarding",
};

export const leaveStatusTone: Record<LeaveStatus, Tone> = {
  pending: "warning",
  approved: "success",
  rejected: "destructive",
};

export const jobStatusTone: Record<JobStatus, Tone> = {
  open: "success",
  paused: "warning",
  closed: "neutral",
  draft: "info",
};

export const stageTone: Record<PipelineStage, Tone> = {
  applied: "neutral",
  screening: "info",
  interview: "warning",
  offer: "primary",
  hired: "success",
  rejected: "destructive",
};

export const chartTooltipProps = {
  contentStyle: {
    background: "var(--color-popover)",
    border: "1px solid var(--color-border)",
    borderRadius: "10px",
    boxShadow: "var(--shadow-lg)",
    fontSize: "12px",
    color: "var(--color-popover-foreground)",
  },
  labelStyle: { color: "var(--color-muted-foreground)", fontSize: "11px" },
} as const;
