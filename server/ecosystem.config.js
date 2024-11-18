module.exports = {
  apps: [
    {
      name: "inventory-management",
      script: "npm run dev",
      args: "run dev",
      env: {
        NODE_ENV: "development",
        ENV_VAR1: "environment-variable",
      },
    },
  ],
};
