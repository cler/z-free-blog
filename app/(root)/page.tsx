import Header from "@/components/shared/header";
import Video from "@/components/shared/video";
import { getActiveHomeConfig } from "@/lib/actions/homeconfig.action";
import { DEFAULT_HOME_CONFIG } from "@/lib/constants";
import { HomePageConfig } from "@/types";
import { convertToPlainObject } from "@/lib/utils";



export default async function Home() {
  // 使用服务端action获取配置数据
  const result = await getActiveHomeConfig();
  const config: HomePageConfig = result.success && result.data ? convertToPlainObject(result.data) : DEFAULT_HOME_CONFIG;

  return (
    <main>
      <Header 
        className="-translate-y-full fixed top-0 left-0 right-0 z-50" 
        config={config}
      />
      <Video config={config} />
    </main>
  );
}
