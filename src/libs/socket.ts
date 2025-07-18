// If you need the API client, import from './api'
// libs/socket.ts
import { io, Socket } from "socket.io-client";

type EventHandler<T> = (payload: T) => void;

let socket: Socket | null = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const handlers: Record<string, EventHandler<any>[]> = {};

export const connectSocket = (url: string) => {
  if (socket) return socket;
  socket = io(url);

  socket.on("connect", () => {
    console.log("[Socket.IO] Connected");
  });

  socket.on("disconnect", () => {
    console.log("[Socket.IO] Disconnected");
    socket = null;
  });

  // Listen for all events registered via onEvent
  Object.keys(handlers).forEach((type) => {
    socket!.on(type, <T>(payload: T) => {
      handlers[type].forEach((cb) => cb(payload));
    });
  });

  return socket;
};

export const sendEvent = <T>(type: string, payload?: T) => {
  if (!socket) {
    console.warn("[Socket.IO] Not connected, cannot send event");
    return;
  }

  if (socket && socket.connected) {
    socket.emit(type, payload);
  }
};

export const socketOnce = <T>(type: string, cb: (payload: T) => void) => {
  if (socket) {
    socket.once(type, cb);
  } else {
    // If not connected yet, connect and then register once
    const socket = connectSocket("ws://localhost:3000");
    socket!.once(type, cb);
  }
};

export const onEvent = <T>(type: string, cb: (payload: T) => void) => {
  if (!handlers[type]) handlers[type] = [];
  handlers[type].push(cb);
  if (socket) {
    socket.on(type, cb);
  }
};

export const offEvent = <T>(type: string, cb: EventHandler<T>) => {
  if (handlers[type]) {
    handlers[type] = handlers[type].filter((fn) => fn !== cb);
    if (socket) {
      socket.off(type, cb);
    }
  }
};

export const disconnectSocket = () => {
  if (socket) {
    console.log("[Socket.IO] Manual disconnect");
    socket.disconnect();
    socket = null;
    Object.keys(handlers).forEach((type) => {
      delete handlers[type];
    });
  }
};
