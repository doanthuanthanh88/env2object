import * as fs from 'fs'
import { merge } from 'lodash'

export function loadConfig(baseConfig: Object, ...files: object[] | string[]) {
  const castToObject = function (obj, pro, prefix) {
    for (let k in obj) {
      if (typeof obj[k] === 'object') {
        castToObject(obj[k], pro, prefix + k + '.')
      } else if (Array.isArray(obj[k])) {
        for (let i in obj[k]) {
          castToObject(obj[k][i], pro, prefix + k + '.' + i + '.')
        }
      } else {
        if (pro[prefix + k] !== undefined) {
          if (typeof obj[k] === 'boolean') {
            obj[k] = pro[prefix + k] === 'true'
          } else if (typeof obj[k] === 'number') {
            obj[k] = +pro[prefix + k]
          } else {
            obj[k] = pro[prefix + k]
          }
        }
      }
    }
  }

  const config = {}
  files.forEach(file => {
    if (typeof file === 'string') {
      let env = {}
      try {
        if (file && fs.statSync(file)) {
          fs.readFileSync(file).toString().split('\n').map(e => e.trim()).filter(e => e && !e.startsWith('#')).forEach(e => {
            env[e.substr(0, e.indexOf('=')).trim()] = e.substr(e.indexOf('=') + 1).trim()
          })
        }
      } catch (err) {
        console.warn(`Could not found config file at ${file}`)
      }
      merge(config, env)
    } else {
      merge(config, file)
    }
  })
  merge(config, process.env)
  castToObject(baseConfig, config, '')
  return baseConfig
}
