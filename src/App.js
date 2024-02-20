// App.js
import React from 'react';
import { Provider } from 'react-redux';
import store from './components/store';
import TaskList from './components/TaskList';

const App = () => {
  return (
    <Provider store={store}>
      <div>
        <h1>Gestion de tâches avec Redux et JSON Server</h1>


        <TaskList />
      </div>
    </Provider>
  );
};

export default App;
