import React from "react";
import {
  ChevronDown,
  ArrowUp,
  FileText,
  Globe,
  Leaf,
  Shield,
  HardHat,
  Utensils,
  Search,
  Users,
  ClipboardCheck,
  BadgeCheck,
  Calendar,
  BarChart3,
  Wrench,
  RefreshCw,
  Activity,
  MessageSquare,
  Building2,
  Network,
  Briefcase,
  Cpu,
  HeartPulse,
  GraduationCap,
  Scale,
  MessagesSquare,
  Landmark,
  Flag,
  Eye,
  UserCog,
  Cloud,
  Send,
  Rocket,
  TreePine,
  Clipboard,
  Box,
  Layers,
  Award,
  Phone,
  Mail,
  MapPin,
} from "lucide-react";
import { Check } from "lucide-react";

export function ChevronDownIcon({ className }: { className?: string }) {
  return <ChevronDown className={className} aria-hidden />;
}

export function ArrowUpIcon({ className }: { className?: string }) {
  return <ArrowUp className={className} aria-hidden />;
}

// Wrappers using lucide-react icons
export function DocumentIcon({ className }: { className?: string }) {
  return <FileText className={className} aria-hidden />;
}

export function GlobeIcon({ className }: { className?: string }) {
  return <Globe className={className} aria-hidden />;
}

export function LeafIcon({ className }: { className?: string }) {
  return <Leaf className={className} aria-hidden />;
}

export function ShieldIcon({ className }: { className?: string }) {
  return <Shield className={className} aria-hidden />;
}

export function HardHatIcon({ className }: { className?: string }) {
  return <HardHat className={className} aria-hidden />;
}

export function FoodIcon({ className }: { className?: string }) {
  return <Utensils className={className} aria-hidden />;
}

export function SearchIcon({ className }: { className?: string }) {
  return <Search className={className} aria-hidden />;
}

export function UsersIcon({ className }: { className?: string }) {
  return <Users className={className} aria-hidden />;
}

export function ClipboardCheckIcon({ className }: { className?: string }) {
  return <ClipboardCheck className={className} aria-hidden />;
}

export function BadgeCheckIcon({ className }: { className?: string }) {
  return <BadgeCheck className={className} aria-hidden />;
}

export function CalendarIcon({ className }: { className?: string }) {
  return <Calendar className={className} aria-hidden />;
}

export function ReportIcon({ className }: { className?: string }) {
  return <BarChart3 className={className} aria-hidden />;
}

export function ToolsIcon({ className }: { className?: string }) {
  return <Wrench className={className} aria-hidden />;
}

export function RefreshIcon({ className }: { className?: string }) {
  return <RefreshCw className={className} aria-hidden />;
}

export function ActivityIcon({ className }: { className?: string }) {
  return <Activity className={className} aria-hidden />;
}

export function SupportIcon({ className }: { className?: string }) {
  return <MessageSquare className={className} aria-hidden />;
}

export function BuildingIcon({ className }: { className?: string }) {
  return <Building2 className={className} aria-hidden />;
}

export function NetworkIcon({ className }: { className?: string }) {
  return <Network className={className} aria-hidden />;
}

// Home page industry/standards/feature wrappers
export function BriefcaseIcon({ className }: { className?: string }) {
  return <Briefcase className={className} aria-hidden />;
}
export function CpuIcon({ className }: { className?: string }) {
  return <Cpu className={className} aria-hidden />;
}
export function HeartPulseIcon({ className }: { className?: string }) {
  return <HeartPulse className={className} aria-hidden />;
}
export function GraduationCapIcon({ className }: { className?: string }) {
  return <GraduationCap className={className} aria-hidden />;
}
export function ScaleIcon({ className }: { className?: string }) {
  return <Scale className={className} aria-hidden />;
}
export function MessagesSquareIcon({ className }: { className?: string }) {
  return <MessagesSquare className={className} aria-hidden />;
}
export function LandmarkIcon({ className }: { className?: string }) {
  return <Landmark className={className} aria-hidden />;
}
export function BuildingCircleIcon({ className }: { className?: string }) {
  return <Building2 className={className} aria-hidden />;
}
export function FlagIcon({ className }: { className?: string }) {
  return <Flag className={className} aria-hidden />;
}
export function EyeIcon({ className }: { className?: string }) {
  return <Eye className={className} aria-hidden />;
}
export function UserCogIcon({ className }: { className?: string }) {
  return <UserCog className={className} aria-hidden />;
}
export function CloudIcon({ className }: { className?: string }) {
  return <Cloud className={className} aria-hidden />;
}
export function SendIcon({ className }: { className?: string }) {
  return <Send className={className} aria-hidden />;
}
export function RocketIcon({ className }: { className?: string }) {
  return <Rocket className={className} aria-hidden />;
}
export function TreeIcon({ className }: { className?: string }) {
  return <TreePine className={className} aria-hidden />;
}
export function ClipboardIcon({ className }: { className?: string }) {
  return <Clipboard className={className} aria-hidden />;
}
export function CubeIcon({ className }: { className?: string }) {
  return <Box className={className} aria-hidden />;
}
export function LayersIcon({ className }: { className?: string }) {
  return <Layers className={className} aria-hidden />;
}
export function AwardIcon({ className }: { className?: string }) {
  return <Award className={className} aria-hidden />;
}

export function CheckIcon({ className }: { className?: string }) {
  return <Check className={className} aria-hidden />;
}

// Footer contact/social icons
export function PhoneIcon({ className }: { className?: string }) {
  return <Phone className={className} aria-hidden />;
}

export function MailIcon({ className }: { className?: string }) {
  return <Mail className={className} aria-hidden />;
}

export function MapPinIcon({ className }: { className?: string }) {
  return <MapPin className={className} aria-hidden />;
}

export function LinkedinIcon({ className }: { className?: string }) {
  // Inline SVG to avoid dependency on lucide-react icon availability across versions
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="currentColor"
      aria-hidden
    >
      <path d="M4.983 3.5C4.983 4.88 3.88 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1s2.483 1.12 2.483 2.5ZM.3 8.25h4.4V24H.3V8.25Zm7.7 0h4.215v2.142h.06c.587-1.113 2.022-2.285 4.166-2.285 4.459 0 5.28 2.936 5.28 6.754V24h-4.4v-7.02c0-1.675-.03-3.831-2.335-3.831-2.336 0-2.693 1.825-2.693 3.71V24H8V8.25Z"/>
    </svg>
  );
}
