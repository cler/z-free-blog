import Header from "@/components/shared/header";
import ProjectList from "@/components/shared/project-list";
import Video from "@/components/shared/video";

export default function Home() {
  return (
    <main>
      <Header className="-translate-y-full" />
      <Video />
      <ProjectList />
    </main>
  );
}
