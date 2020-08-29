import { AuthMiddleware } from './auth-middleware'
import { LoadAccountByToken, HttpRequest, AccountModel } from './auth-middleware-protocols'
import { forbidden, ok, serverError } from '@/presentation/helpers/http/http-helper'
import { AccessDeniedError } from '@/presentation/errors'

const makeFakeAccount = (): AccountModel => ({
  id: 'valid_id',
  name: 'valid_name',
  email: 'valid_email@mail.com',
  password: 'hashed_password'
})

const makeFakeRequest = (): HttpRequest => ({
  headers: {
    'x-access-token': 'any_token'
  }
})

const makeLoadAccountBytokenStub = (): LoadAccountByToken => {
  class LoadAccountBytokenStub implements LoadAccountByToken {
    async load (accessToken: string, role?: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(makeFakeAccount()))
    }
  }
  return new LoadAccountBytokenStub()
}

type SutTypes = {
  sut: AuthMiddleware
  loadAccountBytokenStub: LoadAccountByToken
}

const makeSut = (role?: string): SutTypes => {
  const loadAccountBytokenStub = makeLoadAccountBytokenStub()
  const sut = new AuthMiddleware(loadAccountBytokenStub, role)
  return {
    sut,
    loadAccountBytokenStub
  }
}

describe('Auth Middleware', () => {
  test('Should return 403 if no x-access-token exists in headers', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle({})
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should call LoadAccountByToken with correct accessToken', async () => {
    const role = 'any_role'
    const { sut, loadAccountBytokenStub } = makeSut(role)
    const loadSpy = jest.spyOn(loadAccountBytokenStub, 'load')
    await sut.handle(makeFakeRequest())
    expect(loadSpy).toHaveBeenCalledWith('any_token', role)
  })

  test('Should return 403 if LoadAccountByToken returns null', async () => {
    const { sut, loadAccountBytokenStub } = makeSut()
    jest.spyOn(loadAccountBytokenStub, 'load').mockReturnValueOnce(new Promise(resolve => resolve(null)))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(forbidden(new AccessDeniedError()))
  })

  test('Should return 200 if LoadAccountByToken returns an account', async () => {
    const { sut } = makeSut()
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(ok({ accountId: 'valid_id' }))
  })

  test('Should return 500 if LoadAccountByToken throws', async () => {
    const { sut, loadAccountBytokenStub } = makeSut()
    jest.spyOn(loadAccountBytokenStub, 'load').mockReturnValueOnce(new Promise((resolve, reject) => reject(new Error())))
    const httpResponse = await sut.handle(makeFakeRequest())
    expect(httpResponse).toEqual(serverError(new Error()))
  })
})
