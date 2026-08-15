import { defineConfig, loadEnv, type Plugin } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

function mailerDevPlugin(env: Record<string, string>): Plugin {
  return {
    name: "vite-mailer-dev-server",
    configureServer(server) {
      // Sync loaded env with process.env for Node modules
      Object.assign(process.env, env);

      server.middlewares.use("/api/send-email", (req, res) => {
        if (req.method === "OPTIONS") {
          res.statusCode = 200;
          res.setHeader("Access-Control-Allow-Origin", "*");
          res.setHeader("Access-Control-Allow-Methods", "POST, OPTIONS");
          res.setHeader("Access-Control-Allow-Headers", "Content-Type");
          res.end();
          return;
        }

        if (req.method !== "POST") {
          res.statusCode = 405;
          res.setHeader("Content-Type", "application/json");
          res.end(JSON.stringify({ success: false, error: "Method not allowed. Use POST." }));
          return;
        }

        let body = "";
        req.on("data", (chunk: any) => {
          body += chunk;
        });
        req.on("end", async () => {
          try {
            const data = JSON.parse(body || "{}");
            const { sendEnquiryEmail } = await import("./server/mailService");
            const result = await sendEnquiryEmail(data);
            res.statusCode = result.success ? 200 : 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify(result));
          } catch (err: any) {
            res.statusCode = 500;
            res.setHeader("Content-Type", "application/json");
            res.end(JSON.stringify({ success: false, error: err?.message || "Server error" }));
          }
        });
      });
    },
  };
}

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), "");

  return {
    server: {
      host: "::",
      port: 8080,
    },
    plugins: [
      react(),
      mailerDevPlugin(env),
    ].filter(Boolean),
    resolve: {
      alias: {
        "@": path.resolve(__dirname, "./src"),
      },
    },
  };
});
