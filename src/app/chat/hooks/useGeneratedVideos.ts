"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import type { GeneratedVideo } from "@/lib/chat-types";
import {
  deleteGeneratedVideo,
  fetchGeneratedVideos,
  pollVideoStatus,
  requestVideoGeneration,
  type RequestVideoParams,
} from "../services/chat-api";

export function useGeneratedVideos(
  activeSessionId: string | null,
  sessionIds: string[],
  enabled: boolean = true
) {
  const [videos, setVideos] = useState<GeneratedVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const activeSessionIdRef = useRef(activeSessionId);
  activeSessionIdRef.current = activeSessionId;

  const loadVideos = useCallback(async () => {
    if (!enabled || !activeSessionId || sessionIds.length === 0) return;
    setIsLoading(true);
    try {
      const list = await fetchGeneratedVideos(activeSessionId, sessionIds);
      setVideos(list);
      setError(null);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load videos");
    } finally {
      setIsLoading(false);
    }
  }, [enabled, activeSessionId, sessionIds]);

  useEffect(() => {
    if (!enabled) return;
    void loadVideos();
  }, [enabled, loadVideos]);

  const pollActiveJobs = useCallback(async () => {
    if (!enabled) return;
    const currentSession = activeSessionIdRef.current;
    if (!currentSession) return;

    setVideos((current) => {
      const pendingJobs = current.filter((v) => v.status === "pending" || v.status === "in_progress");
      if (pendingJobs.length === 0) return current;

      pendingJobs.forEach(async (job) => {
        try {
          const updated = await pollVideoStatus(currentSession, job.id);
          if (updated && (updated.status !== job.status || updated.url !== job.url)) {
            setVideos((prev) => prev.map((item) => (item.id === job.id ? updated : item)));
          }
        } catch {}
      });

      return current;
    });
  }, [enabled]);

  useEffect(() => {
    if (!enabled) return;
    const interval = setInterval(() => {
      void pollActiveJobs();
    }, 10000);
    return () => clearInterval(interval);
  }, [enabled, pollActiveJobs]);

  const generate = useCallback(
    async (params: RequestVideoParams) => {
      if (!activeSessionId) throw new Error("No active session");
      setIsGenerating(true);
      setError(null);
      try {
        const job = await requestVideoGeneration(activeSessionId, params);
        setVideos((prev) => [job, ...prev]);
        return job;
      } catch (err) {
        const msg = err instanceof Error ? err.message : "Video generation failed";
        setError(msg);
        throw err;
      } finally {
        setIsGenerating(false);
      }
    },
    [activeSessionId]
  );

  const removeVideo = useCallback(
    async (videoId: string) => {
      if (!activeSessionId) return;
      setError(null);
      try {
        await deleteGeneratedVideo(activeSessionId, videoId, sessionIds);
        setVideos((current) => current.filter((video) => video.id !== videoId));
      } catch (deleteError) {
        setError(deleteError instanceof Error ? deleteError.message : "Failed to delete video");
      }
    },
    [activeSessionId, sessionIds]
  );

  return {
    videos,
    isLoading,
    isGenerating,
    error,
    generate,
    removeVideo,
    reload: loadVideos,
  };
}
