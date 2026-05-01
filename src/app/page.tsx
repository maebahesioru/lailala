import { MainLayout } from "@/components/main-layout";
import { CommentFeed } from "@/components/comment-feed";

export default function Home() {
  return (
    <MainLayout>
      <CommentFeed videoId="niKAylKNIEI" />
    </MainLayout>
  );
}
