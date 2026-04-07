'use client';

import { createContext, ReactNode, useContext } from 'react';

export interface RecentBlogPost {
  slug: string;
  title: string;
  date: string;
}

const RecentPostsContext = createContext<RecentBlogPost[]>([]);

export const RecentPostsProvider = ({
  posts,
  children,
}: {
  posts: RecentBlogPost[];
  children: ReactNode;
}) => {
  return <RecentPostsContext.Provider value={posts}>{children}</RecentPostsContext.Provider>;
};

export const useRecentPosts = () => useContext(RecentPostsContext);
