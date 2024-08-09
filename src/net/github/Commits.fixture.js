const GITHUB_BASE_URL = process.env.GITHUB_BASE_URL_UNAUTHENTICATED


export const MOCK_COMMITS = [{
  sha: 'testsha1testsha1testsha1testsha1testsha1',
  node_id: 'C_kwDOIC6VB9oAKDg5OGViYzQ0MGFhNjBjOGQ3ZTcwNGJlYWQ2MzM0MjQwMGE1NjdiOWM',
  commit: {
    author: {
      name: 'User1',
      email: '74647806+User1@users.noreply.github.com',
      date: '2022-09-22T10:30:27Z',
    },
    committer: {
      name: 'GitHub',
      email: 'noreply@github.com',
      date: '2022-09-22T10:30:27Z',
    },
    message: 'First Commit',
    tree: {
      sha: 'testsha1testsha1testsha1testsha1testsha1',
      url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/git/trees/ab6f0517905f88b158c05fbb7578c34c239fba9b`,
    },
    url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/git/commits/898ebc440aa60c8d7e704bead63342400a567b9c`,
    comment_count: 0,
    verification: {
      verified: true,
      reason: 'valid',
      signature: '-----BEGIN PGP SIGNATURE-----\n\nwsBcBAABCAAQBQJjLDlDCRBK7hj4Ov3rIwA',
      payload: 'tree ab6f0517905f88b158c05fbb7578c34c239fba9b\nparent d945df4e3a58247aa357e07b8438e5860ffbf7',
    },
  },
  url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/commits/898ebc440aa60c8d7e704bead63342400a567b9c`,
  html_url: 'https://github.com/user2/Momentum-Public/commit/898ebc440aa60c8d7e704bead63342400a567b9c',
  comments_url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/commits`,
  author: {
    login: 'User1',
    id: 74647806,
    node_id: 'MDQ6VXNlcjc0NjQ3ODA2',
    avatar_url: 'https://avatars.githubusercontent.com/u/74647806?v=4',
    gravatar_id: '',
    url: `${GITHUB_BASE_URL}/users/User1`,
    html_url: 'https://github.com/User1',
    followers_url: `${GITHUB_BASE_URL}/users/User1/followers`,
    following_url: `${GITHUB_BASE_URL}/users/User1/following{/other_user}`,
    gists_url: `${GITHUB_BASE_URL}/users/User1/gists{/gist_id}`,
    starred_url: `${GITHUB_BASE_URL}/users/User1/starred{/owner}{/repo}`,
    subscriptions_url: `${GITHUB_BASE_URL}/users/User1/subscriptions`,
    organizations_url: `${GITHUB_BASE_URL}/users/User1/orgs`,
    repos_url: `${GITHUB_BASE_URL}/users/User1/repos`,
    events_url: `${GITHUB_BASE_URL}/users/User1/events{/privacy}`,
    received_events_url: `${GITHUB_BASE_URL}/users/User1/received_events`,
    type: 'User',
    site_admin: false,
  },
  committer: {
    login: 'web-flow',
    id: 19864447,
    node_id: 'MDQ6VXNlcjE5ODY0NDQ3',
    avatar_url: 'https://avatars.githubusercontent.com/u/19864447?v=4',
    gravatar_id: '',
    url: `${GITHUB_BASE_URL}/users/web-flow`,
    html_url: 'https://github.com/web-flow',
    followers_url: `${GITHUB_BASE_URL}/users/web-flow/followers`,
    following_url: `${GITHUB_BASE_URL}/users/web-flow/following{/other_user}`,
    gists_url: `${GITHUB_BASE_URL}/users/web-flow/gists{/gist_id}`,
    starred_url: `${GITHUB_BASE_URL}/users/web-flow/starred{/owner}{/repo}`,
    subscriptions_url: `${GITHUB_BASE_URL}/users/web-flow/subscriptions`,
    organizations_url: `${GITHUB_BASE_URL}/users/web-flow/orgs`,
    repos_url: `${GITHUB_BASE_URL}/users/web-flow/repos`,
    events_url: `${GITHUB_BASE_URL}/users/web-flow/events{/privacy}`,
    received_events_url: `${GITHUB_BASE_URL}/users/web-flow/received_events`,
    type: 'User',
    site_admin: false,
  },
  parents: [
    {
      sha: '123',
      url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/commits/d945df4e3a58247aa357e07b8438e5860ffbf7e6`,
      html_url: 'https://github.com/user2/Momentum-Public/commit/d945df4e3a58247aa357e07b8438e5860ffbf7e6',
    },
  ],
},
{
  sha: 'testsha2testsha2testsha2testsha2testsha2',
  node_id: 'C_kwDOIC6VB9oAKDg5OGViYzQ0MGFhNjBjOGQ3ZTcwNGJlYWQ2MzM0MjQwMGE1NjdiOWM',
  commit: {
    author: {
      name: 'User1',
      email: '74647806+User1@users.noreply.github.com',
      date: '2022-09-22T10:30:27Z',
    },
    committer: {
      name: 'GitHub',
      email: 'noreply@github.com',
      date: '2022-09-22T10:30:27Z',
    },
    message: 'Second Commit',
    tree: {
      sha: 'testsha2testsha2testsha2testsha2testsha2',
      url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/git/trees/ab6f0517905f88b158c05fbb7578c34c239fba9b`,
    },
    url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/git/commits/898ebc440aa60c8d7e704bead63342400a567b9c`,
    comment_count: 0,
    verification: {
      verified: true,
      reason: 'valid',
      signature: '-----BEGIN PGP SIGNATURE-----\n\nwsBcBAABCAAQBQJjLDlDCRBK7hj4Ov3rIwA',
      payload: 'tree ab6f0517905f88b158c05fbb7578c34c239fba9b\nparent d945df4e3a58247aa357e07b8438e5860ffbf7',
    },
  },
  url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/commits/898ebc440aa60c8d7e704bead63342400a567b9c`,
  html_url: 'https://github.com/user2/Momentum-Public/commit/898ebc440aa60c8d7e704bead63342400a567b9c',
  comments_url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/commits`,
  author: {
    login: 'User1',
    id: 74647806,
    node_id: 'MDQ6VXNlcjc0NjQ3ODA2',
    avatar_url: 'https://avatars.githubusercontent.com/u/74647806?v=4',
    gravatar_id: '',
    url: `${GITHUB_BASE_URL}/users/User1`,
    html_url: 'https://github.com/User1',
    followers_url: `${GITHUB_BASE_URL}/users/User1/followers`,
    following_url: `${GITHUB_BASE_URL}/users/User1/following{/other_user}`,
    gists_url: `${GITHUB_BASE_URL}/users/User1/gists{/gist_id}`,
    starred_url: `${GITHUB_BASE_URL}/users/User1/starred{/owner}{/repo}`,
    subscriptions_url: `${GITHUB_BASE_URL}/users/User1/subscriptions`,
    organizations_url: `${GITHUB_BASE_URL}/users/User1/orgs`,
    repos_url: `${GITHUB_BASE_URL}/users/User1/repos`,
    events_url: `${GITHUB_BASE_URL}/users/User1/events{/privacy}`,
    received_events_url: `${GITHUB_BASE_URL}/users/User1/received_events`,
    type: 'User',
    site_admin: false,
  },
  committer: {
    login: 'web-flow',
    id: 19864447,
    node_id: 'MDQ6VXNlcjE5ODY0NDQ3',
    avatar_url: 'https://avatars.githubusercontent.com/u/19864447?v=4',
    gravatar_id: '',
    url: `${GITHUB_BASE_URL}/users/web-flow`,
    html_url: 'https://github.com/web-flow',
    followers_url: `${GITHUB_BASE_URL}/users/web-flow/followers`,
    following_url: `${GITHUB_BASE_URL}/users/web-flow/following{/other_user}`,
    gists_url: `${GITHUB_BASE_URL}/users/web-flow/gists{/gist_id}`,
    starred_url: `${GITHUB_BASE_URL}/users/web-flow/starred{/owner}{/repo}`,
    subscriptions_url: `${GITHUB_BASE_URL}/users/web-flow/subscriptions`,
    organizations_url: `${GITHUB_BASE_URL}/users/web-flow/orgs`,
    repos_url: `${GITHUB_BASE_URL}/users/web-flow/repos`,
    events_url: `${GITHUB_BASE_URL}/users/web-flow/events{/privacy}`,
    received_events_url: `${GITHUB_BASE_URL}/users/web-flow/received_events`,
    type: 'User',
    site_admin: false,
  },
  parents: [
    {
      sha: '123',
      url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/commits/d945df4e3a58247aa357e07b8438e5860ffbf7e6`,
      html_url: 'https://github.com/user2/Momentum-Public/commit/d945df4e3a58247aa357e07b8438e5860ffbf7e6',
    },
  ],
},
{
  sha: 'testsha3testsha3testsha3testsha3testsha3',
  node_id: 'C_kwDOIC6VB9oAKDg5OGViYzQ0MGFhNjBjOGQ3ZTcwNGJlYWQ2MzM0MjQwMGE1NjdiOWM',
  commit: {
    author: {
      name: 'User1',
      email: '74647806+User1@users.noreply.github.com',
      date: '2022-09-22T10:30:27Z',
    },
    committer: {
      name: 'GitHub',
      email: 'noreply@github.com',
      date: '2022-09-22T10:30:27Z',
    },
    message: 'Third Commit',
    tree: {
      sha: 'testsha3testsha3testsha3testsha3testsha3',
      url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/git/trees/ab6f0517905f88b158c05fbb7578c34c239fba9b`,
    },
    url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/git/commits/898ebc440aa60c8d7e704bead63342400a567b9c`,
    comment_count: 0,
    verification: {
      verified: true,
      reason: 'valid',
      signature: '-----BEGIN PGP SIGNATURE-----\n\nwsBcBAABCAAQBQJjLDlDCRBK7hj4Ov3rIwA',
      payload: 'tree ab6f0517905f88b158c05fbb7578c34c239fba9b\nparent d945df4e3a58247aa357e07b8438e5860ffbf7',
    },
  },
  url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/commits/898ebc440aa60c8d7e704bead63342400a567b9c`,
  html_url: 'https://github.com/user2/Momentum-Public/commit/898ebc440aa60c8d7e704bead63342400a567b9c',
  comments_url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/commits`,
  author: {
    login: 'User1',
    id: 74647806,
    node_id: 'MDQ6VXNlcjc0NjQ3ODA2',
    avatar_url: 'https://avatars.githubusercontent.com/u/74647806?v=4',
    gravatar_id: '',
    url: `${GITHUB_BASE_URL}/users/User1`,
    html_url: 'https://github.com/User1',
    followers_url: `${GITHUB_BASE_URL}/users/User1/followers`,
    following_url: `${GITHUB_BASE_URL}/users/User1/following{/other_user}`,
    gists_url: `${GITHUB_BASE_URL}/users/User1/gists{/gist_id}`,
    starred_url: `${GITHUB_BASE_URL}/users/User1/starred{/owner}{/repo}`,
    subscriptions_url: `${GITHUB_BASE_URL}/users/User1/subscriptions`,
    organizations_url: `${GITHUB_BASE_URL}/users/User1/orgs`,
    repos_url: `${GITHUB_BASE_URL}/users/User1/repos`,
    events_url: `${GITHUB_BASE_URL}/users/User1/events{/privacy}`,
    received_events_url: `${GITHUB_BASE_URL}/users/User1/received_events`,
    type: 'User',
    site_admin: false,
  },
  committer: {
    login: 'web-flow',
    id: 19864447,
    node_id: 'MDQ6VXNlcjE5ODY0NDQ3',
    avatar_url: 'https://avatars.githubusercontent.com/u/19864447?v=4',
    gravatar_id: '',
    url: `${GITHUB_BASE_URL}/users/web-flow`,
    html_url: 'https://github.com/web-flow',
    followers_url: `${GITHUB_BASE_URL}/users/web-flow/followers`,
    following_url: `${GITHUB_BASE_URL}/users/web-flow/following{/other_user}`,
    gists_url: `${GITHUB_BASE_URL}/users/web-flow/gists{/gist_id}`,
    starred_url: `${GITHUB_BASE_URL}/users/web-flow/starred{/owner}{/repo}`,
    subscriptions_url: `${GITHUB_BASE_URL}/users/web-flow/subscriptions`,
    organizations_url: `${GITHUB_BASE_URL}/users/web-flow/orgs`,
    repos_url: `${GITHUB_BASE_URL}/users/web-flow/repos`,
    events_url: `${GITHUB_BASE_URL}/users/web-flow/events{/privacy}`,
    received_events_url: `${GITHUB_BASE_URL}/users/web-flow/received_events`,
    type: 'User',
    site_admin: false,
  },
  parents: [
    {
      sha: '123',
      url: `${GITHUB_BASE_URL}/repos/user2/Momentum-Public/commits/d945df4e3a58247aa357e07b8438e5860ffbf7e6`,
      html_url: 'https://github.com/user2/Momentum-Public/commit/d945df4e3a58247aa357e07b8438e5860ffbf7e6',
    },
  ],
},
]
