/* eslint-disable react/prop-types */
import { useEffect, useState } from "react";
import personsService from "./services/persons";

function Filter({ filter, handleFilterChange }) {
  return (
    <div>
      filter shown with
      <input value={filter} onChange={handleFilterChange} />
    </div>
  );
}

function PersonForm({
  addPerson,
  newName,
  handleNameChange,
  newNumber,
  handleNumberChange,
}) {
  return (
    <form onSubmit={addPerson}>
      <div>
        name: <input value={newName} onChange={handleNameChange} />
      </div>
      <div>
        number: <input value={newNumber} onChange={handleNumberChange} />
      </div>
      <div>
        <button type="submit">add</button>
      </div>
    </form>
  );
}

function Persons({ persons, removePerson }) {
  return (
    <>
      {persons.map((person) => (
        <p key={person.name}>
          {person.name} {person.number}
          <button onClick={() => removePerson(person)}>delete</button>
        </p>
      ))}
    </>
  );
}

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState("");
  const [newNumber, setNewNumber] = useState("");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    personsService.getAll().then((initialPersons) => {
      setPersons(initialPersons);
    });
  }, []);

  const filteredPersons =
    filter !== ""
      ? persons.filter((person) =>
          person.name.toLowerCase().includes(filter.toLowerCase())
        )
      : persons;

  function handleNameChange(event) {
    setNewName(event.target.value);
  }

  function handleNumberChange(event) {
    setNewNumber(event.target.value);
  }

  function handleFilterChange(event) {
    setFilter(event.target.value);
  }

  function addPerson(event) {
    event.preventDefault();
    if (persons.some((person) => person.name === newName)) {
      const person = persons.find((person) => person.name === newName);
      if (
        window.confirm(
          `${newName} is already added to phonebook, replace the old number with a new one?`
        )
      ) {
        personsService
          .update(person.id, { ...person, number: newNumber })
          .then((returnedPerson) => {
            setPersons(
              persons.map((person) =>
                person.id !== returnedPerson.id ? person : returnedPerson
              )
            );
          });
      }
    }
    const personObject = {
      name: newName,
      number: newNumber,
    };
    personsService.create(personObject).then((returnedPerson) => {
      setPersons(persons.concat(returnedPerson));
      setNewName("");
    });
  }

  const removePerson = (person) => {
    if (window.confirm(`Delete ${person.name} ?`)) {
      personsService.remove(person.id);
      setPersons(persons.filter((p) => p.id !== person.id));
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleFilterChange={handleFilterChange} />

      <h3>add a new</h3>
      <PersonForm
        addPerson={addPerson}
        newName={newName}
        handleNameChange={handleNameChange}
        newNumber={newNumber}
        handleNumberChange={handleNumberChange}
      />

      <h3>Numbers</h3>
      <Persons persons={filteredPersons} removePerson={removePerson} />
    </div>
  );
};

export default App;
