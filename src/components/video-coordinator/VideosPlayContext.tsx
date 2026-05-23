import React, {FC, PropsWithChildren, createContext, useCallback, useContext, useMemo, useState} from 'react';

export interface VideoItem {
  id: string;
  isIntersecting: boolean;
  isHovered: boolean;
}

interface CoordinatorState {
  registry: VideoItem[];
  currentSequentialActiveId: string | null;
}

interface VideosPlayContextType {
  activeVideoId: string | null;
  isSingleIntersecting: boolean;
  registerVideo: (id: string) => void;
  unregisterVideo: (id: string) => void;
  updateStatus: (id: string, isIntersecting: boolean, isHovered: boolean) => void;
  onVideoEnded: (id: string) => void;
}

const VideosPlayContext = createContext<VideosPlayContextType | null>(null);

export const VideosPlayProvider: FC<PropsWithChildren> = ({children}) => {
  const [state, setState] = useState<CoordinatorState>({
    registry: [],
    currentSequentialActiveId: null,
  });

  const registerVideo = useCallback((id: string) => {
    setState(prev => {
      if (prev.registry.some(v => v.id === id)) return prev;
      const newRegistry = [...prev.registry, {id, isIntersecting: false, isHovered: false}];

      let nextSeqId = prev.currentSequentialActiveId;
      if (!nextSeqId) {
        const intersecting = newRegistry.filter(v => v.isIntersecting);
        if (intersecting.length > 0) {
          nextSeqId = intersecting[0].id;
        }
      }

      return {
        registry: newRegistry,
        currentSequentialActiveId: nextSeqId,
      };
    });
  }, []);

  const unregisterVideo = useCallback((id: string) => {
    setState(prev => {
      const newRegistry = prev.registry.filter(v => v.id !== id);
      let nextSeqId = prev.currentSequentialActiveId === id ? null : prev.currentSequentialActiveId;

      if (nextSeqId === null || !newRegistry.some(v => v.id === nextSeqId && v.isIntersecting)) {
        const intersecting = newRegistry.filter(v => v.isIntersecting);
        nextSeqId = intersecting.length > 0 ? intersecting[0].id : null;
      }

      return {
        registry: newRegistry,
        currentSequentialActiveId: nextSeqId,
      };
    });
  }, []);

  const updateStatus = useCallback((id: string, isIntersecting: boolean, isHovered: boolean) => {
    setState(prev => {
      const newRegistry = prev.registry.map(v => (v.id === id ? {id, isIntersecting, isHovered} : v));

      let nextSeqId = prev.currentSequentialActiveId;
      const intersecting = newRegistry.filter(v => v.isIntersecting);

      if (intersecting.length === 0) {
        nextSeqId = null;
      } else {
        const isSeqIntersecting = intersecting.some(v => v.id === nextSeqId);
        if (!isSeqIntersecting) {
          nextSeqId = intersecting[0].id;
        }
      }

      return {
        registry: newRegistry,
        currentSequentialActiveId: nextSeqId,
      };
    });
  }, []);

  const onVideoEnded = useCallback((id: string) => {
    setState(prev => {
      const hoveredVideo = prev.registry.find(v => v.isHovered);
      if (hoveredVideo) return prev;

      const intersecting = prev.registry.filter(v => v.isIntersecting);
      if (intersecting.length <= 1) return prev;

      const currentIndex = intersecting.findIndex(v => v.id === id);
      if (currentIndex === -1) return prev;

      const nextIndex = (currentIndex + 1) % intersecting.length;
      const nextSeqId = intersecting[nextIndex].id;

      return {
        ...prev,
        currentSequentialActiveId: nextSeqId,
      };
    });
  }, []);

  const activeVideoId = useMemo(() => {
    const hoveredVideo = state.registry.find(v => v.isHovered);
    if (hoveredVideo) {
      return hoveredVideo.id;
    }
    return state.currentSequentialActiveId;
  }, [state.registry, state.currentSequentialActiveId]);

  const isSingleIntersecting = useMemo(() => {
    return state.registry.filter(v => v.isIntersecting).length <= 1;
  }, [state.registry]);

  const value = useMemo(
    () => ({
      activeVideoId,
      isSingleIntersecting,
      registerVideo,
      unregisterVideo,
      updateStatus,
      onVideoEnded,
    }),
    [activeVideoId, isSingleIntersecting, registerVideo, unregisterVideo, updateStatus, onVideoEnded]
  );

  return <VideosPlayContext.Provider value={value}>{children}</VideosPlayContext.Provider>;
};

export const useVideosPlay = () => {
  const context = useContext(VideosPlayContext);
  if (!context) {
    throw new Error('useVideosPlay must be used within a VideosPlayProvider');
  }
  return context;
};
