import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Brain,
  Building2,
  CalendarCheck,
  ChevronsLeft,
  ChevronsRight,
  ClipboardList,
  FileUp,
  Kanban,
  LayoutDashboard,
  LogOut,
  Menu,
  Moon,
  PieChart,
  Plus,
  Search,
  Settings,
  Sparkles,
  Sun,
  UserRound,
  Users,
  UsersRound,
} from "lucide-react";
import { useEffect, useState, type ReactNode } from "react";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "@/components/ui/sheet";
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip";
import { useTheme } from "@/components/theme-provider";
import { cn } from "@/lib/utils";

type NavItem = { to: string; label: string; icon: typeof Users };

const NAV: Array<{ group: string; items: NavItem[] }> = [
  {
    group: "Overview",
    items: [
      { to: "/", label: "Dashboard", icon: LayoutDashboard },
      { to: "/reports", label: "Reports & analytics", icon: PieChart },
    ],
  },
  {
    group: "People",
    items: [
      { to: "/employees", label: "Employees", icon: Users },
      { to: "/departments", label: "Departments", icon: Building2 },
      { to: "/attendance", label: "Attendance", icon: CalendarCheck },
      { to: "/leave", label: "Leave", icon: ClipboardList },
      { to: "/hr-operations", label: "HR operations", icon: UsersRound },
    ],
  },
  {
    group: "Recruiting",
    items: [
      { to: "/jobs", label: "Job positions", icon: ClipboardList },
      { to: "/candidates", label: "Applicants", icon: UserRound },
      { to: "/talent-search", label: "Find candidates", icon: Search },
      { to: "/ai-matching", label: "AI matching", icon: Brain },
      { to: "/pipeline", label: "Pipeline", icon: Kanban },
      { to: "/upload-cv", label: "Upload CV", icon: FileUp },
    ],
  },
  {
    group: "Account",
    items: [{ to: "/settings", label: "Settings", icon: Settings }],
  },
];

const LABELS = Object.fromEntries(
  NAV.flatMap((g) => g.items).map((i) => [i.to, i.label] as const),
);

function Brand({ collapsed }: { collapsed: boolean }) {
  return (
    <Link to="/" className="flex items-center gap-2.5 px-3 py-4">
      <span className="grid size-8 shrink-0 place-items-center rounded-lg gradient-brand text-primary-foreground shadow-md">
        <Sparkles className="size-4" />
      </span>
      {!collapsed && (
        <span className="min-w-0">
          <span className="block truncate text-sm font-semibold text-sidebar-accent-foreground">
            Northwind
          </span>
          <span className="block truncate text-[11px] text-sidebar-foreground/60">
            HR &amp; AI Talent
          </span>
        </span>
      )}
    </Link>
  );
}

