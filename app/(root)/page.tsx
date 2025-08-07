import Header from "@/components/shared/header";
import ProjectList from "@/components/shared/project-list";
import Video from "@/components/shared/video";

export default function Home() {
  return (
    <main>
      <Header className="-translate-y-full fixed top-0 left-0 right-0 z-50" />
      <Video />
      <ProjectList />
    </main>
  );
}
