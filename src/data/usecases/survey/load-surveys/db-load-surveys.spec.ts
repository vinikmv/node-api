import { DbLoadSurveys } from './db-load-surveys'
import { LoadSurveysRepository } from './db-load-surveys-protocols'
import { throwError, mockSurveysModels } from '@/domain/test'
import MockDate from 'mockdate'
import { mockLoadSurveysRepository } from '@/data/test'

type SutTypes = {
  sut: DbLoadSurveys
  loadSurveysReposityStub: LoadSurveysRepository
}

const makeSut = (): SutTypes => {
  const loadSurveysReposityStub = mockLoadSurveysRepository()
  const sut = new DbLoadSurveys(loadSurveysReposityStub)
  return {
    sut,
    loadSurveysReposityStub
  }
}

describe('DbLoadSurveys', () => {
  beforeAll(() => {
    MockDate.set(new Date())
  })

  afterAll(() => {
    MockDate.reset()
  })

  test('Should call LoadSurveysRepository', async () => {
    const { sut, loadSurveysReposityStub } = makeSut()
    const loadAllSpy = jest.spyOn(loadSurveysReposityStub, 'loadAll')
    await sut.load()
    expect(loadAllSpy).toHaveBeenCalledWith()
  })

  test('Should return a list of surveys on success', async () => {
    const { sut } = makeSut()
    const surveys = await sut.load()
    expect(surveys).toEqual(mockSurveysModels())
  })

  test('Should throw if LoadSurveysRepository throws', async () => {
    const { sut, loadSurveysReposityStub } = makeSut()
    jest.spyOn(loadSurveysReposityStub, 'loadAll').mockImplementationOnce(throwError)
    const promise = sut.load()
    await expect(promise).rejects.toThrow()
  })
})
