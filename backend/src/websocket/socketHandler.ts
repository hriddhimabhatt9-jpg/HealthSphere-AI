// ============================================================================
// HealthSphere AI — WebSocket Handler
// Real-time communication for video signaling and notifications
// ============================================================================

import { Server as SocketIOServer, Socket } from 'socket.io';
import { logger } from '../utils/logger';

interface VideoRoom {
  participants: Map<string, string>; // socketId -> userId
}

const videoRooms = new Map<string, VideoRoom>();

export function setupWebSocket(io: SocketIOServer): void {
  io.on('connection', (socket: Socket) => {
    logger.info('Client connected', { socketId: socket.id });

    // ── Video Signaling ───────────────────────────────────────────────

    socket.on('join-room', (roomId: string, userId: string) => {
      socket.join(roomId);

      if (!videoRooms.has(roomId)) {
        videoRooms.set(roomId, { participants: new Map() });
      }

      const room = videoRooms.get(roomId)!;
      room.participants.set(socket.id, userId);

      // Notify other participants
      socket.to(roomId).emit('user-joined', { userId, socketId: socket.id });
      logger.info('User joined room', { roomId, userId, socketId: socket.id });
    });

    socket.on('offer', (data: { roomId: string; offer: RTCSessionDescriptionInit; to: string }) => {
      socket.to(data.to).emit('offer', {
        offer: data.offer,
        from: socket.id,
      });
    });

    socket.on('answer', (data: { roomId: string; answer: RTCSessionDescriptionInit; to: string }) => {
      socket.to(data.to).emit('answer', {
        answer: data.answer,
        from: socket.id,
      });
    });

    socket.on('ice-candidate', (data: { roomId: string; candidate: RTCIceCandidateInit; to: string }) => {
      socket.to(data.to).emit('ice-candidate', {
        candidate: data.candidate,
        from: socket.id,
      });
    });

    socket.on('leave-room', (roomId: string) => {
      socket.leave(roomId);
      const room = videoRooms.get(roomId);
      if (room) {
        room.participants.delete(socket.id);
        if (room.participants.size === 0) {
          videoRooms.delete(roomId);
        }
      }
      socket.to(roomId).emit('user-left', { socketId: socket.id });
      logger.info('User left room', { roomId, socketId: socket.id });
    });

    // ── Notifications ─────────────────────────────────────────────────

    socket.on('subscribe-notifications', (userId: string) => {
      socket.join(`user-${userId}`);
      logger.debug('User subscribed to notifications', { userId });
    });

    // ── Disconnect ────────────────────────────────────────────────────

    socket.on('disconnect', () => {
      // Clean up from all rooms
      for (const [roomId, room] of videoRooms.entries()) {
        if (room.participants.has(socket.id)) {
          room.participants.delete(socket.id);
          socket.to(roomId).emit('user-left', { socketId: socket.id });
          if (room.participants.size === 0) {
            videoRooms.delete(roomId);
          }
        }
      }
      logger.info('Client disconnected', { socketId: socket.id });
    });
  });
}
