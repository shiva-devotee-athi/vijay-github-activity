import axios from "axios";

const fetchGitHubActivity = async (username: string) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/events`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub activity:", error);
    throw error;
  }
};

// Fetch GitHub Profile
const fetchGitHubProfile = async (username: string) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub profile:", error);
    throw error;
  }
};

// Fetch GitHub Repositories
const fetchGitHubRepos = async (username: string) => {
  try {
    const response = await axios.get(
      `https://api.github.com/users/${username}/repos?sort=updated&per_page=10`
    );
    return response.data;
  } catch (error) {
    console.error("Error fetching GitHub repositories:", error);
    throw error;
  }
};

export { fetchGitHubActivity, fetchGitHubProfile, fetchGitHubRepos };
