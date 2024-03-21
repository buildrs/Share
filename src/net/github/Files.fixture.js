const GITHUB_BASE_URL = process.env.GITHUB_BASE_URL
const RAW_GIT_PROXY_URL = process.env.RAW_GIT_PROXY_URL


export const MOCK_FILES = [{
  name: 'window.ifc',
  path: 'window.ifc',
  sha: '987',
  size: 7299,
  url: `${GITHUB_BASE_URL}/repos/bldrs-ai/Share/contents/window.ifc?ref=main`,
  html_url: 'https://github.com/bldrs-ai/Share/blob/main/window.ifc',
  git_url: `${GITHUB_BASE_URL}/repos/bldrs-ai/Share/git/blobs/7fa3f2212cc4ea91a6539dd5f185a986574f4cd6`,
  download_url: `${RAW_GIT_PROXY_URL}/bldrs-ai/Share/main/window.ifc`,
  type: 'file',
},
{
  name: 'folder',
  path: 'folder',
  sha: '7fa3f2212cc4ea91a6539dd5f185a986574f4cd7',
  size: 0,
  url: `${GITHUB_BASE_URL}/test/folder`,
  html_url: '',
  git_url: `${GITHUB_BASE_URL}/test/7fa3f2212cc4ea91a6539dd5f185a986574f4cd7`,
  download_url: `${RAW_GIT_PROXY_URL}/test/folder`,
  type: 'dir',
}]
