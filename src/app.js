const express = require("express");
const cors = require("cors");

const { v4: uuid } = require('uuid');

const app = express();

app.use(express.json());
app.use(cors());

const repositories = [];

app.get("/repositories", (request, response) => {
  // TODO

  response.json(repositories)
});

app.post("/repositories", (request, response) => {
  // TODO

  const {title, url , techs} = request.body;
  
  const repository = {id: uuid(), title , url, techs , likes : 0}
  
  repositories.push(repository)
  
  return response.status(201).json(repository)

});

app.put("/repositories/:id", (request, response) => {
  // TODO

  const {id} = request.params
  const {title,url,techs} = request.body;

  const repositoryIndex = repositories.findIndex( repository => id === repository.id)
 /*  console.log(repositoryIndex) */
  if(repositoryIndex < 0){
    return response.status(400).json( {error : 'Repository not Found'})
  }

  
  let {likes} = repositories[repositoryIndex];

   const repository = {
    id,
    title,
    url,
    techs,
    likes
  } 
  

  repositories[repositoryIndex] = repository

  return response.status(200).json(repository)

});

app.delete("/repositories/:id", (request, response) => {
  // TODO

  const {id} = request.params
  
  
  const repositoryIndex = repositories.findIndex( repository => id === repository.id)

  if(repositoryIndex < 0){
    return response.status(400).json( {error : 'Repository not Found'})
  }
  repositories.splice(repositoryIndex,1)

  return response.status(204).send()
});

app.post("/repositories/:id/like", (request, response) => {
  // TODO
  const {id} = request.params;
  
  
  const repository = repositories.find( repository => id === repository.id);

  if(!repository) {
      return response.status(400).json({error : ' Repository not found'})
  }

  
  repository.likes += 1;
  
  return response.status(200).json(repository)

});

module.exports = app;
