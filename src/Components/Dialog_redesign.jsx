import React from 'react'
import MuiDialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import {makeStyles, useTheme} from '@mui/styles'
import {RectangularButton} from './Buttons'
import {assertDefined} from '../utils/assert'
import InputBar from './InputBar'
import {UilBuilding, UilUpload, UilGraduationCap, UilGithub} from '@iconscout/react-unicons'
import {grey} from '@mui/material/colors'
import Divider from '@mui/material/Divider'
import Paper from '@mui/material/Paper'


/**
 * A generic base dialog component.
 * @param {Object} icon Leading icon above header description
 * @param {string} headerText Short message describing the operation
 * @param {boolean} isDialogDisplayed
 * @param {function} setIsDialogDisplayed
 * @param {Object} clazzes Optional classes
 * @param {Object} content node
 * @return {Object} React component
 */
export default function Dialog({
  headerContent,
  bodyContent,
  isDialogDisplayed,
  setIsDialogDisplayed,
}) {
  assertDefined(headerContent, bodyContent, isDialogDisplayed, setIsDialogDisplayed)
  const classes = useStyles(useTheme())
  const close = () => setIsDialogDisplayed(false)
  return (
    <MuiDialog
      open={isDialogDisplayed}
      onClose={close}
      maxWidth={'sm'}
    >
      <DialogTitle>
        {headerContent}
      </DialogTitle>
      <DialogContent className={classes.contentBody}>
        {bodyContent}
      </DialogContent>
    </MuiDialog>)
}


/**
 * Content for the open Dialog
 * @return {Object} React component
 */
export function OpenDialogBodyContent() {
  const classes = useStyles(useTheme())
  return (
    <div className={classes.contentBody}>
      <div className={classes.recommendedContainer}>
        <div className={classes.recommendedText}>Recommended Method</div>
        <InputBar startAdorment={<UilGithub/>}/>
        <div className={classes.fileDescriptionContainer}>
          <UilGraduationCap className={classes.fileDescriptionIcon}/>
          <div className={classes.fileDescriptionText}>
            How do I host .ifc files on GitHub?
          </div>
        </div>
      </div>
      <div className={classes.divider}>
        <Divider/>
        <Paper elevation={0} className={classes.dividerText}>or</Paper>
      </div>
      <RectangularButton title='Upload from device' icon={<UilUpload/>}/>
      <div className={classes.divider}>
        <Divider/>
        <Paper elevation={0} className={classes.dividerText}>or</Paper>
      </div>
      <RectangularButton title='Browse IFCs' icon={<UilBuilding/>}/>
    </div>
  )
}


/**
 * Title for the open Dialog
 * @return {Object} React component
 */
export function OpenDialogHeaderContent() {
  const classes = useStyles(useTheme())
  return (
    <div className={classes.titleContainer}>
      <div className={classes.titleTextContainer}>
        <div className={classes.titleText}>
          Open file
          <div className={classes.secondarytext}>
            We support .ifc file types
          </div>
        </div>
      </div>
      {/* <div>
        <UilMultiply style={{color: '#505050'}}/>
      </div> */}
    </div>

  )
}


const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
    maxWidth: '500px',
  },
  titleTextContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignContent: 'center',
  },
  titleText: {
    fontWeight: 'bold',
    fontSize: '30px',
  },
  secondarytext: {
    fontWeight: 500,
    fontSize: '14px',
    lineHeight: '17px',
    color: '#777777',
  },
  contentBody: {
    height: '400px',
    maxWidth: '340px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignContent: 'center',
  },
  divider: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  dividerText: {
    fontFamily: 'Helvetica',
    position: 'absolute',
    alignSelf: 'center',
    textAlign: 'center',
    width: '40px',
    color: '#777777',
    backgroundColor: grey[100],
  },
  recommendedContainer: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
  },
  recommendedText: {
    fontFamily: 'Helvetica',
    marginBottom: '12px',
    fontWeight: 600,
    fontSize: '10px',
    lineHeight: '12px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase',
    color: '#0085FF',
    textAlign: 'center',
  },
  fileDescriptionContainer: {
    marginTop: '10px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignContent: 'center',
    cursor: 'pointer',
  },
  fileDescriptionText: {
    fontFamily: 'Helvetica',
    marginLeft: '5px',
    width: '200px',
    color: '#979797',
    fontSize: '12px',
  },
  fileDescriptionIcon: {
    color: '#979797',
    width: '13px',
    height: '13px',
  },
}))

