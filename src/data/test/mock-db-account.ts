import { AddAccountRepository } from '@/data/protocols/db/add-account/add-account-repository'
import { AddAccountParams, AccountModel, LoadAccountByEmailRepository } from '@/data/usecases/account/add-account/db-add-account-protocols'
import { LoadAccountByTokenRepository } from '@/data/protocols/db/add-account/load-account-by-token-repository'
import { UpdateAccessTokenRepository } from '@/data/protocols/db/add-account/update-access-token-repository'
import { mockAccountModel } from '@/domain/test'

export const mockAddAccountRepository = (): AddAccountRepository => {
  class AddAccountRepositoryStub implements AddAccountRepository {
    async add (accountData: AddAccountParams): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new AddAccountRepositoryStub()
}

export const mockLoadAccountByEmailRepository = (): LoadAccountByEmailRepository => {
  class LoadAccountByEmailRepositoryStub implements LoadAccountByEmailRepository {
    async loadByEmail (email: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new LoadAccountByEmailRepositoryStub()
}

export const mockLoadAccountByTokenRepository = (): LoadAccountByTokenRepository => {
  class LoadAccountByTokenRepositoryStub implements LoadAccountByTokenRepository {
    async loadByToken (token: string, role?: string): Promise<AccountModel> {
      return await new Promise(resolve => resolve(mockAccountModel()))
    }
  }
  return new LoadAccountByTokenRepositoryStub()
}

export const mockUpdateAccessTokenRepository = (): UpdateAccessTokenRepository => {
  class UpdateAccessTokenRepositoryStub implements UpdateAccessTokenRepository {
    async updateAccessToken (id: string, token: string): Promise<void> {
      return await new Promise(resolve => resolve())
    }
  }
  return new UpdateAccessTokenRepositoryStub()
}
