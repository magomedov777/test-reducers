import TextField from '@mui/material/TextField/TextField';
import React, { ChangeEvent, FC, memo, useCallback, useState } from 'react';


type Props = {
    value: string
    onChange: (newValue: string) => void
}

export const EditableSpan: FC<Props> = memo(({ value, onChange }) => {
    let [editMode, setEditMode] = useState(false);
    let [title, setTitle] = useState(value);

    const activateEditMode = useCallback(() => {
        setEditMode(true);
        setTitle(value);
    }, [value])

    const activateViewMode = () => {
        setEditMode(false);
        onChange(title);
    }
    const changeTitle = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }

    return editMode
        ? <TextField variant="outlined"
            value={title} onChange={changeTitle} autoFocus onBlur={activateViewMode} />
        : <span onDoubleClick={activateEditMode}>{value}</span>
})
