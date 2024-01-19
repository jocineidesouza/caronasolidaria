const validarEmail = val => {
  const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return re.test(String(val).toLowerCase())
}

const validarSenha = val => {
  const re = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}$/
  return re.test(String(val))
}

const convertTime = seconds => {
  seconds = parseInt(seconds, 10)
  const hours = Math.floor(seconds / 3600)
  const minutes = Math.floor((seconds - hours * 3600) / 60)
  seconds = seconds - hours * 3600 - minutes * 60

  if (hours) {
    if (minutes) {
      return `${hours}h${minutes}m${seconds}s`
    } else {
      return `${hours}h${seconds}s`
    }
  }
  if (minutes) {
    return `${minutes}m${seconds}s`
  }
  return `${seconds}s`
}

export default async ({ app, router, Vue }) => {
  try {
    window.Vue = Vue
    Vue.prototype.$bus = new Vue()
    Vue.prototype.$validarEmail = validarEmail
    Vue.prototype.$validarSenha = validarSenha
    Vue.prototype.$convertTime = convertTime
  } catch (e) {
    console.error(e)
  }
}
