const fs = require('fs')

module.exports.kebab = s => s.toLowerCase().replace(/[^\w.]/g, '-')
module.exports.camelCase = s => {
  const matches = Array.from(s.matchAll(/[a-zA-Z0-9]+/g))
  return (
    matches[0][0].toLowerCase() +
    matches
      .slice(1)
      .map(([item]) => item[0].toUpperCase() + item.substr(1).toLowerCase())
      .join('')
  )
}

module.exports.cleanFilename = filename =>
  filename
    .toLowerCase()
    .replace(/[^\w.]/g, '_')
    .replace(/^_+|_+$/g, '')

module.exports.ensureDirExists = dir => {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
}

module.exports.mergeDeep = mergeDeep

function mergeDeep(target, source) {
  const isObject = obj => obj && typeof obj === 'object'

  if (!isObject(target) || !isObject(source)) {
    return source
  }

  Object.keys(source).forEach(key => {
    const targetValue = target[key]
    const sourceValue = source[key]

    if (Array.isArray(targetValue) && Array.isArray(sourceValue)) {
      target[key] = targetValue.concat(sourceValue)
    } else if (isObject(targetValue) && isObject(sourceValue)) {
      target[key] = mergeDeep(Object.assign({}, targetValue), sourceValue)
    } else {
      target[key] = sourceValue
    }
  })

  return target
}
