const format = require('string-format')
const objectPath = require('object-path')
const varRegExp = /<[\w\d._$]+>/g;
const replace_vars = (vars, m) => {
    m = m.replace('<', '').replace('>', '')
    return objectPath.get(vars, m)
}



module.exports = {
    formatStr(template, options = {}) {
        return format(template, options)
    },
    replaceVars(context, options = {}, vars = {}) {
        for (let key in options) {
            let prop = options[key]
            if (typeof prop === 'string') {
                prop = format(prop, context)
                prop = prop.replace(varRegExp, replace_vars.bind(this, vars))
            } else if (prop.constructor === Array) {
                prop = this.replaceVars(context, prop, vars)
            }

            options[key] = prop
        }
        return options
    }
}