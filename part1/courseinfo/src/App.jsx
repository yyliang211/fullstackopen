const App = () => {
  const course = "Half Stack application development";
  const part1 = "Fundamentals of React";
  const exercises1 = 10;
  const part2 = "Using props to pass data";
  const exercises2 = 7;
  const part3 = "State of a component";
  const exercises3 = 14;

  return (
    <div>
      <Header header={course} />
      <Content
        part1={part1}
        part2={part2}
        part3={part3}
        exercises1={exercises1}
        exercises2={exercises2}
        exercises3={exercises3}
      />
      <Total totalCount={exercises1 + exercises2 + exercises3} />
    </div>
  );
};

function Header({ header }) {
  return <h1>{header}</h1>;
}

function Content({ part1, part2, part3, exercises1, exercises2, exercises3 }) {
  return (
    <div>
      <Part part={part1} exercise={exercises1} />
      <Part part={part2} exercise={exercises2} />
      <Part part={part3} exercise={exercises3} />
    </div>
  );
}

function Part({ part, exercise }) {
  return (
    <p>
      {part} {exercise}
    </p>
  );
}

function Total({ totalCount }) {
  return <p>Number of exercises {totalCount}</p>;
}

export default App;
