import repoModel from "./repoModel.js";
import axios from "axios";

const timer = () => {
  create();
  setInterval(() => create(), 600000);
};

const create = async (req, response) => {
  axios({
    method: "get",
    url: "https://api.github.com/search/repositories?q=stars&sort=stars",
  })
    .then((res) => {
      res.data.items.slice(0, 15).map((item) => {
        repoModel.create({
          idRepo: item.id,
          name: item.name,
          owner_login: item.owner.login,
          stargazers_count: item.stargazers_count,
          html_url: item.html_url,
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
};

const getAll = async (req, res) => {
  try {
    const repos = await repoModel.find();
    res.json(repos);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getOne = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Нет такого id" });
    }

    const repo = await repoModel.findById(id);
    res.json(repo);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getName = async (req, res) => {
  try {
    const { name } = req.body;
    const repo = await repoModel.find({ name: `${name}` });
    res.json(repo);
  } catch (err) {
    res.status(500).json(err);
  }
};

const getIdRepo = async (req, res) => {
  try {
    const { idRepo } = req.body;
    const repo = await repoModel.find({ idRepo: `${idRepo}` });
    res.json(repo);
  } catch (err) {
    res.status(500).json(err);
  }
};

const removeAll = async (req, res) => {
  try {
    await repoModel.remove();
    res.json("Remove");
  } catch (err) {
    res.status(500).json(err);
  }
};

export default { create, getAll, getOne, getName, getIdRepo, timer, removeAll };
