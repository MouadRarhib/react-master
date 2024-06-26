import React from "react";
import Header from "./components/Header/Header";
import Board from "./components/Board/Board";
import './App.css';
import Projects from "./components/ProjectComponent/Projects";

const App = () => {
  const sampleBoard = {
    title: 'Project Board',
    lists: [
      {
        title: 'To Do',
        username:'Username',
        cards: [
          { text: 'Task 1' },
          { text: 'Task 2' },
          { text: 'Task 2' },
          { text: 'Task 2' },
        ],
      },
      {
        title: 'In Progress',
        username:'Username',
        cards: [
          { text: 'Task 3' },
        ],
      },
      {
        title: 'Done',
        username:'Username',
        cards: [
          { text: 'Task 4' },
          { text: 'Task 5' },
        ],
      },
    ],
  };

  return (
    <div className="App">
      <Header />
      <main>
        <Projects/>
      </main>
    </div>
  );
};

export default App;