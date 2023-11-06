import React, { ChangeEvent, FC, memo } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import { Delete } from "@mui/icons-material";
import { Button, Checkbox } from "@mui/material";
import { SuperCheckbox } from './SuperCheckbox';
import { TodolistType } from './AppWithReducers';
import { useSelector } from 'react-redux';
import { AppRootStateType } from './state/store';
import { useDispatch } from 'react-redux';
import { addTaskAC, changeTaskStatusAC, changeTaskTitleAC, removeTaskAC } from './state/tasks-reducer';
import { changeTodolistFilterAC, changeTodolistTitleAC, removeTodolistAC } from './state/todolist-reducer';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    todolist: TodolistType
}

export const TodolistWithRedux: FC<Props> = memo(({ todolist }) => {
    const { id, filter, title } = todolist
    let tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[id])
    const dispatch = useDispatch()

    const addTask = (title: string) => {
        // props.addTask(title, props.id);
        dispatch(addTaskAC(title, id))
    };

    const removeTodolist = () => {
        // props.removeTodolist(props.id);
        dispatch(removeTodolistAC(id))
    };
    const changeTodolistTitle = (title: string) => {
        // props.changeTodolistTitle(props.id, title);
        dispatch(changeTodolistTitleAC(id, title))
    };

    const onChangeHandler = (tID: string, newIsDone: boolean) => {
        // props.changeTaskStatus(tID, newIsDone, props.id);
        dispatch(changeTaskStatusAC(tID, newIsDone, id))
    }

    const onAllClickHandler = () => dispatch(changeTodolistFilterAC(id, "all"))
    const onActiveClickHandler = () => dispatch(changeTodolistFilterAC(id, "active"))
    const onCompletedClickHandler = () => dispatch(changeTodolistFilterAC(id, "completed"))

    if (filter === "active") {
        tasks = tasks.filter(t => t.isDone === false);
    }
    if (filter === "completed") {
        tasks = tasks.filter(t => t.isDone === true);
    }

    return <div>
        <h3> <EditableSpan value={title} onChange={changeTodolistTitle} />
            <IconButton onClick={removeTodolist}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTask} />
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => dispatch(removeTaskAC(t.id, id))
                    const onTitleChangeHandler = (newValue: string) => {
                        // props.changeTaskTitle(t.id, newValue, props.id);
                        dispatch(changeTaskTitleAC(t.id, newValue, id))

                    }
                    return <div key={t.id} className={t.isDone ? "is-done" : ""}>
                        <SuperCheckbox callBack={(newIsDone) => onChangeHandler(t.id, newIsDone)} isDone={t.isDone} />
                        <EditableSpan value={t.title} onChange={onTitleChangeHandler} />
                        <IconButton onClick={onClickHandler}>
                            <Delete />
                        </IconButton>
                    </div>
                })
            }
        </div>
        <div>
            <Button variant={filter === 'all' ? 'outlined' : 'text'}
                onClick={onAllClickHandler}
                color={'inherit'}
            >All
            </Button>
            <Button variant={filter === 'active' ? 'outlined' : 'text'}
                onClick={onActiveClickHandler}
                color={'primary'}>Active
            </Button>
            <Button variant={filter === 'completed' ? 'outlined' : 'text'}
                onClick={onCompletedClickHandler}
                color={'secondary'}>Completed
            </Button>
        </div>
    </div>
})

