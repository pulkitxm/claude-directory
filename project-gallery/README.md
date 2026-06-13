# Project Gallery

Bun-only local dashboard for browsing this repository's generated homepage demos and launching one selected project at a time.

```bash
cd project-gallery
bun run dev
```

Then open:

```text
http://127.0.0.1:4321
```

The dashboard loads existing `demo.mp4` files without installing project dependencies. Use **Run live** only when you want to install and start a selected project.

## Generate Thumbnails

Create small `thumbnail.webp` files next to each project `demo.mp4`.
Each thumbnail is captured from the one-second mark of the video:

```bash
cd project-gallery
bun run thumbnails
```

Use `bun run thumbnails --force` to regenerate existing thumbnails.

## Behavior

- Package projects install with `bun install` only when `node_modules` is missing.
- Vite projects run with `bun run dev -- --host 127.0.0.1 --port <port> --strictPort`.
- Next projects run with `bun run dev -- -H 127.0.0.1 -p <port>`.
- Static projects are served directly by this gallery server.
- The server binds to `127.0.0.1` and only runs allowlisted commands for discovered project folders.
- **Stop** kills the selected project and removes only known generated artifacts for that project:
  `node_modules`, `dist`, `build`, `.next`, `.vite`, `.turbo`, `coverage`, `bun.lock`, and `bun.lockb`.
  Source files, `package.json`, `package-lock.json`, `demo.mp4`, and `thumbnail.webp` are preserved.
- **Stop all** applies the same stop-and-clean behavior to projects launched in the current gallery session.
