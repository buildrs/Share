import {
  getDownloadURL,
  parseGitHubRepositoryURL,
  createIssue,
  closeIssue,
  createComment,
  deleteComment,
  getOrganizations,
  getRepositories,
  getFiles,
  getFilesAndFolders,
  MOCK_REPOSITORY,
  MOCK_FILES,
  commitFile,
  getLatestCommitHash,
} from './GitHub'


const httpOK = 200
const httpCreated = 201


describe('GitHub', () => {
  describe('parseGitHubRepositoryURL', () => {
    it('throws an error if given a non-qualified URL', () => {
      expect(() => parseGitHubRepositoryURL('hello'))
          .toThrowError('URL must be fully qualified and contain scheme')
    })

    it('bubbles up an error if standard library cannot parse URL', () => {
      expect(() => parseGitHubRepositoryURL('://dotdotdash.com'))
          .toThrowError()
    })

    it('throws an error if given a non-GitHub repository URL', () => {
      expect(() => parseGitHubRepositoryURL('https://notgithub.com/owner/repository'))
          .toThrowError('Not a valid GitHub repository URL')
    })

    it('returns a repository path structure with correct values', () => {
      const actual = parseGitHubRepositoryURL('https://github.com/pablo-mayrgundter/private/blob/main/haus.ifc')
      expect(actual.owner).toEqual('pablo-mayrgundter')
      expect(actual.repository).toEqual('private')
      expect(actual.ref).toEqual('main')
      expect(actual.path).toEqual('haus.ifc')
    })

    it('returns a repository path structure with correct URL decoded values', () => {
      const actual = parseGitHubRepositoryURL('https://github.com/spaced owner/spaced repo/blob/spaced ref/spaced ifc.ifc')
      expect(actual.owner).toEqual('spaced owner')
      expect(actual.repository).toEqual('spaced repo')
      expect(actual.ref).toEqual('spaced ref')
      expect(actual.path).toEqual('spaced ifc.ifc')
    })
  })

  describe('getContentsURL', () => {
    it('bubbles up an exception for a non-existent object', async () => {
      try {
        await getDownloadURL({orgName: 'bldrs-ai', name: 'Share'}, 'a-file-that-does-not-exists.txt')
      } catch (e) {
        expect(e.toString()).toMatch('Not Found')
      }
    })

    it('returns a valid download URL', async () => {
      const downloadURL = await getDownloadURL({orgName: 'bldrs-ai', name: 'Share'}, 'README.md')
      expect(downloadURL).toEqual('https://raw.githubusercontent.com/bldrs-ai/Share/main/README.md')
    })

    it('returns expected download URL for a valid object within main branch', async () => {
      const downloadURL = await getDownloadURL({orgName: 'bldrs-ai', name: 'Share'}, 'README.md', 'main')
      expect(downloadURL).toEqual('https://raw.githubusercontent.com/bldrs-ai/Share/main/README.md?token=MAINBRANCHCONTENT')
    })

    it('returns a valid download URL when given a different Git ref', async () => {
      const downloadURL = await getDownloadURL({orgName: 'bldrs-ai', name: 'Share'}, 'README.md', 'a-new-branch')
      expect(downloadURL).toEqual('https://raw.githubusercontent.com/bldrs-ai/Share/main/README.md?token=TESTTOKENFORNEWBRANCH')
    })
  })

  describe('post to github', () => {
    it('successfully create note as an issue', async () => {
      const res = await createIssue({orgName: 'bldrs-ai', name: 'Share'}, {title: 'title', body: 'body'})
      expect(res.status).toEqual(httpCreated)
    })

    it('successfully delete the note by closing the issue', async () => {
      const res = await closeIssue({orgName: 'pablo-mayrgundter', name: 'Share'}, 1)
      expect(res.status).toEqual(httpOK)
    })

    it('successfully create comment', async () => {
      const res = await createComment({orgName: 'bldrs-ai', name: 'Share'}, 1, {title: 'title', body: 'body'})
      expect(res.status).toEqual(httpCreated)
    })

    it('successfully delete comment', async () => {
      const res = await deleteComment({orgName: 'bldrs-ai', name: 'Share'}, 1)
      expect(res.status).toEqual(httpOK)
    })
  })

  describe('get models from github', () => {
    it('successfully get repositories', async () => {
      const res = await getRepositories('bldrs-ai')
      expect(res.data).toEqual([MOCK_REPOSITORY])
    })

    it('successfully get files', async () => {
      const res = await getFiles('pablo-mayrgundter', 'Share')
      expect(res).toEqual(MOCK_FILES)
    })

    it('successfully get files and folders', async () => {
      const {files, directories} = await getFilesAndFolders('Share', 'pablo-mayrgundter', '/', '')
      expect(files.length).toEqual(1)
      expect(directories.length).toEqual(1)
    })
  })

  describe('get latest commit hash', () => {
    it('get latest commit hash', async () => {
      const result = await getLatestCommitHash('testowner', 'testrepo', '', '', '')
      expect(result).toEqual('testsha')
    })
  })

  describe('get latest commit hash nonexistent file', () => {
    it('should throw an error when failing to get the latest commit hash', async () => {
      // Simulate failure conditions by passing specific owner and repo that would trigger the error
      await expect(getLatestCommitHash('nonexistentowner', 'nonexistentrepo', '', '', ''))
          .rejects
          .toThrow('File not found')
    })
  })

  describe('get latest commit hash failure case', () => {
    it('should throw an error when failing to get the latest commit hash', async () => {
      // Simulate failure conditions by passing specific owner and repo that would trigger the error
      await expect(getLatestCommitHash('failurecaseowner', 'failurecaserepo', '', '', ''))
          .rejects
          .toThrow('Unknown error: {"sha":"error"}')
    })
  })


  describe('getOrganizations', () => {
    it('encounters an exception if no access token is provided', () => {
      expect(() => getOrganizations()).rejects
          .toThrowError('Arg 0 is not defined')
    })

    it('receives a list of organizations', async () => {
      const orgs = await getOrganizations('testtoken')
      expect(orgs).toHaveLength(1)

      const org = orgs[0]
      expect(org.login).toEqual('bldrs-ai')
    })
  })

  describe('commitFile', () => {
    it('commits a file and returns the new commit SHA', async () => {
      // Mock file data that should parse properly
      const file = new Blob(['test content'], {type: 'text/plain'})

      // if token passed but isn't valid, should throw 'Bad Credentials'
      expect(await commitFile('owner', 'repo', 'path', file, 'message', 'branch', 'dummyToken'))
          .toBe('newCommitSha')
    })
  })
})
