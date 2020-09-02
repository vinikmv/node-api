import { loginPath, surveyPath, signUpPath } from './paths'
import { badRequest, serverError, unauthorized, notFound, forbidden } from './components'
import { errorSchema, loginParamsSchema, signUpParamsSchema, accountSchema, surveyAnswerSchema, surveySchema, surveysSchema, apiKeyAuthSchema, addSurveyParamsSchema } from './schemas'

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
  }, {
    name: 'Enquete'
  }],
  paths: {
    '/login': loginPath,
    '/signup': signUpPath,
    '/surveys': surveyPath
  },
  schemas: {
    account: accountSchema,
    loginParams: loginParamsSchema,
    signUpParams: signUpParamsSchema,
    addSurveyParams: addSurveyParamsSchema,
    error: errorSchema,
    surveys: surveysSchema,
    survey: surveySchema,
    surveyAnswer: surveyAnswerSchema
  },
  components: {
    securitySchemes: {
      apiKeyAuth: apiKeyAuthSchema
    },
    badRequest,
    serverError,
    unauthorized,
    notFound,
    forbidden
  }
}
