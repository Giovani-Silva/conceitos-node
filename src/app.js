const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get('/repositories', (request, response) => {
  response.json(repositories);
});

app.post('/repositories', (request, response) => {
  const { title, url, techs } = request.body;
  const repository = { id: uuid(), title, url, techs, likes: 0 };

  repositories.push(repository);
  response.json(repository);
});

app.put('/repositories/:id', (request, response) => {
  const { id } = request.params;
  const { title, url, techs } = request.body;

  const repoIndex = repositories.findIndex((repository) => repository.id === id);

  if (!~repoIndex) return response.status(400).json('repository not found');

  const repository = { id, title, url, techs };
  repositories[repoIndex] = repository;

  return response.json(repository);
});

app.delete('/repositories/:id', (request, response) => {
  // TODO
});

app.post('/repositories/:id/like', (request, response) => {
  // TODO
});

module.exports = app;
