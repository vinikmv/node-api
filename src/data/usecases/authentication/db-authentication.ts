import { Authentication, AuthenticationModel } from '../../../domain/usecases/authentication'
import { LoadAccountByEmailRepository } from '../../protocols/load-account-by-email-repository'

export class DbAuthentication implements Authentication {
  private readonly loadAccountByEmailReposity: LoadAccountByEmailRepository

  constructor (loadAccountByEmailReposity: LoadAccountByEmailRepository) {
    this.loadAccountByEmailReposity = loadAccountByEmailReposity
  }

  async auth (authentication: AuthenticationModel): Promise<string> {
    await this.loadAccountByEmailReposity.load(authentication.email)
    return null
  }
}
