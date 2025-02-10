const axios = require("axios");
const fs = require("fs");


// https://stackoverflow.com/questions/20547198/how-can-i-filter-all-github-pull-requests-for-a-specific-target-branch

const GITHUB_TOKEN = "";

const headers = {
        // Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      }

async function getPRs(REPO, AUTHORS) {

const dateFilter = '+merged:>2024-11-01'
const authorsFilter = AUTHORS.flat(Infinity).map(author => String(`+author:${author}`).replace(/,/g, '')).join('');

//  const QUERY = `is:pr+is:merged+merged:>2024-11-01+author:joyeecheung+author:nektro+base:main&per_page=100`

  const QUERY = `is:pr+is:merged${dateFilter}${authorsFilter}+base:main&per_page=100`
  const GITHUB_API_URL = `https://api.github.com/search/issues?q=repo:${REPO.owner}/${REPO.repository}+${QUERY}`

  try {
    const response = await axios.get(GITHUB_API_URL, {
      headers,
    });

    // Returns params items & total_count
    const results = response.data;

    return `${REPO.repository} PRs: ${results.total_count}`

  } catch (error) {
    console.error(
      "Error fetching commit data:",
      error.response ? error.response.data : error.message
    );
  }
}

const repositories = [
  {owner:'nodejs', repository: 'node'}, 
  {owner:'nodejs', repository: 'node-gyp'}
]

const authors = ['joyeecheung', 'nektro', 'cclauss']

repositories.forEach((repo) => {
  getPRs(repo, authors).then((result) => console.log(result))
})

    // Optionally, save the usernames to a file
    // fs.writeFileSync("counts.txt", counts.join("\n"));