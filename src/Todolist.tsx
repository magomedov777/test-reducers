import React, { FC, memo, useCallback } from 'react';
import { FilterValuesType } from './App';
import { AddItemForm } from './AddItemForm';
import { EditableSpan } from './EditableSpan';
import IconButton from '@mui/material/IconButton/IconButton';
import { Delete } from "@mui/icons-material";
import { Button } from "@mui/material";
import { SuperCheckbox } from './SuperCheckbox';


export type TaskType = {
    id: string
    title: string
    isDone: boolean
}

type Props = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (taskId: string, todolistId: string) => void
    changeFilter: (value: FilterValuesType, todolistId: string) => void
    addTask: (title: string, todolistId: string) => void
    changeTaskStatus: (id: string, isDone: boolean, todolistId: string) => void
    removeTodolist: (id: string) => void
    changeTodolistTitle: (id: string, newTitle: string) => void
    filter: FilterValuesType
    changeTaskTitle: (taskId: string, newTitle: string, todolistId: string) => void
}

export const Todolist: FC<Props> = memo(({ id, title, tasks, removeTask,
    changeFilter, addTask, changeTaskStatus, removeTodolist, changeTodolistTitle, filter, changeTaskTitle }) => {

    const addTaskCallback = useCallback((title: string) => {
        addTask(title, id);
    }, [addTask, id])

    const removeTodolistCallback = useCallback(() => {
        removeTodolist(id);
    }, [id, removeTodolist])

    const changeTodolistTitleCallback = useCallback((title: string) => {
        changeTodolistTitle(id, title);
    }, [changeTodolistTitle, id])

    const onAllClickHandler = useCallback(() => changeFilter("all", id), [changeFilter, id])
    const onActiveClickHandler = useCallback(() => changeFilter("active", id), [changeFilter, id])
    const onCompletedClickHandler = useCallback(() => changeFilter("completed", id), [changeFilter, id])

    const onChangeHandler = useCallback((tID: string, newIsDone: boolean) => {
        changeTaskStatus(tID, newIsDone, id);
    }, [changeTaskStatus, id])

    return <div>
        <h3> <EditableSpan value={title} onChange={changeTodolistTitleCallback} />
            <IconButton onClick={removeTodolistCallback}>
                <Delete />
            </IconButton>
        </h3>
        <AddItemForm addItem={addTaskCallback} />
        <div>
            {
                tasks.map(t => {
                    const onClickHandler = () => removeTask(t.id, id)

                    const onTitleChangeHandler = (newValue: string) => {
                        changeTaskTitle(t.id, newValue, id);
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


