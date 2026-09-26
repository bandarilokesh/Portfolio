import { existsSync } from "node:fs";
import path from "node:path";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Philosophy } from "@/components/sections/Philosophy";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Recognition } from "@/components/sections/Recognition";
import { Contact } from "@/components/sections/Contact";

/** Drop a photo named profile.(jpg|jpeg|png|webp) into /public to show it in the hero. */
function findProfilePhoto() {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (existsSync(path.join(process.cwd(), "public", `profile.${ext}`))) return `/profile.${ext}`;
  }
  return null;
}

/** Drop a résumé named resume.pdf into /public to show a download button in the contact section. */
function findResume() {
  return existsSync(path.join(process.cwd(), "public", "resume.pdf")) ? "/resume.pdf" : null;
}

export default function Home() {
  const photo = findProfilePhoto();
  const resume = findResume();

  return (
    <>
      <Navbar resume={resume} />
      <main>
        <Hero photo={photo} />
        <Philosophy />
        <Skills />
        <Projects />
        <Recognition />
      </main>
      <Contact resume={resume} />
    </>
  );
}
