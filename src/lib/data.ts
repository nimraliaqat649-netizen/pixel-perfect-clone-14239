/**
 * Placeholder dataset for the Northwind HR AI Talent Platform.
 * Replace with live backend queries when a database is connected.
 */

export type EmploymentStatus = "active" | "probation" | "on-leave" | "offboarding";
export type LeaveStatus = "pending" | "approved" | "rejected";
export type JobStatus = "open" | "paused" | "closed" | "draft";
export type PipelineStage =
  | "applied"
  | "screening"
  | "interview"
  | "offer"
  | "hired"
  | "rejected";

export type Employee = {
  id: string;
  name: string;
  title: string;
  department: string;
  location: string;
  email: string;
  phone: string;
  status: EmploymentStatus;
  startDate: string;
  manager: string;
  type: "Full-time" | "Part-time" | "Contract";
};

export type Department = {
  id: string;
  name: string;
  lead: string;
  headcount: number;
  openRoles: number;
  budgetUsed: number;
  attrition: number;
};

export type Job = {
  id: string;
  title: string;
  department: string;
  location: string;
  type: "Full-time" | "Contract" | "Internship";
  status: JobStatus;
  applicants: number;
  posted: string;
  salary: string;
  hiringManager: string;
};

export type Candidate = {
  id: string;
  name: string;
  role: string;
  jobId: string;
  location: string;
  email: string;
  experience: number;
  stage: PipelineStage;
  matchScore: number;
  skills: string[];
  source: string;
  applied: string;
};

export type LeaveRequest = {
  id: string;
  employee: string;
  department: string;
  type: "Annual" | "Sick" | "Parental" | "Unpaid";
  from: string;
  to: string;
  days: number;
  status: LeaveStatus;
};

export type AttendanceRow = {
  id: string;
  employee: string;
  department: string;
  date: string;
  clockIn: string;
  clockOut: string;
  hours: number;
  status: "present" | "remote" | "late" | "absent";
};

