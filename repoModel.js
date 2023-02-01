import mongoose from "mongoose";

const repoModel = new mongoose.Schema({
  idRepo: { type: Number, required: true },
  name: { type: String, required: true },
  owner_login: { type: String, required: true },
  html_url: { type: String, required: true },
  stargazers_count: { type: Number, required: true },
});

export default mongoose.model("repoModel", repoModel);
