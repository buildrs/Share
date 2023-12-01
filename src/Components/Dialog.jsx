import React from 'react'
import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import DialogActions from '@mui/material/DialogActions'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import MuiDialog from '@mui/material/Dialog'
import Typography from '@mui/material/Typography'
import {assertDefined} from '../utils/assert'
import {IconButton} from '@mui/material'
import CloseIcon from '@mui/icons-material/Close'


/**
 * A generic base dialog component.
 *
 * @property {object} icon Leading icon above header description
 * @property {string} headerText Short message describing the operation
 * @property {boolean} isDialogDisplayed React var
 * @property {Function} setIsDialogDisplayed React setter
 * @property {React.ReactElement} content Content of the dialog
 * @property {string} actionTitle Title for the action button
 * @property {Function} actionCb Callback for action button
 * @property {React.ReactElement} [actionIcon] Optional icon for the action button
 * @return {React.Component}
 */
export default function Dialog({
  icon,
  headerText,
  headerIcon,
  isDialogDisplayed,
  setIsDialogDisplayed,
  content,
  actionTitle,
  actionCb,
  actionIcon,
}) {
  assertDefined(
      headerText, isDialogDisplayed, setIsDialogDisplayed, content,
      actionTitle, actionCb)
  const close = () => setIsDialogDisplayed(false)
  return (
    <MuiDialog
      open={isDialogDisplayed}
      onClose={close}
    >
      <DialogTitle>
        <Box sx={{display: 'inline-flex', flexDirection: 'column', textAlign: 'center', width: '50px', marginTop: '10px'}}>
          {headerIcon}
          <Typography variant={'overline'}>{headerText}</Typography>
        </Box>
      </DialogTitle>
      <IconButton onClick={close} size="small">
        <CloseIcon fontSize="inherit"/>
      </IconButton>
      <DialogContent>{content}</DialogContent>
      <DialogActions>
        <Button variant="contained" onClick={actionCb} >
          {actionTitle}
        </Button>
      </DialogActions>
    </MuiDialog>
  )
}
