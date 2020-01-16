const { loadConfig } = require('../lib')

const baseConfig = {
  NODE_ENV: undefined,
  REDIS: {
    URI: 'redis://redis:6379',
    OPTIONS: {
      opt_name: 'base'
    }
  }
}

console.log(
  loadConfig(
    baseConfig, 
    __dirname + '/.env.prod',
    __dirname + '/.env.dev'
  )
)