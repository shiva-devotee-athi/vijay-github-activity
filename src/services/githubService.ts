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

export { fetchGitHubActivity };
