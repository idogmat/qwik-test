import Vue from 'vue'
import Vuex from "vuex";
export interface ITodo{
    id:string
    name:string
    status:boolean
}
interface AppState {
    todos: ITodo[];

}

Vue.use(Vuex)
const store = new Vuex.Store({
    state: {
        todos: [
            {
              name: "lorem1",
              status: false,
              id:"12313"
            },
            {
              name: "lorem2",
              status: true,
              id:"123123"
            },
            {
              name: "lorem3",
              status: false,
              id:"123132123"
            },
          ],
    },
    getters: {
        getTodos(state:AppState){
            return state.todos
        }
    },
    mutations: {
        addTodo(state: AppState, todo:ITodo) {
            state.todos.push(todo)
        },

        removeTodo(state: AppState, id: string) {
           state.todos = state.todos.filter(e=>e.id !== id)
        },

        editTodo(state: AppState,todo:Partial<ITodo>) {
            const index = state.todos.findIndex(e=>e.id === todo.id)
            index >= 0 && todo.name &&(state.todos[index].name=todo.name)
        },
        
        changeStatus(state: AppState, id:string) {
            state.todos.forEach(e=>e.id === id && (e.status = !e.status))
        },
        getFromLocalStorage(state: AppState, todos:ITodo[]) {
            state.todos = todos
        }
    },
    actions: {
        setValue({ commit },option: {type:string,value:ITodo|string|Partial<ITodo>}) {
            commit(option.type, option.value);
        }
    },
})

export default store