import { useState } from "react";

function Button({ handleClick, text }) {
  return <button onClick={handleClick}>{text}</button>;
}

function StaticLine({ text, value }) {
  return (
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
}

function Statistic({ goodCount, badCount, neutralCount }) {
  const totalCount = goodCount + neutralCount + badCount;
  return totalCount != 0 ? (
    <>
      <h1>statistics</h1>
      <table>
        <tbody>
          <StaticLine text="good" value={goodCount} />
          <StaticLine text="neutral" value={neutralCount} />
          <StaticLine text="bad" value={badCount} />
          <StaticLine text="all" value={totalCount} />
          <StaticLine
            text="average"
            value={(goodCount - badCount) / totalCount}
          />
          <StaticLine
            text="positive"
            value={(goodCount / totalCount) * 100 + " %"}
          />
        </tbody>
      </table>
    </>
  ) : (
    <p>No feedback given</p>
  );
}

const App = () => {
  // save clicks of each button to its own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad" />

      <Statistic goodCount={good} neutralCount={neutral} badCount={bad} />
    </div>
  );
};

export default App;
