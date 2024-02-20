// reducers.js
// Le reducer spécifie comment l'état doit changer en réponse à une action.

// L'état initial du store
const initialState = {
    count: 0
  };
  
  // Le reducer du compteur
  const counterReducer = (state = initialState, action) => {
    switch (action.type) {
      // Si l'action est d'incrémenter, retourne un nouvel état avec le compteur augmenté
      case 'INCREMENT':
        return {
          count: state.count + 1
        };
      // Si l'action est de décrémenter, retourne un nouvel état avec le compteur diminué
      case 'DECREMENT':
        return {
          count: state.count - 1
        };
      // Par défaut, retourne l'état actuel
      default:
        return state;
    }
  };
  
  export default counterReducer;
  