export const createStore =(reducer)=>{
let state;
let listeners =[];
function getState(){
    return state;
}
function dispatch(action){
    state = reducer(state,action);
    listeners.forEach((listener)=>{
        listener()
    })
}
function subscribe(listener){
    listeners.push(listener);
    return function(){
        let newlisteners = listeners.filter((registerdlistener)=>registerdlistener!==listener);
        listeners =[...newlisteners]
    }
}
dispatch({"type":"@@INIT"}) //FOR SETTING STATE FOR FIRST TIME
return {getState,dispatch,subscribe};
}