# Poker Planning App Backend (NestJS)

This is a NestJS backend for a poker-planning app using WebSockets (Socket.IO).

## Features
- Real-time rooms for poker planning
- Join, vote, reveal, and reset actions
- Idiomatic NestJS gateway/service/module structure

## Getting Started

### Install dependencies
```
npm install
```

### Run the server
```
npm run start:dev
```

The WebSocket server will be available at `ws://localhost:3000` (Socket.IO protocol).

## WebSocket Events
- `join` — Join a room: `{ room, user }`
- `vote` — Submit a vote: `{ room, user, value }`
- `reveal` — Reveal all votes: `{ room }`
- `reset` — Reset votes: `{ room }`
- `state` — Server emits current room state

## Project Structure
- `src/poker.gateway.ts` — Main WebSocket gateway
- `src/app.module.ts` — Registers the gateway

---

For more details, see the code and comments.
