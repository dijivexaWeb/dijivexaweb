"use client";

import { Bell, ChevronDown } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";

interface TopbarProps {
  title: string;
}

export function Topbar({ title }: TopbarProps) {
  return (
    <header className="h-16 bg-[#0B172A] border-b border-[#1e2d45] flex items-center justify-between px-6">
      <h1 className="text-white font-semibold text-lg">{title}</h1>
      <div className="flex items-center gap-4">
        <button className="text-[#64748B] hover:text-white transition-colors relative">
          <Bell className="w-5 h-5" />
        </button>
        <div className="flex items-center gap-2 cursor-pointer">
          <Avatar className="w-8 h-8">
            <AvatarFallback className="bg-[#2563EB] text-white text-xs">AD</AvatarFallback>
          </Avatar>
          <span className="text-sm text-[#94a3b8]">Admin</span>
          <ChevronDown className="w-4 h-4 text-[#64748B]" />
        </div>
      </div>
    </header>
  );
}
