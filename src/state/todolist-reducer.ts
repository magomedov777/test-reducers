import { v1 } from "uuid";
import { FilterValuesType, TodolistType } from "../App"


export type AddTodolistActionType = {
    type: 'ADD-TODOLIST',
    newTodolistTitle: string
    todolistId: string
}

export const TodolistsReducer = (state: TodolistType[], action: MainType): TodolistType[] => {
    switch(action.type) {
        case 'REMOVE-TODOLIST': {
            return state.filter(el => el.id !== action.todolistId)
        }
        case 'ADD-TODOLIST': {
        //  let newTodolistId = v1();
         let newTodolist: TodolistType = {id: action.todolistId, title: action.newTodolistTitle, filter: 'all'};
            return [...state, newTodolist]
        }
        case 'CHANGE-TODOLIST-TITLE': {
            return state.map(el => el.id === action.payload.todolistId ? {...el, title: action.payload.newTodolistTitle} : el)
        }
        case 'CHANGE-TODOLIST-FILTER': {
            return state.map(el => el.id === action.payload.todolistId ? {...el, filter: action.payload.newFilter} : el)
        }
        default: return state
    }
}


type MainType = removeTodolistACType 
| AddTodolistActionType 
| changeTodolistTitleACType 
| changeTodolistFilterACType

export type removeTodolistACType = ReturnType<typeof removeTodolistAC>

export const removeTodolistAC = (todolistId: string) => {
    return {
        type: 'REMOVE-TODOLIST',
         todolistId
    }as const 
}

// export type addTodolistACType = ReturnType<typeof addTodolistAC>

export const addTodolistAC = (newTodolistTitle: string): AddTodolistActionType => {
    return {
    type: 'ADD-TODOLIST',
        newTodolistTitle,
        todolistId: v1()
    
  } as const
}

type changeTodolistTitleACType = ReturnType<typeof changeTodolistTitleAC>

export const changeTodolistTitleAC = (todolistId: string, newTodolistTitle: string) => {
    return {
    type: 'CHANGE-TODOLIST-TITLE',
    payload: {
        todolistId,
        newTodolistTitle
    }
}as const    
}


type changeTodolistFilterACType = ReturnType<typeof changeTodolistFilterAC>

export const changeTodolistFilterAC = (todolistId: string, newFilter: FilterValuesType) => {
    return {
        type: 'CHANGE-TODOLIST-FILTER',
        payload: {
            todolistId,
            newFilter
        }
    }as const
}