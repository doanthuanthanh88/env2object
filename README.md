# env-js-loader
Load environment variables from Object, files, OS and convert to Object

# Example

```javascript
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

/*
Return: 
{
  NODE_ENV: 'development',
  REDIS: { 
    URI: 'redis-prod-server', 
    OPTIONS: { 
      opt_name: 'dev env' 
    } 
  }
}
*/
```

File _.env.dev_
```sh
# App config
PORT=3000
NODE_ENV=development
REDIS.OPTIONS.opt_name=dev env
```

File _.env.pro_
```sh
# App config
PORT=3000
NODE_ENV=production
REDIS.URI=redis-prod-server
REDIS.OPTIONS.opt_name=prod env
```