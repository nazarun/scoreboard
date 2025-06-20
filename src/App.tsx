import React from 'react';
import logo from './logo.svg';
import './App.css';
import ScoreboardComponent from './components/ScoreboardComponent';
import Table from './components/Table';
import NumbersGame from "./components/NumbersGame";

import { Amplify } from 'aws-amplify';
import { Authenticator } from '@aws-amplify/ui-react';
import '@aws-amplify/ui-react/styles.css';

import { createTodo, updateTodo, deleteTodo } from "./graphql/mutations";
import { listTodos, getTodo } from "./graphql/queries";
import { generateClient } from "aws-amplify/api";

import awsExports from "./aws-exports";
Amplify.configure(awsExports);

const client = generateClient();

async function fetchTodos() {
  const result = await client.graphql({
    query: listTodos
  });
  console.log('result', result);
}

async function fetchOneTodo() {
  const result = await client.graphql({
    query: getTodo,
    variables: { id: "75315bdc-abc5-4d1f-a9a5-eb4cd21363a1"}
  });
  console.log('result', result);
}

async function changeTodo() {
  const result = await client.graphql({
    query: updateTodo,
    variables: {
      input: {
        id: "75315bdc-abc5-4d1f-a9a5-eb4cd21363a1",
        name: "Newly Updated Todo",
      }
    }
  });
  console.log('result', result);
}

async function removeTodo() {
  const result = await client.graphql({
    query: deleteTodo,
    variables: {
      input: { id: "75315bdc-abc5-4d1f-a9a5-eb4cd21363a1" }
    }
  });
  console.log('result', result);
}


async function storeTodo() {
  const result = await client.graphql({
    query: createTodo,
    variables: {
      input: {
        name: "Test Todo",
        description: "This is a test todo item"
      }
    }
  })
  console.log('result', result);
}



function App() {
  return (
    // <Table />
    // <NumbersGame />
    
    <Authenticator>
      {({ user, signOut }) => (
        <div className="App">
          Welcome {user?.username}!
          <button onClick={signOut}>Sign out</button>
          <ScoreboardComponent />

          <button onClick={storeTodo}>Store Todo</button>
          <button onClick={fetchTodos}>Fetch Todos</button>
          <button onClick={fetchOneTodo}>fetch One Todo</button>
          <button onClick={changeTodo}>Change Todo</button>
          <button onClick={removeTodo}>Remove Todo</button>
        </div>
      )}
    </Authenticator>
  );
}

export default App;
