import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Member Portal — LABS",
  description: "Your LABS member dashboard",
};

export default function MembersLayout({ children }: { children: React.ReactNode }) {
  return <>{children}</>;
}
