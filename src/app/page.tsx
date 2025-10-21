import { getQueryClient, trpc } from "@/trpc/server";
import {dehydrate, HydrationBoundary, useQuery} from "@tanstack/react-query";
import { Client } from "./client";
import { Suspense } from "react";

const Home = () => {
  const queryClient = getQueryClient();

  void queryClient.prefetchQuery(trpc.getUsers.queryOptions());

  return (
    <div className="min-h-screen min-w-screen flex items-center justify-center">
      <HydrationBoundary state={dehydrate(queryClient)}>
        <Suspense fallback={<div>Loading...</div>}>
        <Client />
        </Suspense>
      </HydrationBoundary>
    </div>
  )
};

export default Home;