import React, {useEffect, useState} from 'react'
import {useAuth0} from '@auth0/auth0-react'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import * as Sentry from '@sentry/react'
import debug from '../../utils/debug'
import useStore from '../../store/useStore'
import {useIsMobile} from '../Hooks'
import {getIssueComments} from '../../net/github/Issues'
import Loader from '../Loader'
import NoContent from '../NoContent'
import NoteCard from './NoteCard'
import NoteCardCreate from './NoteCardCreate'
import ApplicationError from '../ApplicationError'


/**
 * List of Notes
 *
 * @return {React.ReactElement}
 */
export default function Notes() {
  const accessToken = useStore((state) => state.accessToken)
  const comments = useStore((state) => state.comments)
  const isCreateNoteVisible = useStore((state) => state.isCreateNoteVisible)
  const isLoadingNotes = useStore((state) => state.isLoadingNotes)
  const notes = useStore((state) => state.notes)
  const repository = useStore((state) => state.repository)
  const selectedNoteId = useStore((state) => state.selectedNoteId)
  const setComments = useStore((state) => state.setComments)

  const [hasError, setHasError] = useState(false)

  const {user} = useAuth0()
  const isMobile = useIsMobile()

  const selectedNote =
        (notes && selectedNoteId) ?
        notes.filter((issue) => issue.id === selectedNoteId)[0] :
        null

  const handleError = (err) => {
    if (!err) {
      return
    }
    Sentry.captureException(err)
    setHasError(true)
  }

  // Fetch comments based on selected note id
  useEffect(() => {
    (async () => {
      try {
        if (!repository) {
          debug().warn('IssuesControl#Notes: 1, no repo defined')
          return
        }
        if (!selectedNoteId || !selectedNote) {
          return
        }
        const newComments = []
        const commentArr = await getIssueComments(repository, selectedNote.number, accessToken)
        debug().log('Notes#useEffect: commentArr: ', commentArr)

        if (commentArr) {
          commentArr.map((comment) => {
            newComments.push({
              id: comment.id,
              body: comment.body,
              date: comment.created_at,
              username: comment.user.login,
              avatarUrl: comment.user.avatar_url,
              synched: true,
            })
          })
        }
        setComments(newComments)
      } catch (e) {
        debug().warn('failed to fetch comments: ', e)
        handleError(e)
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedNote])


  return hasError ?
    <ApplicationError/> : (
    <List
      spacing={1}
      sx={isMobile ? {paddingBottom: '100px'} : {}}
    >
      {isLoadingNotes && !isCreateNoteVisible && <Loader type={'linear'}/>}
      {notes && notes.length === 0 && !isCreateNoteVisible && !isLoadingNotes && <NoContent/>}
      {!user && isCreateNoteVisible && <NoContent message={'Please login to create notes.'}/>}
      {user && isCreateNoteVisible && <NoteCardCreate/>}
      {!selectedNoteId && !isCreateNoteVisible && notes && !isLoadingNotes &&
       notes.map((note, index) => {
         return (
           <ListItem key={index}>
             <NoteCard
               index={note.index}
               id={note.id}
               noteNumber={note.number}
               title={note.title}
               date={note.date}
               body={note.body}
               username={note.username}
               numberOfComments={note.numberOfComments}
               avatarUrl={note.avatarUrl}
               synched={note.synched}
             />
           </ListItem>
         )
       })
      }
      {selectedNote &&
       <NoteCard
         avatarUrl={selectedNote.avatarUrl}
         body={selectedNote.body}
         date={selectedNote.date}
         id={selectedNote.id}
         index={selectedNote.index}
         noteNumber={selectedNote.number}
         numberOfComments={selectedNote.numberOfComments}
         synched={selectedNote.synched}
         title={selectedNote.title}
         username={selectedNote.username}
       />
      }
      {comments && selectedNote &&
       comments.map((comment, index) => {
         return (
           <ListItem key={index}>
             <NoteCard
               isNote={false}
               id={comment.id}
               index=''
               body={comment.body}
               date={comment.date}
               username={comment.username}
               avatarUrl={comment.avatarUrl}
               synched={comment.synched}
             />
           </ListItem>
         )
       })
      }
    </List>
  )
}
