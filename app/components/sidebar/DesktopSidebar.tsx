"use client";

import { useState } from "react";
import { User } from "@prisma/client";

import useRoutes from "@/app/hooks/useRoutes";
import DesktopItem from "./DesktopItem";
import Avatar from "../Avatar";
import SettingsModal from "./SettingsModal";
import Image from "next/image";

interface DesktopSidebarProps {
  currentUser: User;
}

export default function DesktopSidebar({ currentUser }: DesktopSidebarProps) {
  const routes = useRoutes();
  const [isOpen, setIsOpen] = useState(false);

  console.log(currentUser);

  return (
    <>
      <SettingsModal
        currentUser={currentUser}
        isOpen={isOpen}
        onClose={() => setIsOpen(false)}
      />
      <div className="hidden lg:fixed lg: inset-y-0 lg:left-0 lg:z-40 lg:w-20 xl:px-6 lg:overflow-auto lg:bg-white lg:border-r-[1px] lg:border-r-slate-100 lg:pb-4 lg:flex lg:flex-col justify-between max-w-[60px]">
        <nav className="mt-4 flex flex-col justify-between">
          <ul role="list" className="flex flex-col items-center gap-[10px]">
            <Image
              src={"/images/logo.png"}
              width={40}
              height={40}
              alt="Logo"
              className="mb-[10px]"
            />

            {routes.map(({ label, href, icon, active, onClick }) => (
              <DesktopItem
                key={label}
                href={href}
                label={label}
                icon={icon}
                active={active}
                onClick={onClick}
              />
            ))}
          </ul>
        </nav>
        <nav className="mt-4 flex flex-col justify-between items-center">
          <div
            onClick={() => setIsOpen(true)}
            className="cursor-pointer hover:opacity-75 transition"
          >
            <Avatar user={currentUser} />
          </div>
        </nav>
      </div>
    </>
  );
}
