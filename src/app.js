const express = require('express');
const cors = require('cors');
const { v4: uuid } = require('uuid');
const { isUuid } = require('uuidv4');

function validateRepositoryId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response.status(400).json({ error: 'Invalid repository ID.' });
  }

  return next();
}

const app = express();

app.use(express.json());
app.use(cors());
app.use('/repositories/:id', validateRepositoryId);

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

  if (!~repoIndex) return response.status(400).json('Repository not found');

  const repository = { id, title, url, techs };
  repositories[repoIndex] = repository;

  return response.json(repository);
});

app.delete('/repositories/:id', (request, response) => {
  const { id } = request.params;

  const repositoryIndex = repositories.findIndex((repository) => repository.id === id);

  if (!~repositoryIndex) return response.status(400).json('Repository not found');

  repositories.splice(repositoryIndex, 1);
  return response.status(204).send();
});

app.post('/repositories/:id/like', (request, response) => {
  // TODO
});

module.exports = app;
