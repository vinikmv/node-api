import { LoadAccountByToken } from '../../../domain/usecases/load-account-by-token'
import { AccountModel } from '../../../domain/models/account'
import { Decrypter } from '../../protocols/cryptography/decrypter'
import { LoadAccountByTokenRepository } from '../../protocols/db/add-account/load-account-by-token-repository'

export class DbLoadAccountByToken implements LoadAccountByToken {
  constructor (
    private readonly decrypter: Decrypter,
    private readonly loadAccountByTokenRepository: LoadAccountByTokenRepository
  ) {}

  async load (accessToken: string, role?: string): Promise<AccountModel> {
    const token = await this.decrypter.decrypt(accessToken)
    if (token) {
      const account = await this.loadAccountByTokenRepository.loadByToken(accessToken, role)
      if (account) {
        return account
      }
    }
    return null
  }
}
