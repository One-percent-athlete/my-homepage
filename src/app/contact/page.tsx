import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | One Percent 37x",
  description: "Get in touch with Ryu for collaborations, projects, or inquiries.",
};

export default function ContactPage() {
  return <Contact />;
}
