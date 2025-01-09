import {
  createComment,
  deleteComment,
} from './Comments'


const httpCreated = 201
const httpNoContent = 204

describe('net/github/Comments', () => {
  it('successfully create comment', async () => {
    const res = await createComment({orgName: 'pablo-mayrgundter', name: 'Share'}, 1, {title: 'title', body: 'body'})
    expect(res.status).toEqual(httpCreated)
  })

  it('successfully delete comment', async () => {
    const res = await deleteComment({orgName: 'pablo-mayrgundter', name: 'Share'}, 1)
    expect(res.status).toEqual(httpNoContent)
  })
})
