import React, { memo } from "react";
import styles from "./BlogPreview.module.css";
import PreviewSection from "@/components/ui/previewSection/PreviewSection";
import { PreviewSectionProps } from "../audio-preview/AudioPreview";
import PostPreview from "@/components/ui/postPreview/PostPreview";
import { Category } from "../video-catalog/VideoCatalog";

export type Post = {
  __typename?: "Post";
  documentId: string;
  Slug: string;
  PostTitle: string;
  PostPreviewContent?: string | null;
  locale?: string | null;
  Date?: any | null;
  PostCategory?: Category;
} | null;

export type BlogPreviewProps = {
  posts: Array<Post>;
} & PreviewSectionProps;
export default memo(function BlogPreview({
  title,
  locale,
  posts,
}: BlogPreviewProps) {
  return (
    <PreviewSection
      title={title}
      locale={locale}
      directedPageSlug="blog"
      linkText={{ en: "All posts", ru: "Все cтатьи" }}
    >
      <div className={styles.wrapper}>
        <ul className={styles.list}>
          {posts.map((post) => (
            <PostPreview 
              className=" min-h-[320px] md:min-h-[276px] sm:w-[320px] sm:min-h-[410px] shrink-0" 
              key={post?.documentId} 
              post={post}
            />
          ))}
          <li className="hidden sm:block w-[1px] shrink-0"></li>
        </ul>
      </div>
    </PreviewSection>
  );
});
