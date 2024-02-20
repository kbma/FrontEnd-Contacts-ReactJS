// actions.js
import axios from 'axios';

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

export const addTaskSuccess = (task) => ({
  type: 'ADD_TASK_SUCCESS',
  payload: { task }
});

export const addTask = (text) => {
  return (dispatch) => {
    return axios.post('http://localhost:3001/tasks', { text, completed: false })
      .then(response => {
        dispatch(addTaskSuccess(response.data));
      })
      .catch(error => {
        console.error('Error adding task', error);
      });
  };
};

export const completeTaskSuccess = (task) => ({
  type: 'COMPLETE_TASK_SUCCESS',
  payload: { task }
});

export const completeTask = (id) => {
  return (dispatch) => {
    return axios.patch(`http://localhost:3001/tasks/${id}`, { completed: true })
      .then(response => {
        dispatch(completeTaskSuccess(response.data));
      })
      .catch(error => {
        console.error('Error completing task', error);
      });
  };
};



// reducers.js
const initialState = {
  tasks: []
};

const taskReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'FETCH_TASKS_SUCCESS':
      return {
        ...state,
        tasks: action.payload.tasks
      };
    case 'ADD_TASK_SUCCESS':
      return {
        ...state,
        tasks: [...state.tasks, action.payload.task]
      };
    case 'COMPLETE_TASK_SUCCESS':
      const updatedTasks = state.tasks.map(task =>
        task.id === action.payload.task.id ? action.payload.task : task
      );
      return {
        ...state,
        tasks: updatedTasks
      };
    default:
      return state;
  }
};

export default taskReducer;
