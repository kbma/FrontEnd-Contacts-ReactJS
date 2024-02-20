// actions.js
import axios from 'axios';
import io from 'socket.io-client';

const socket = io('http://localhost:3001');

// ... (les actions précédentes)

export const fetchTasksSuccess = (tasks) => ({
    type: 'FETCH_TASKS_SUCCESS',
    payload: { tasks }
  });
  
  export const fetchTasks = () => {
    return (dispatch) => {
      return axios.get('http://localhost:3001/tasks')
        .then(response => {
          dispatch(fetchTasksSuccess(response.data));
        })
        .catch(error => {
          console.error('Error fetching tasks', error);
        });
    };
  };

  
export const setupSocket = () => {
  return (dispatch) => {
    socket.on('tasks', (tasks) => {
      dispatch(fetchTasksSuccess(tasks));
    });
  };
};

export const addTaskSuccess = (task) => ({
    type: 'ADD_TASK_SUCCESS',
    payload: { task }
  });

  export const completeTaskSuccess = (task) => ({
    type: 'COMPLETE_TASK_SUCCESS',
    payload: { task }
  });

export const addTaskWithSocket = (text) => {
  return (dispatch) => {
    return axios.post('http://localhost:3001/tasks', { text, completed: false })
      .then(response => {
        dispatch(addTaskSuccess(response.data));
        socket.emit('tasks', response.data);
      })
      .catch(error => {
        console.error('Error adding task', error);
      });
  };
};

export const completeTaskWithSocket = (id) => {
  return (dispatch) => {
    return axios.patch(`http://localhost:3001/tasks/${id}`, { completed: true })
      .then(response => {
        dispatch(completeTaskSuccess(response.data));
        socket.emit('tasks', response.data);
      })
      .catch(error => {
        console.error('Error completing task', error);
      });
  };
};
