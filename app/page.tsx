import { existsSync } from "node:fs";
import path from "node:path";
import { Navbar } from "@/components/sections/Navbar";
import { Hero } from "@/components/sections/Hero";
import { Skills } from "@/components/sections/Skills";
import { Projects } from "@/components/sections/Projects";
import { Contact } from "@/components/sections/Contact";

/** Drop a photo named profile.(jpg|jpeg|png|webp) into /public to show it in the hero. */
function findProfilePhoto() {
  for (const ext of ["jpg", "jpeg", "png", "webp"]) {
    if (existsSync(path.join(process.cwd(), "public", `profile.${ext}`))) return `/profile.${ext}`;
  }
  return null;
}

export default function Home() {
  const photo = findProfilePhoto();

  return (
    <>
      <Navbar />
      <main>
        <Hero photo={photo} />
        <Skills />
        <Projects />
      </main>
      <Contact />
    </>
  );
}
