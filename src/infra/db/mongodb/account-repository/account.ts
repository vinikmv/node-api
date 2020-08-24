import { AddAccountRepository } from '../../../../data/protocols/db/add-account-repository'
import { AddAccountModel } from '../../../../domain/usecases/add-account'
import { AccountModel } from '../../../../domain/models/account'
import { MongoHelper } from '../helpers/mongo-helper'
import { LoadAccountByEmailRepository } from '../../../../data/protocols/db/load-account-by-email-repository'

export class AccountMongoRepository implements AddAccountRepository, LoadAccountByEmailRepository {
  async add (accountData: AddAccountModel): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const result = await accountCollection.insertOne(accountData)
    return MongoHelper.map(result.ops[0])
  }

  async loadByEmail (email: string): Promise<AccountModel> {
    const accountCollection = await MongoHelper.getCollection('accounts')
    const account = await accountCollection.findOne({ email })
    return account && MongoHelper.map(account)
  }
}

// Na primeira realização do teste, o mesmo não passou devido ao mongoDB retornar como default _id ao contrário de id, como definido no modelo de negócio (AccountModel).
// Não é recomendável editar o modelo de negócio para atender uma exigência do MongoDB, assim como alterar o retorno do mongoDB para id, visto que pode se tornar um problema no futuro.
// A solução para o problema utilizou a desestruturação do JavaScript para retornar o valor corretamente sem alterar o objeto do MongoDB
