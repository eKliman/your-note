import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { withRouter } from 'react-router-dom'
import { 
  setInitialState,
  setNoteTitle,
  setTodos,
  setIsTitleEditing 
} from '../../../store/actions/note'
import { 
  deleteFromStorage, 
  getNotesFromServer, 
  setNoteIdToDelete, 
  setUndoNoteId 
} from '../../../store/actions/noteList'
import { deleteNote } from '../../../utils/fetch'
import Backdrop from '../Backdrop/Backdrop'
import Button from '../Button/Button'
import classes from './Confirmation.module.scss'

const Confirmation = ({history}) => {
  const dispatch = useDispatch()
  const noteList = useSelector(state => state.noteList.notes)
  const deletionId = useSelector(state => state.noteList.deletionId)
  const undoId = useSelector(state => state.noteList.undoId)
  const token = useSelector(state => state.auth.token)
  const userId = useSelector(state => state.auth.userId)

  const deleteHandler = async () => {
    if (token) {
      await deleteNote(userId, deletionId, token)
      dispatch(setNoteIdToDelete(''))
      dispatch(getNotesFromServer())
    } else {
      dispatch(deleteFromStorage(deletionId))
    }
    history.push('/')
  }

  const resetHandler = () => {
    dispatch(setInitialState())
    dispatch(setUndoNoteId(''))
    if (noteList[undoId]) {
      dispatch(setNoteTitle(noteList[undoId].title))
      dispatch(setTodos(JSON.parse(JSON.stringify(noteList[undoId].todos))))
      dispatch(setIsTitleEditing(false))
      return
    }
    dispatch(setIsTitleEditing(true))
  }
  
  const cancelDeletion = () => dispatch(setNoteIdToDelete(''))
  const cancelReset = () => dispatch(setUndoNoteId(''))

  const renderDeletionBody = () => 
    <div className={classes.body}>
      <p><b>Confirm deletion of the note:</b></p>
      <p>{noteList[deletionId]?.title}</p>
      <div className={classes.buttons}>
        <Button
          text='Delete note'
          classType='danger'
          title='Delete note'
          clickHandler={deleteHandler}
        ></Button>
        <Button
          text='Cancel'
          classType='secondary'
          title='Cancel'
          clickHandler={cancelDeletion}
        ></Button>
      </div>
    </div>

  const renderUndoBody = () => 
    <div className={classes.body}>
      <p><b>Confirm reset for note:</b></p>
      <p>{noteList[undoId]?.title}</p>
      <p><b>All unsaved data will be lost!</b></p>

      <div className={classes.buttons}>
        <Button
          text='Reset changes'
          classType='danger'
          title='Reset changes'
          clickHandler={resetHandler}
        ></Button>
        <Button
          text='Cancel'
          classType='secondary'
          title='Cancel'
          clickHandler={cancelReset}
        ></Button>
      </div>
    </div>

  return (
    <>
      <div className={classes.modal}>
        <div className={classes.header}>
          <h3>Confirmation</h3>
          <span className="icon-alert"></span>
        </div>

        {
        deletionId
          ? renderDeletionBody()
          : renderUndoBody()
        }
      </div>

      <Backdrop 
        clickHandler={deletionId ? cancelDeletion : cancelReset}
      />
    </>
  )
}

export default withRouter(Confirmation)