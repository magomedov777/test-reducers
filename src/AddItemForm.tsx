import React, { ChangeEvent, FC, KeyboardEvent, memo, useCallback, useState } from 'react';
import { IconButton, TextField } from "@mui/material";
import { AddBox } from "@mui/icons-material";


type Props = {
    addItem: (title: string) => void
}

export const AddItemForm: FC<Props> = memo(({ addItem }) => {
    let [title, setTitle] = useState("")
    let [error, setError] = useState<string | null>(null)

    const addItemCallback = () => {
        if (title.trim() !== "") {
            addItem(title);
            setTitle("");
        } else {
            setError("Title is required");
        }
    }

    const onChangeHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    }, [])

    const onKeyPressHandler = useCallback((e: KeyboardEvent<HTMLInputElement>) => {
        setError(null);
        if (e.charCode === 13) {
            addItemCallback();
        }
    }, [])

    return <div>
        <TextField variant="outlined"
            error={!!error}
            value={title}
            onChange={onChangeHandler}
            onKeyPress={onKeyPressHandler}
            label="Title"
            helperText={error}
        />
        <IconButton color="primary" onClick={addItemCallback}>
            <AddBox />
        </IconButton>
    </div>
})
