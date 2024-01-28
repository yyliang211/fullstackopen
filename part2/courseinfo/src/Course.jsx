const Header = ({ course }) => <h1>{course}</h1>;

const Total = ({ sum }) => <strong>total of {sum} exercises</strong>;

const Part = ({ part }) => (
  <p>
    {part.name} {part.exercises}
  </p>
);

const Content = ({ parts }) => (
  <>
    {parts.map((part) => {
      return <Part key={part.id} part={part} />;
    })}
  </>
);

export const Course = ({ course }) => {
  const sum = course.parts.reduce((acc, part) => acc + part.exercises, 0);

  return (
    <>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total sum={sum} />
    </>
  );
};
