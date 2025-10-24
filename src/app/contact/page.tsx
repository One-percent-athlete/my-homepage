import Contact from "@/components/Contact";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact | Professional Services - Ski, Travel & Web Development",
  description: "Get in touch with Ryu for collaborations, projects, or professional services across ski instruction, travel adventures, and web development.",
};

export default function ContactPage() {
  return <Contact />;
}