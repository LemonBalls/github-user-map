const axios = require("axios");
const fs = require("fs");

// Replace with your GitHub personal access token
const GITHUB_TOKEN = "";
// Replace with the owner and repo name
// const OWNER = "LemonBalls";
// const REPO = "gd-astro";

const OWNER = "nodejs";
const REPO = "node";

const GITHUB_API_URL = `https://api.github.com/repos/${OWNER}/${REPO}/commits`;

async function getCommitUsernames() {
  try {
    const response = await axios.get(GITHUB_API_URL, {
      headers: {
        Authorization: `token ${GITHUB_TOKEN}`,
        Accept: "application/vnd.github.v3+json",
      },
    });

    const commits = response.data;

    console.log(commits);
    const usernames = commits.map((commit) =>
      commit.author ? commit.author.login : "Unknown"
    );

    var uniq = [...new Set(usernames)];

    console.log("Usernames of commit authors:");
    console.log(uniq);

    // Optionally, save the usernames to a file
    // fs.writeFileSync("usernames.txt", usernames.join("\n"));
    // console.log("Usernames have been saved to usernames.txt");
  } catch (error) {
    console.error(
      "Error fetching commit data:",
      error.response ? error.response.data : error.message
    );
  }
}

getCommitUsernames();
