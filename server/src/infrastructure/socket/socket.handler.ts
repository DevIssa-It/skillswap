import { Server as SocketIOServer, Socket } from 'socket.io';

// Map userId → socketId for targeted notifications
const userSocketMap = new Map<string, string>();

export function setupSocketHandlers(io: SocketIOServer): void {
  io.on('connection', (socket: Socket) => {
    console.log(`🔌 Socket connected: ${socket.id}`);

    // User joins their personal room
    socket.on('join', ({ userId }: { userId: string }) => {
      if (userId) {
        socket.join(`user:${userId}`);
        userSocketMap.set(userId, socket.id);
        console.log(`👤 User ${userId} joined room`);
      }
    });

    socket.on('disconnect', () => {
      // Clean up map entry
      for (const [userId, socketId] of userSocketMap.entries()) {
        if (socketId === socket.id) {
          userSocketMap.delete(userId);
          break;
        }
      }
      console.log(`🔌 Socket disconnected: ${socket.id}`);
    });
  });
}

// Helper — emit to a specific user's room
export function emitToUser(
  io: SocketIOServer,
  userId: string,
  event: string,
  data: unknown
): void {
  io.to(`user:${userId}`).emit(event, data);
}
