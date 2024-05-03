import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { vote } from "../reducers/anecdoteReducer";

const Anecdote = ({ anecdote, handleVote }) => {
  return (
    <>
      <div>{anecdote.content}</div>
      <div>
        has {anecdote.votes}
        <button onClick={handleVote}>vote</button>
      </div>
    </>
  );
};

Anecdote.propTypes = {
  anecdote: PropTypes.object.isRequired,
  handleVote: PropTypes.func.isRequired,
};

const AnecdoteList = () => {
  const dispatch = useDispatch();
  const anecdotes = useSelector(({ filter, anecdotes }) => {
    if (filter === "ALL") {
      return anecdotes;
    }
    return anecdotes.filter((a) => a.content.includes(filter));
  });
  return anecdotes
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleVote={() => dispatch(vote(anecdote.id))}
      />
    ));
};

export default AnecdoteList;
