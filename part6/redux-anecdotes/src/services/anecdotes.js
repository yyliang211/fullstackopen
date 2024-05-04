import axios from "axios";

const baseUrl = "http://localhost:3001/anecdotes";

const getAll = async () => {
  const res = await axios.get(baseUrl);
  return res.data;
};

const createNewAnecdote = async (content) => {
  const obj = { content, votes: 0 };
  const res = await axios.post(baseUrl, obj);
  return res.data;
};

const vote = async (id) => {
  const anecdotes = await getAll();
  const anecdoteToUpdate = anecdotes.find((a) => a.id === id);
  const res = await axios.put(`${baseUrl}/${id}`, {
    ...anecdoteToUpdate,
    votes: anecdoteToUpdate.votes + 1,
  });
  return res.data;
};

export default { getAll, createNewAnecdote, vote };
