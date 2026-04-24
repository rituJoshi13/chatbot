import concurrently from "concurrently";

concurrently([
  {
    name: "client",
    command: "npm run dev",
    cwd: "packages/client",
    prefixColor: "blue",
  },
  {
    name: "server",
    command: "npm run dev",
    cwd: "packages/server",
    prefixColor: "green",
  },
]);
