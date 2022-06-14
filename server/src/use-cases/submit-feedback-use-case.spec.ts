import { SubmitFeedbackUseCase } from './submit-feedback-use-case'

const createFeedbackSpy = jest.fn()
const createMailSpy = jest.fn()

const submitFeedback = new SubmitFeedbackUseCase(
  { create: createFeedbackSpy },
  { sendMail: createMailSpy },
)

describe('Submit feedback', () => {
  it('should be able to submit a feedback', async () => {
    await expect(
      submitFeedback.execute({
        type: 'BUG',
        comment: 'exemple comment',
        screenshot: 'data:image/png;base64test:test.jpg',
      }),
    ).resolves.not.toThrow()

    expect(createFeedbackSpy).toHaveBeenCalled()
    expect(createMailSpy).toHaveBeenCalled()
  })
})

it('should not be able to submit feedback without type', async () => {
  await expect(
    submitFeedback.execute({
      type: '',
      comment: 'exemple comment',
      screenshot: 'data:image/png;base64test:test.jpg',
    }),
  ).rejects.toThrow()
})

it('should not be able to submit feedback without comment', async () => {
  await expect(
    submitFeedback.execute({
      type: 'BUG',
      comment: '',
      screenshot: 'data:image/png;base64test:test.jpg',
    }),
  ).rejects.toThrow()
})

it('should not be able to submit feedback with invalid screenshot', async () => {
  await expect(
    submitFeedback.execute({
      type: 'BUG',
      comment: 'example comment',
      screenshot: 'test.jpg',
    }),
  ).rejects.toThrow()
})
