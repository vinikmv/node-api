export const surveyResultAnswerSchema = {
  type: 'object',
  properties: {
    image: {
      type: 'string'
    },
    answer: {
      type: 'number'
    },
    count: {
      type: 'answer'
    },
    percent: {
      type: 'string'
    }
  },
  required: ['answer', 'count', 'percent']
}
