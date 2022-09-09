module.exports = {
  apps : [{
    name: "adverto
    script: "./bot.js"
    instances: "max",
    env: {
      NODE_ENV: "development",
    },
    env_production: {
      NODE_ENV: "production",
    }
  }]
}
