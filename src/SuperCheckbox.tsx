import React, { ChangeEvent, FC } from 'react';

type Props = {
  callBack: (newIsDone: boolean) => void
  isDone: boolean
}

export const SuperCheckbox: FC<Props> = ({ callBack, isDone }) => {
  const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
    callBack(e.currentTarget.checked)
  }
  return (
    <input
      type="checkbox"
      checked={isDone}
      onChange={onChangeHandler} />
  )
}
