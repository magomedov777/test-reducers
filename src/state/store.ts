import { TasksReducer } from "./tasks-reducer"
import { TodolistsReducer } from "./todolist-reducer"
import { combineReducers, legacy_createStore } from "redux"

const rootReducer = combineReducers({
  tasks: TasksReducer,
  todolists: TodolistsReducer,
})
export const store = legacy_createStore(rootReducer)
export type AppRootStateType = ReturnType<typeof rootReducer>
// @ts-ignore
window.store = store
