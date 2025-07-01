import express, { Application } from "express";
import http from "http";
import { Server } from "socket.io";
import { PORT, GITHUB_USERNAME } from "./config";
import {
  fetchGitHubActivity,
  fetchGitHubProfile,
  fetchGitHubRepos,
} from "./services/githubService";

const app: Application = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
    methods: ["GET", "POST"],
  },
});

app.use(express.json());
app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("New client connected");
  socket.on("disconnect", () => {
    console.log("Client disconnected");
  });
});

const getProfileData = async () => {
   try {
    const profile = await fetchGitHubProfile(GITHUB_USERNAME);
    console.log(profile,'-=-=-')
    io.emit("github-profiles", profile);
  } catch (error) {
    console.error("Error getting GitHub Profiles:", error);
  }
};

const getRepositariesData = async () => {
  try {
    const repo = await fetchGitHubRepos(GITHUB_USERNAME);
    io.emit("github-repositaries", repo);
  } catch (error) {
    console.error("Error getting GitHub Repositaries:", error);
  }
};


const updateGitHubActivity = async () => {
  try {
    const activity = await fetchGitHubActivity(GITHUB_USERNAME);
    io.emit("github-activity", activity);
  } catch (error) {
    console.error("Error updating GitHub activity:", error);
  }
};

getRepositariesData();
getProfileData();
updateGitHubActivity();

// setInterval(updateGitHubActivity, 60000); // Fetch activity every 60 seconds

server.listen(PORT, () =>
  console.log(`Server running on port http://localhost:${PORT}`)
);
