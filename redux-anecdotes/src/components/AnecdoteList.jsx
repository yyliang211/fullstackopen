import { useDispatch, useSelector } from "react-redux";
import PropTypes from "prop-types";

import { addVote } from "../reducers/anecdoteReducer";
import { setNotification } from "../reducers/notificationReducer";

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
    return anecdotes.filter((a) =>
      a.content.toLowerCase().includes(filter.toLowerCase())
    );
  });
  return [...anecdotes]
    .sort((a, b) => b.votes - a.votes)
    .map((anecdote) => (
      <Anecdote
        key={anecdote.id}
        anecdote={anecdote}
        handleVote={() => {
          dispatch(addVote(anecdote.id));
          dispatch(setNotification(`you voted for '${anecdote.content}'`, 10));
        }}
      />
    ));
};

export default AnecdoteList;