export const initials = (name: string) =>
  name
    .split(" ")
    .map((p) => p[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

export const departments: Department[] = [
  {
    id: "eng",
    name: "Engineering",
    lead: "Priya Raman",
    headcount: 128,
    openRoles: 9,
    budgetUsed: 78,
    attrition: 4.2,
  },
  {
    id: "prod",
    name: "Product",
    lead: "Daniel Osei",
    headcount: 34,
    openRoles: 3,
    budgetUsed: 64,
    attrition: 5.1,
  },
  {
    id: "design",
    name: "Design",
    lead: "Marta Kovac",
    headcount: 21,
    openRoles: 2,
    budgetUsed: 52,
    attrition: 3.4,
  },
  {
    id: "sales",
    name: "Sales",
    lead: "Alex Whitfield",
    headcount: 96,
    openRoles: 11,
    budgetUsed: 88,
    attrition: 9.8,
  },
  {
    id: "cs",
    name: "Customer Success",
    lead: "Noor Haddad",
    headcount: 57,
    openRoles: 4,
    budgetUsed: 71,
    attrition: 7.3,
  },
  {
    id: "fin",
    name: "Finance",
    lead: "Jonas Lindqvist",
    headcount: 18,
    openRoles: 1,
    budgetUsed: 46,
    attrition: 2.6,
  },
  {
    id: "people",
    name: "People Ops",
    lead: "Sofia Marchetti",
    headcount: 15,
    openRoles: 2,
    budgetUsed: 58,
    attrition: 3.1,
  },
];

const employeeSeed: Array<[string, string, string, string, EmploymentStatus]> = [
  ["Priya Raman", "VP Engineering", "Engineering", "London, UK", "active"],
  ["Daniel Osei", "Head of Product", "Product", "Accra, GH", "active"],
  ["Marta Kovac", "Design Director", "Design", "Berlin, DE", "active"],
  ["Alex Whitfield", "VP Sales", "Sales", "New York, US", "active"],
  ["Noor Haddad", "Director, CS", "Customer Success", "Dubai, AE", "on-leave"],
  ["Jonas Lindqvist", "Finance Lead", "Finance", "Stockholm, SE", "active"],
  ["Sofia Marchetti", "People Ops Lead", "People Ops", "Milan, IT", "active"],
  ["Hannah Kim", "Staff Engineer", "Engineering", "Seoul, KR", "active"],
  ["Tomás Ferreira", "Senior Engineer", "Engineering", "Lisbon, PT", "active"],
  ["Ines Duarte", "Product Manager", "Product", "Lisbon, PT", "probation"],
  ["Ravi Shankar", "Data Engineer", "Engineering", "Bengaluru, IN", "active"],
  ["Elena Petrova", "Product Designer", "Design", "Belgrade, RS", "active"],
  ["Grace Okonkwo", "Account Executive", "Sales", "Lagos, NG", "active"],
  ["Mateo Rivas", "Account Executive", "Sales", "Madrid, ES", "probation"],
  ["Lucy Chen", "CS Manager", "Customer Success", "Singapore, SG", "active"],
  ["Omar Farouk", "Payroll Specialist", "Finance", "Cairo, EG", "active"],
  ["Anna Nowak", "Recruiter", "People Ops", "Warsaw, PL", "active"],
  ["Ben Carter", "Platform Engineer", "Engineering", "Manchester, UK", "offboarding"],
  ["Yuki Tanaka", "QA Engineer", "Engineering", "Tokyo, JP", "active"],
  ["Sara Lindberg", "Brand Designer", "Design", "Oslo, NO", "on-leave"],
];

export const employees: Employee[] = employeeSeed.map(
  ([name, title, department, location, status], i) => ({
    id: `emp-${String(i + 1).padStart(3, "0")}`,
    name,
    title,
    department,
    location,
    status,
    email: `${name.toLowerCase().replace(/[^a-z ]/g, "").split(" ").join(".")}@northwind.com`,
    phone: `+44 20 7${String(1000 + i * 37).slice(0, 4)} ${String(2000 + i * 53).slice(0, 4)}`,
    startDate: `20${18 + (i % 7)}-0${(i % 9) + 1}-1${i % 9}`,
    manager: i < 7 ? "Elliot Vance (CEO)" : employeeSeed[i % 7][0],
    type: i % 11 === 0 ? "Contract" : i % 7 === 3 ? "Part-time" : "Full-time",
  }),
);

export const jobs: Job[] = [
  {
    id: "job-001",
    title: "Senior Frontend Engineer",
    department: "Engineering",
    location: "London / Remote",
    type: "Full-time",
    status: "open",
    applicants: 84,
    posted: "2026-09-02",
    salary: "£95k – £120k",
    hiringManager: "Priya Raman",
  },
  {
    id: "job-002",
    title: "Machine Learning Engineer",
    department: "Engineering",
    location: "Remote, EU",
    type: "Full-time",
    status: "open",
    applicants: 129,
    posted: "2026-08-21",
    salary: "€100k – €135k",
    hiringManager: "Priya Raman",
  },
  {
    id: "job-003",
    title: "Product Designer",
    department: "Design",
    location: "Berlin, DE",
    type: "Full-time",
    status: "open",
    applicants: 62,
    posted: "2026-09-11",
    salary: "€78k – €95k",
    hiringManager: "Marta Kovac",
  },
  {
    id: "job-004",
    title: "Enterprise Account Executive",
    department: "Sales",
    location: "New York, US",
    type: "Full-time",
    status: "open",
    applicants: 47,
    posted: "2026-09-18",
    salary: "$120k + OTE",
    hiringManager: "Alex Whitfield",
  },
  {
    id: "job-005",
    title: "Customer Success Manager",
    department: "Customer Success",
    location: "Singapore, SG",
    type: "Full-time",
    status: "paused",
    applicants: 31,
    posted: "2026-07-30",
    salary: "S$95k – S$115k",
    hiringManager: "Noor Haddad",
  },
  {
    id: "job-006",
    title: "People Ops Coordinator",
    department: "People Ops",
    location: "Milan, IT",
    type: "Contract",
    status: "draft",
    applicants: 0,
    posted: "2026-09-26",
    salary: "€48k – €58k",
    hiringManager: "Sofia Marchetti",
  },
  {
    id: "job-007",
    title: "Financial Analyst",
    department: "Finance",
    location: "Stockholm, SE",
    type: "Full-time",
    status: "closed",
    applicants: 56,
    posted: "2026-05-14",
    salary: "SEK 720k",
    hiringManager: "Jonas Lindqvist",
  },
];

const candidateSeed: Array<[string, string, string, string, number, PipelineStage, number, string[]]> = [
  ["Amara Nwosu", "Senior Frontend Engineer", "job-001", "London, UK", 8, "interview", 94, ["React", "TypeScript", "Design systems"]],
  ["Leon Fischer", "Senior Frontend Engineer", "job-001", "Berlin, DE", 6, "screening", 88, ["React", "GraphQL", "Testing"]],
  ["Meera Iyer", "Machine Learning Engineer", "job-002", "Bengaluru, IN", 7, "offer", 96, ["PyTorch", "MLOps", "NLP"]],
  ["Diego Salas", "Machine Learning Engineer", "job-002", "Barcelona, ES", 5, "interview", 89, ["Python", "LLMs", "Vector DBs"]],
  ["Ruth Andersen", "Product Designer", "job-003", "Copenhagen, DK", 9, "interview", 91, ["Figma", "Research", "Prototyping"]],
  ["Karim Bakr", "Product Designer", "job-003", "Cairo, EG", 4, "applied", 72, ["Figma", "UI", "Motion"]],
  ["Jordan Blake", "Enterprise Account Executive", "job-004", "Chicago, US", 11, "screening", 85, ["SaaS", "Enterprise", "Negotiation"]],
  ["Chloé Martin", "Enterprise Account Executive", "job-004", "Paris, FR", 7, "applied", 79, ["SaaS", "Outbound", "French"]],
  ["Wei Zhang", "Customer Success Manager", "job-005", "Singapore, SG", 6, "hired", 93, ["Onboarding", "Retention", "Mandarin"]],
  ["Fatima Al-Sayed", "Machine Learning Engineer", "job-002", "Amman, JO", 4, "applied", 81, ["Python", "TensorFlow", "Stats"]],
  ["Oliver Grant", "Senior Frontend Engineer", "job-001", "Dublin, IE", 10, "offer", 90, ["React", "Performance", "A11y"]],
  ["Nadia Popescu", "Product Designer", "job-003", "Bucharest, RO", 5, "rejected", 64, ["Figma", "Branding"]],
  ["Samuel Adeyemi", "Senior Frontend Engineer", "job-001", "Lagos, NG", 6, "applied", 83, ["React", "Next.js", "Tailwind"]],
  ["Ingrid Bakken", "Customer Success Manager", "job-005", "Oslo, NO", 8, "screening", 77, ["QBRs", "Churn analysis"]],
];

export const candidates: Candidate[] = candidateSeed.map(
  ([name, role, jobId, location, experience, stage, matchScore, skills], i) => ({
    id: `cand-${String(i + 1).padStart(3, "0")}`,
    name,
    role,
    jobId,
    location,
    experience,
    stage,
    matchScore,
    skills,
    email: `${name.toLowerCase().replace(/[^a-z ]/g, "").split(" ").join(".")}@mail.com`,
    source: ["LinkedIn", "Referral", "Careers site", "Talent pool"][i % 4],
    applied: `2026-09-${String((i % 27) + 1).padStart(2, "0")}`,
  }),
);

export const leaveRequests: LeaveRequest[] = [
  { id: "lv-01", employee: "Hannah Kim", department: "Engineering", type: "Annual", from: "2026-10-05", to: "2026-10-16", days: 10, status: "pending" },
  { id: "lv-02", employee: "Grace Okonkwo", department: "Sales", type: "Sick", from: "2026-09-29", to: "2026-09-30", days: 2, status: "pending" },
  { id: "lv-03", employee: "Elena Petrova", department: "Design", type: "Parental", from: "2026-11-02", to: "2027-02-01", days: 92, status: "pending" },
  { id: "lv-04", employee: "Ravi Shankar", department: "Engineering", type: "Annual", from: "2026-10-12", to: "2026-10-19", days: 6, status: "approved" },
  { id: "lv-05", employee: "Omar Farouk", department: "Finance", type: "Unpaid", from: "2026-10-01", to: "2026-10-03", days: 3, status: "approved" },
  { id: "lv-06", employee: "Mateo Rivas", department: "Sales", type: "Annual", from: "2026-09-21", to: "2026-09-25", days: 5, status: "rejected" },
  { id: "lv-07", employee: "Lucy Chen", department: "Customer Success", type: "Annual", from: "2026-12-20", to: "2027-01-05", days: 11, status: "pending" },
  { id: "lv-08", employee: "Yuki Tanaka", department: "Engineering", type: "Sick", from: "2026-09-24", to: "2026-09-26", days: 3, status: "approved" },
];

export const attendance: AttendanceRow[] = employees.slice(0, 12).map((e, i) => ({
  id: `att-${i}`,
  employee: e.name,
  department: e.department,
  date: "2026-09-30",
  clockIn: ["08:52", "09:04", "09:31", "08:45", "—"][i % 5],
  clockOut: ["17:36", "18:02", "17:15", "18:40", "—"][i % 5],
  hours: [8.7, 8.9, 7.7, 9.9, 0][i % 5],
  status: (["present", "remote", "late", "present", "absent"] as const)[i % 5],
}));

export const headcountTrend = [
  { month: "Apr", headcount: 328, hires: 12, exits: 5 },
  { month: "May", headcount: 337, hires: 14, exits: 5 },
  { month: "Jun", headcount: 344, hires: 11, exits: 4 },
  { month: "Jul", headcount: 351, hires: 13, exits: 6 },
  { month: "Aug", headcount: 358, hires: 15, exits: 8 },
  { month: "Sep", headcount: 369, hires: 18, exits: 7 },
];

export const pipelineFunnel = [
  { stage: "Applied", count: 412 },
  { stage: "Screening", count: 186 },
  { stage: "Interview", count: 94 },
  { stage: "Offer", count: 31 },
  { stage: "Hired", count: 19 },
];

export const sourceMix = [
  { name: "LinkedIn", value: 38 },
  { name: "Referral", value: 26 },
  { name: "Careers site", value: 21 },
  { name: "Talent pool", value: 15 },
];

export const timeToHire = [
  { month: "Apr", days: 41 },
  { month: "May", days: 39 },
  { month: "Jun", days: 36 },
  { month: "Jul", days: 34 },
  { month: "Aug", days: 31 },
  { month: "Sep", days: 28 },
];

export const activity = [
  { id: 1, who: "Sofia Marchetti", what: "moved Meera Iyer to Offer", when: "12 min ago", kind: "pipeline" as const },
  { id: 2, who: "Priya Raman", what: "approved leave for Ravi Shankar", when: "48 min ago", kind: "leave" as const },
  { id: 3, who: "AI Matching", what: "scored 34 new applicants for ML Engineer", when: "2 h ago", kind: "ai" as const },
  { id: 4, who: "Anna Nowak", what: "published Product Designer in Berlin", when: "5 h ago", kind: "job" as const },
  { id: 5, who: "Alex Whitfield", what: "requested headcount for 2 AE roles", when: "Yesterday", kind: "request" as const },
];

export const stageMeta: Record<PipelineStage, { label: string; tone: string }> = {
  applied: { label: "Applied", tone: "neutral" },
  screening: { label: "Screening", tone: "info" },
  interview: { label: "Interview", tone: "warning" },
  offer: { label: "Offer", tone: "primary" },
  hired: { label: "Hired", tone: "success" },
  rejected: { label: "Rejected", tone: "destructive" },
};
