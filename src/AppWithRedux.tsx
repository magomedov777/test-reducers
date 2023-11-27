import React, { FC, memo, useCallback } from 'react';
import './App.css';
import { TaskType } from './Todolist';
import { AddItemForm } from './AddItemForm';
import AppBar from '@mui/material/AppBar/AppBar';
import { Button, Container, Grid, IconButton, Paper, Toolbar, Typography } from "@mui/material";
import { Menu } from "@mui/icons-material";
import { addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolist-reducer';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { useDispatch, useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { TodolistWithRedux } from './TodolistWithRedux';


export type FilterValuesType = "all" | "active" | "completed";
export type TodolistType = {
    id: string
    title: string
    filter: FilterValuesType
}

export type TasksStateType = {
    [key: string]: Array<TaskType>
}


const AppWithRedux: FC = memo(() => {
    // let todolistId1 = v1();
    // let todolistId2 = v1();

    let todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
    // let tasks = useSelector<AppRootStateType, TasksStateType>(state => state.tasks)

    const dispatch = useDispatch()

    // let [todolists, dispatchToTodolists] = useReducer(TodolistsReducer,[
    //     {id: todolistId1, title: "What to learn", filter: "all"},
    //     {id: todolistId2, title: "What to buy", filter: "all"}
    // ])

    // let [tasks, dispatchToTasks] = useReducer(TasksReducer,{
    //     [todolistId1]: [
    //         {id: v1(), title: "HTML&CSS", isDone: true},
    //         {id: v1(), title: "JS", isDone: true}
    //     ],
    //     [todolistId2]: [
    //         {id: v1(), title: "Milk", isDone: true},
    //         {id: v1(), title: "React Book", isDone: true}
    //     ]
    // });


    const removeTask = useCallback((id: string, todolistId: string) => {
        dispatch(removeTaskAC(id, todolistId))
    }, [dispatch])

    const addTask = useCallback((title: string, todolistId: string) => {
        dispatch(addTaskAC(title, todolistId))

    }, [dispatch])

    const changeStatus = useCallback((id: string, isDone: boolean, todolistId: string) => {
        dispatch(changeTaskStatusAC(id, isDone, todolistId))
    }, [dispatch])


    const changeTaskTitle = useCallback((id: string, newTitle: string, todolistId: string) => {
        dispatch(changeTaskTitleAC(id, newTitle, todolistId))
    }, [dispatch])


    const changeFilter = useCallback((value: FilterValuesType, todolistId: string) => {
        dispatch(changeTodolistFilterAC(todolistId, value))
    }, [dispatch])

    function removeTodolist(id: string) {
        // // засунем в стейт список тудулистов, id которых не равны тому, который нужно выкинуть
        // setTodolists(todolists.filter(tl => tl.id != id));
        // // удалим таски для этого тудулиста из второго стейта, где мы храним отдельно таски
        // delete tasks[id]; // удаляем св-во из объекта... значением которого являлся массив тасок
        // // засетаем в стейт копию объекта, чтобы React отреагировал перерисовкой
        // setTasks({...tasks});
        // const action = removeTodolistAC(id)
        // dispatchToTodolists(action)
        // dispatchToTasks(action)
        // const action = removeTodolistAC(id)
        dispatch(removeTodolistAC(id))
        // dispatchToTasks(action)
    }

    function changeTodolistTitle(id: string, title: string) {
        // // найдём нужный todolist
        // const todolist = todolists.find(tl => tl.id === id);
        // if (todolist) {
        //     // если нашёлся - изменим ему заголовок
        //     todolist.title = title;
        //     setTodolists([...todolists]);
        // const action = changeTodolistTitleAC(id, title)
        // dispatchToTodolists(action)
        dispatch(changeTodolistTitleAC(id, title))
    }


    function addTodolist(title: string) {
        // let newTodolistId = v1();
        // let newTodolist: TodolistType = {id: newTodolistId, title: title, filter: 'all'};
        // setTodolists([newTodolist, ...todolists]);
        // setTasks({
        //     ...tasks,
        //     [newTodolistId]: []
        // })
        // const action = addTodolistAC(title)
        // dispatchToTodolists(action)
        // dispatchToTasks(action)
        // const action = addTodolistAC(title)
        dispatch(addTodolistAC(title))
        // dispatchToTasks(action)
    }

    return (
        <div className="App">
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu />
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
            </AppBar>
            <Container fixed>
                <Grid container style={{ padding: "20px" }}>
                    <AddItemForm addItem={addTodolist} />
                </Grid>
                <Grid container spacing={3}>
                    {
                        todolists.map(tl => {
                            // let allTodolistTasks = tasks[tl.id];
                            // let tasksForTodolist = allTodolistTasks;

                            // if (tl.filter === "active") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === false);
                            // }
                            // if (tl.filter === "completed") {
                            //     tasksForTodolist = allTodolistTasks.filter(t => t.isDone === true);
                            // }

                            return <Grid key={tl.id} item>
                                <Paper style={{ padding: "10px" }}>
                                    <TodolistWithRedux todolist={tl}
                                    // key={tl.id}
                                    // id={tl.id}
                                    // title={tl.title}
                                    // tasks={tasksForTodolist}
                                    // removeTask={removeTask}
                                    // changeFilter={changeFilter}
                                    // addTask={addTask}
                                    // changeTaskStatus={changeStatus}
                                    // filter={tl.filter}
                                    // removeTodolist={removeTodolist}
                                    // changeTaskTitle={changeTaskTitle}
                                    // changeTodolistTitle={changeTodolistTitle}
                                    />
                                </Paper>
                            </Grid>
                        })
                    }
                </Grid>
            </Container>
        </div>
    );
})

export default AppWithRedux;
