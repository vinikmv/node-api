import { SurveyModel } from '../models/survey'

export interface LoadSurveys {
  loadById: (id: string) => Promise<SurveyModel>
}
