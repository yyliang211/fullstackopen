const App = () => {
  const course = "Half Stack application development";
  const parts = [
    {
      name: "Fundamentals of React",
      exercises: 10,
    },
    {
      name: "Using props to pass data",
      exercises: 7,
    },
    {
      name: "State of a component",
      exercises: 14,
    },
  ];

  return (
    <div>
      <Header header={course} />
      <Content parts={parts} />
      <Total
        totalCount={parts.reduce((acc, currVal) => acc + currVal.exercises, 0)}
      />
    </div>
  );
};

function Header({ header }) {
  return <h1>{header}</h1>;
}

function Part({ part }) {
  return (
    <p>
      {part.name} {part.exercises}
    </p>
  );
}

function Content({ parts }) {
  return (
    <div>
      {parts.map((part) => (
        <Part part={part} />
      ))}
    </div>
  );
}

function Total({ totalCount }) {
  return <p>Number of exercises {totalCount}</p>;
}

export default App;
