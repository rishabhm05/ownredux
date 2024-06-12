import './style.css'

import { createStore } from './createStore'

document.querySelector('#app').innerHTML = `
 BASIC OWN Redux 
`
let initialstate ={count:0}
const countreducer =(state=initialstate,action)=>{
   switch(action.type){
    case "INCREMENT":
      return {...state,count:state.count+action.payload};
    case "DECREMENT":
      return {...state,count:state.count-action.payload};
    default :
    return state;
   }
}
const store = createStore(countreducer);
console.log(store.getState());
store.dispatch({type:"INCREMENT",payload:5})
const unsubscribe = store.subscribe(()=>{
  console.log("store get updted",store.getState())
})
store.dispatch({type:"INCREMENT",payload:5})
unsubscribe()
store.dispatch({type:"INCREMENT",payload:2})
store.dispatch({type:"INCREMENT",payload:2})

function combinereducers(reducers){
  let nextState ={};
  return function combination(state={},action){
    for(let key in reducers){
      let prevstatekey = state[key];
      const reducerforkey = reducers[key];
      const nextStateforkey  = reducerforkey(state,action);
      nextState[key] = nextStateforkey
    }
  }
}