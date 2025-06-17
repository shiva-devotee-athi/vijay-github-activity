import dotenv from "dotenv";
dotenv.config()

const PORT = process.env.PORT || 3000;
const GITHUB_USERNAME = process.env.GITHUB_USERNAME || "shiva-devotee-athi"; // Replace with your GitHub username
export { PORT, GITHUB_USERNAME };
