import React from 'react'
import {makeStyles, useTheme} from '@mui/styles'
import ItemProperties from './ItemProperties'
import CloseIcon from '../assets/2D_Icons/Close.svg'
import {TooltipIconButton} from './Buttons'
import {IssuesNavBar, Issues} from './IssuesControl'
import useStore from '../utils/store'


export const NotesPanel = ()=> {
  const classes = useStyles(useTheme())

  return (
    <>
      <IssuesNavBar/>
      <div className = {classes.contentContainer}>
        <Issues/>
      </div>
    </>
  )
}

export const PropertiesPanel = ()=> {
  const toggleIsPropertiesOn = useStore((state) => state.toggleIsPropertiesOn)
  const classes = useStyles(useTheme())
  return (
    <>
      <div className = {classes.titleContainer}>
        <div className = {classes.title}>
          Properties
        </div>
        <div>
          <TooltipIconButton
            title='toggle drawer'
            onClick={toggleIsPropertiesOn}
            icon={<CloseIcon style = {{width: '24px', height: '24px'}}/>}/>
        </div>
      </div>
      <div className = {classes.contentContainer}>
        <ItemProperties />
      </div>
    </>
  )
}

const useStyles = makeStyles((theme) => ({
  titleContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingLeft: '10px',
    borderRadius: '5px',
    background: theme.palette.custom.highLight,
  },
  title: {
    height: '30px',
    display: 'flex',
    fontSize: '18px',
    textDecoration: 'underline',
    fontWeight: 'bold',
    marginRight: '10px',
    paddingLeft: '2px',
    alignItems: 'center',
  },
  contentContainer: {
    marginTop: '4px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    height: '100%',
    overflow: 'scroll',
  },
  controls: {
    height: '100%',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  rightGroup: {
    width: '160px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  leftGroup: {
    width: '100px',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-start',
    alignItems: 'center',
  },
  container: {
    background: '#7EC43B',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  notifications: {
    width: '19px',
    height: '20px',
    border: '1px solid lime',
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    fontSize: '10px',
    color: 'black',
    borderRadius: '20px',
  },
}))
