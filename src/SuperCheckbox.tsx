import React, { ChangeEvent } from 'react';

type PropsType = {
    callBack: (newIsDone: boolean) => void
    isDone: boolean
}

export const SuperCheckbox = (props: PropsType) => {
    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        props.callBack(e.currentTarget.checked)
    }
  return (
    <input 
    type="checkbox" 
    checked={props.isDone}
    onChange={onChangeHandler} />
  )
}
