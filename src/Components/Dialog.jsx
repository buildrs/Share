import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import MuiDialog from '@mui/material/Dialog'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Paper from '@mui/material/Paper'
import useTheme from '@mui/styles/useTheme'
import {assertDefined} from '../utils/assert'
import CloseIcon from '@mui/icons-material/Close'


/**
 * A generic base dialog component.
 *
 * @property {object} headerIcon Leading icon above header description
 * @property {string} headerText Short message describing the operation
 * @property {boolean} isDialogDisplayed React var
 * @property {Function} setIsDialogDisplayed React setter
 * @property {string} [actionTitle] Title for the action button
 * @property {Function} [actionCb] Callback for action button
 * @property {React.ReactElement} children Content of the dialog
 * @return {React.ReactElement}
 */
export default function Dialog({
  headerIcon,
  headerText,
  isDialogDisplayed,
  setIsDialogDisplayed,
  actionTitle,
  actionCb,
  children,
}) {
  assertDefined(
      headerText,
      isDialogDisplayed, setIsDialogDisplayed,
      children)
  const close = () => setIsDialogDisplayed(false)
  const theme = useTheme()
  return (
    <MuiDialog
      open={isDialogDisplayed}
      onClose={close}
    >
      <DialogTitle>
        {headerIcon ?
         <Box
           sx={{
             display: 'flex',
             flexDirection: 'column',
             justifyContent: 'center',
             alignItems: 'center',
           }}
         >
           <Paper
             sx={{
               display: 'flex',
               flexDirection: 'column',
               alignItems: 'center',
               justifyContent: 'center',
               width: '2em',
               height: '2em',
               borderRadius: '50%',
               background: theme.palette.secondary.main,
             }}
           >
             {headerIcon}
           </Paper>
           <Typography variant='overline'>{headerText}</Typography>
         </Box> : headerText
        }

      </DialogTitle>
      <IconButton onClick={close} size='small'>
        <CloseIcon fontSize='inherit'/>
      </IconButton>
      <DialogContent>{children}</DialogContent>
      {(actionTitle === undefined || actionTitle === undefined) ? null :
       <DialogActions>
         <Button variant='contained' onClick={actionCb} >
           {actionTitle}
         </Button>
       </DialogActions>
      }
    </MuiDialog>
  )
}
