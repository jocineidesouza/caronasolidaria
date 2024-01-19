export const setConta = (context, { self, conta }) => {
  context.commit('conta', conta)
  context.commit('isAdmin', conta.admin || false)
  // context.commit('isLoading', false)
}

export const logoff = (context, { self }) => {
  context.commit('conta', null)
  context.commit('isLoading', true)
}

export const login = (context, { self }) => {
  context.commit('isLoading', false)
}
