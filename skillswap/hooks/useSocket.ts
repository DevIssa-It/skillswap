'use client';

import { useEffect, useRef } from 'react';
import { connectSocket, disconnectSocket, getSocket } from '@/lib/socket';
import { MatchFoundEvent, MatchAcceptedEvent } from '@/types';

interface UseSocketOptions {
  userId?: string;
  onMatchFound?: (event: MatchFoundEvent) => void;
  onMatchAccepted?: (event: MatchAcceptedEvent) => void;
}

export function useSocket({ userId, onMatchFound, onMatchAccepted }: UseSocketOptions) {
  const listenersAttached = useRef(false);

  useEffect(() => {
    if (!userId) return;

    const socket = connectSocket(userId);

    if (!listenersAttached.current) {
      if (onMatchFound) socket.on('match:found', onMatchFound);
      if (onMatchAccepted) socket.on('match:accepted', onMatchAccepted);
      listenersAttached.current = true;
    }

    return () => {
      // Remove listeners on cleanup
      socket.off('match:found');
      socket.off('match:accepted');
      listenersAttached.current = false;
    };
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [userId]);

  return {
    socket: getSocket(),
    disconnect: disconnectSocket,
  };
}