function NavList({
  collapsed,
  onNavigate,
}: {
  collapsed: boolean;
  onNavigate?: () => void;
}) {
  return (
    <nav className="flex-1 space-y-5 overflow-y-auto px-2 pb-4">
      {NAV.map((group) => (
        <div key={group.group}>
          {!collapsed && (
            <p className="px-3 pb-1.5 text-[10px] font-semibold tracking-[0.09em] text-sidebar-foreground/45 uppercase">
              {group.group}
            </p>
          )}
          <ul className="space-y-0.5">
            {group.items.map((item) => (
              <li key={item.to}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Link
                      to={item.to}
                      onClick={onNavigate}
                      activeOptions={{ exact: item.to === "/" }}
                      activeProps={{
                        "data-active": "true",
                        className: "bg-sidebar-accent text-sidebar-accent-foreground",
                      }}
                      className={cn(
                        "group relative flex items-center gap-2.5 rounded-lg px-3 py-2 text-[13px] font-medium text-sidebar-foreground/85 transition-colors hover:bg-sidebar-accent/70 hover:text-sidebar-accent-foreground",
                        collapsed && "justify-center px-0",
                      )}
                    >
                      <span className="absolute left-0 top-1/2 h-0 w-[3px] -translate-y-1/2 rounded-r-full bg-sidebar-primary transition-all group-data-[active=true]:h-5" />
                      <item.icon className="size-4 shrink-0" />
                      {!collapsed && <span className="truncate">{item.label}</span>}
                    </Link>
                  </TooltipTrigger>
                  {collapsed && <TooltipContent side="right">{item.label}</TooltipContent>}
                </Tooltip>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </nav>
  );
}

function SidebarFooter({ collapsed }: { collapsed: boolean }) {
  if (collapsed) return null;
  return (
    <div className="m-2 rounded-xl border border-sidebar-border bg-sidebar-accent/60 p-3">
      <p className="text-xs font-semibold text-sidebar-accent-foreground">AI credits</p>
      <p className="mt-0.5 text-[11px] text-sidebar-foreground/65">1,240 of 2,000 used</p>
      <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-sidebar-border">
        <div className="h-full w-[62%] rounded-full bg-sidebar-primary" />
      </div>
    </div>
  );
}

function Breadcrumbs() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  const parts = pathname.split("/").filter(Boolean);
  const crumbs = parts.map((_, i) => "/" + parts.slice(0, i + 1).join("/"));

  return (
    <div className="hidden items-center gap-1.5 text-[13px] text-muted-foreground md:flex">
      <Link to="/" className="transition-colors hover:text-foreground">
        Northwind
      </Link>
      {crumbs.map((path, i) => (
        <span key={path} className="flex items-center gap-1.5">
          <span className="text-border-strong">/</span>
          <span className={cn(i === crumbs.length - 1 && "font-medium text-foreground")}>
            {LABELS[path] ?? decodeURIComponent(parts[i] ?? "").replace(/-/g, " ")}
          </span>
        </span>
      ))}
    </div>
  );
}

function Topbar({
  collapsed,
  setCollapsed,
}: {
  collapsed: boolean;
  setCollapsed: (v: boolean) => void;
}) {
  const { theme, toggle } = useTheme();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-30 flex h-14 items-center gap-3 border-b border-border bg-surface/85 px-4 backdrop-blur-xl">
      <Sheet open={mobileOpen} onOpenChange={setMobileOpen}>
        <SheetTrigger asChild>
          <Button variant="ghost" size="icon-sm" className="lg:hidden" aria-label="Open navigation">
            <Menu />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[266px] border-sidebar-border bg-sidebar p-0">
          <SheetTitle className="sr-only">Navigation</SheetTitle>
          <div className="flex h-full flex-col">
            <Brand collapsed={false} />
            <NavList collapsed={false} onNavigate={() => setMobileOpen(false)} />
            <SidebarFooter collapsed={false} />
          </div>
        </SheetContent>
      </Sheet>

      <Button
        variant="ghost"
        size="icon-sm"
        className="hidden lg:inline-flex"
        aria-label={collapsed ? "Expand sidebar" : "Collapse sidebar"}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? <ChevronsRight /> : <ChevronsLeft />}
      </Button>

      <Breadcrumbs />

      <div className="ml-auto flex items-center gap-1.5">
        <label className="relative hidden sm:block">
          <Search className="pointer-events-none absolute left-2.5 top-1/2 size-3.5 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            placeholder="Search people, jobs, candidates…"
            aria-label="Global search"
            className="h-8 w-52 rounded-lg border border-border bg-surface-muted pl-8 pr-14 text-[13px] text-foreground placeholder:text-muted-foreground focus:w-72 focus:border-primary/40 focus:bg-surface focus:outline-none focus:ring-2 focus:ring-ring/25 transition-[width,background-color,border-color] xl:w-64"
          />
          <kbd className="pointer-events-none absolute right-2 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-surface px-1.5 py-0.5 text-[10px] text-muted-foreground xl:block">
            ⌘K
          </kbd>
        </label>

        <Button asChild variant="soft" size="sm" className="hidden md:inline-flex">
          <Link to="/jobs/new">
            <Plus /> New job
          </Link>
        </Button>

        <Button variant="ghost" size="icon-sm" aria-label="Toggle theme" onClick={toggle}>
          {theme === "dark" ? <Sun /> : <Moon />}
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon-sm" aria-label="Notifications" className="relative">
              <Bell />
              <span className="absolute right-1.5 top-1.5 size-1.5 rounded-full bg-destructive ring-2 ring-surface" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {[
              ["3 leave requests awaiting approval", "People Ops · 12 min ago"],
              ["Meera Iyer accepted the offer", "Recruiting · 1 h ago"],
              ["AI matching finished for ML Engineer", "AI · 2 h ago"],
            ].map(([title, meta]) => (
              <DropdownMenuItem key={title} className="flex-col items-start gap-0.5 py-2">
                <span className="text-[13px] font-medium text-foreground">{title}</span>
                <span className="text-[11px] text-muted-foreground">{meta}</span>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="ml-1 flex items-center gap-2 rounded-lg p-0.5 pr-1.5 transition-colors hover:bg-accent"
              aria-label="Account menu"
            >
              <span className="grid size-7 place-items-center rounded-md gradient-brand text-[11px] font-semibold text-primary-foreground">
                SM
              </span>
              <span className="hidden text-left leading-tight xl:block">
                <span className="block text-[12px] font-medium text-foreground">Sofia M.</span>
                <span className="block text-[10px] text-muted-foreground">People Ops Lead</span>
              </span>
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel className="font-normal">
              <span className="block text-[13px] font-medium">Sofia Marchetti</span>
              <span className="block text-[11px] text-muted-foreground">sofia@northwind.com</span>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/settings">Profile & settings</Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/reports">My reports</Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/auth">
                <LogOut className="size-4" /> Sign out
              </Link>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  );
}

export function AppShell({ children }: { children: ReactNode }) {
  const [collapsed, setCollapsed] = useState(false);

  useEffect(() => {
    setCollapsed(window.localStorage.getItem("nw-sidebar") === "collapsed");
  }, []);

  useEffect(() => {
    window.localStorage.setItem("nw-sidebar", collapsed ? "collapsed" : "expanded");
  }, [collapsed]);

  return (
    <TooltipProvider delayDuration={120}>
      <div className="flex min-h-screen bg-background">
        <aside
          className={cn(
            "sticky top-0 hidden h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 lg:flex",
            collapsed ? "w-[68px]" : "w-[248px]",
          )}
        >
          <Brand collapsed={collapsed} />
          <NavList collapsed={collapsed} />
          <SidebarFooter collapsed={collapsed} />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar collapsed={collapsed} setCollapsed={setCollapsed} />
          <main className="mx-auto w-full max-w-[1440px] flex-1 px-4 py-6 sm:px-6 lg:px-8">
            {children}
          </main>
        </div>
      </div>
    </TooltipProvider>
  );
}

export function PageHeader({
  title,
  subtitle,
  actions,
}: {
  title: string;
  subtitle?: string;
  actions?: ReactNode;
}) {
  return (
    <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
      <div className="min-w-0">
        <h1 className="text-display text-foreground">{title}</h1>
        {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
      </div>
      {actions && <div className="flex shrink-0 flex-wrap items-center gap-2">{actions}</div>}
    </div>
  );
}
