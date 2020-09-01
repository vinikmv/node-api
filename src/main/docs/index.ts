import { loginPath } from './paths'
import { badRequest, serverError, unauthorized, notFound } from './components'
import { errorSchema, loginParamsSchema, accountSchema } from './schemas'

export default {
  openapi: '3.0.0',
  info: {
    title: 'Node API with Clean Architecture',
    description: 'API do curso de Node para realizar enquetes',
    version: '1.0.0'
  },
  license: {
    name: 'GPL-3.0-or-later',
    url: 'https://spdx.org/licenses/GPL-3.0-or-later.html'
  },
  servers: [{
    url: '/api'
  }],
  tags: [{
    name: 'Login'
  }],
  paths: {
    '/login': loginPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    error: errorSchema
  },
  components: {
    badRequest,
    serverError,
    unauthorized,
    notFound
  }
}
