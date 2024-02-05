import React, {useState} from 'react'
import {useSwipeable} from 'react-swipeable'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/styles/useTheme'
import {ControlButton, TooltipIconButton} from './Buttons'
import Dialog from './Dialog'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import ArrowForwardIcon from '@mui/icons-material/ArrowForward'
import AutoFixHighOutlinedIcon from '@mui/icons-material/AutoFixHighOutlined'
import ChatOutlinedIcon from '@mui/icons-material/ChatOutlined'
import CloseIcon from '@mui/icons-material/Close'
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined'
import CropOutlinedIcon from '@mui/icons-material/CropOutlined'
import FilterCenterFocusIcon from '@mui/icons-material/FilterCenterFocus'
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted'
import HelpOutlineIcon from '@mui/icons-material/HelpOutline'
import HideSourceOutlinedIcon from '@mui/icons-material/HideSourceOutlined'
import HistoryIcon from '@mui/icons-material/History'
import PortraitIcon from '@mui/icons-material/Portrait'
import SearchIcon from '@mui/icons-material/Search'
import TouchAppOutlinedIcon from '@mui/icons-material/TouchAppOutlined'
import VisibilityOutlinedIcon from '@mui/icons-material/VisibilityOutlined'
import TreeIcon from '../assets/icons/Tree.svg'
import ShiftIcon from '../assets/icons/Shift.svg'
import ShareIcon from '../assets/icons/Share.svg'


/**
 * The main component to display a help control button and a help dialog.
 *
 * @property {Function} fileOpen Callback for file opening
 * @property {string} modelPath Path to the model
 * @property {boolean} isLocalModel Determines if the model is local
 * @return {React.ReactElement}
 */
export default function HelpControl({fileOpen, modelPath, isLocalModel}) {
  const [isDialogDisplayed, setIsDialogDisplayed] = useState(false)

  return (
    <ControlButton
      icon={<HelpOutlineIcon className='icon-share'/>}
      title={'Help'}
      isDialogDisplayed={isDialogDisplayed}
      setIsDialogDisplayed={setIsDialogDisplayed}
      sx={{
        position: 'fixed',
        bottom: '1em',
        right: '1em',
      }}
    >
      <HelpDialog
        isDialogDisplayed={isDialogDisplayed}
        setIsDialogDisplayed={setIsDialogDisplayed}
      />
    </ControlButton>
  )
}


/**
 * The main dialog displaying the help contents.
 * Provides controls for navigating between pages of help entries.
 *
 * @property {boolean} isDialogDisplayed Determines if the dialog is displayed
 * @property {Function} setIsDialogDisplayed Callback to set the dialog display state
 * @return {React.ReactElement}
 */
export function HelpDialog({isDialogDisplayed, setIsDialogDisplayed}) {
  const [pageIndex, setPageIndex] = useState(0)
  const totalPages = 4
  const theme = useTheme()


  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => {
      if (pageIndex < totalPages - 1) {
        setPageIndex(pageIndex + 1)
      }
    },
    onSwipedRight: () => {
      if (pageIndex > 0) {
        setPageIndex(pageIndex - 1)
      }
    },
  })

  return (
    <Dialog
      headerIcon={<HelpOutlineIcon/>}
      headerText={'Help'}
      isDialogDisplayed={isDialogDisplayed}
      setIsDialogDisplayed={setIsDialogDisplayed}
      actionTitle={'OK'}
      actionIcon={<HelpOutlineIcon/>}
      actionCb={() => setIsDialogDisplayed(false)}
    >
      <Box
        sx={{
          width: '250px',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          alignItems: 'center',
          marginTop: '10px',
        }}
        {...swipeHandlers}
      >
        <HelpList pageIndex={pageIndex}/>
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '68%',
            marginTop: '6px',
            alignItems: 'center',
          }}
        >
          <TooltipIconButton
            title='Previous'
            placement='right'
            variant='noBackground'
            icon={
              <ArrowBackIcon
                sx={{cursor: pageIndex > 0 ? 'pointer' : 'not-allowed'}}
              />}
            onClick={() => pageIndex > 0 && setPageIndex(pageIndex - 1)}
          />

          <Stack
            sx={{width: '100%'}}
            direction="row"
            justifyContent="center"
            alignItems="center"
          >
            <Stack
              direction='row' sx={{width: '38px'}}
            >
              {[...Array(totalPages)].map((_, idx) => (
                <Box
                  key={idx}
                  sx={{
                    width: '6px',
                    height: '6px',
                    backgroundColor: idx === pageIndex ?
                      theme.palette.primary.main :
                      theme.palette.secondary.background,
                    borderRadius: '50%',
                    marginX: '2px',
                  }}
                />
              ))}
            </Stack>
          </Stack>
          <TooltipIconButton
            title='Next'
            placement='right'
            variant='noBackground'
            icon={
              <ArrowForwardIcon
                sx={{cursor: pageIndex < totalPages - 1 ? 'pointer' : 'not-allowed'}}
              />}
            onClick={() => pageIndex < totalPages - 1 && setPageIndex(pageIndex + 1)}
          />
        </Box>
      </Box>
    </Dialog>
  )
}


/**
 * Represents a single help entry with an icon and a description.
 *
 * @property {React.ReactElement} icon Icon for the help entry
 * @property {string} description Description text for the help entry
 * @return {React.ReactElement}
 */
const HelpComponent = ({icon, description}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        width: '230px',
        marginBottom: '10px',
        paddingBottom: '2px',
        paddingTop: '2px',
      }}
    >
      <Box sx={{marginLeft: '10px'}}>{icon}</Box>
      <Typography
        variant='overline'
        sx={{
          marginLeft: '34px',
          width: '220px',
          textAlign: 'left',
          lineHeight: '1.4em',
        }}
      >
        {description}
      </Typography>
    </Box>
  )
}


/**
 * Represents a list of help entries, paginated.
 *
 * @property {number} pageIndex Index of the current displayed page
 * @return {React.ReactElement}
 */
const HelpList = ({pageIndex}) => {
  const helpContent = [
    {
      icon: <CreateNewFolderOutlinedIcon className='icon-share'/>,
      description: 'Open IFC models from GITHUB or local drive',
    },
    {
      icon: <CropOutlinedIcon className='icon-share'/>,
      description: 'Study the model using standard sections',
    },
    {
      icon: <TouchAppOutlinedIcon className='icon-share'/>,
      description: 'Double click the model to select a model element',
    },
    {
      icon: <ShiftIcon className='icon-share'/>,
      description: 'Hold shift to select multiple elements',
    },
    {
      icon: <FormatListBulletedIcon className='icon-share'/>,
      description: 'Study properties attached to selected element',
    },
    {
      icon: <FilterCenterFocusIcon className='icon-share'/>,
      description: 'Isolate selected element',
    },
    {
      icon: <HideSourceOutlinedIcon className='icon-share'/>,
      description: 'Hide selected element',
    },
    {
      icon: <VisibilityOutlinedIcon className='icon-share'/>,
      description: `Show all hidden elements`,
    },
    {
      icon: <CloseIcon className='icon-share'/>,
      description: 'Clear selected elements',
    },
    {
      icon: <TreeIcon className='icon-share'/>,
      description: 'Navigate the model using element hierarchy',
    },
    {
      icon: <HistoryIcon className='icon-share'/>,
      description: 'Access project versions',
    },
    {
      icon: <SearchIcon className='icon-share'/>,
      description: 'Search the model',
    },
    {
      icon: <PortraitIcon className='icon-share'/>,
      description: 'Log in to get access to projects hosted on Github',
    },
    {
      icon: <ShareIcon className='icon-share'/>,
      description: 'Share sectioned portions of the model',
    },
    {
      icon: <ChatOutlinedIcon className='icon-share'/>,
      description: 'Attach notes to 3D elements',
    },
    {
      icon: <AutoFixHighOutlinedIcon className='icon-share'/>,
      description: 'Create renderings using Bot the BLDR',
    },
  ]

  /* eslint-disable no-magic-numbers */
  const pageContents = [
    helpContent.slice(0, 4),
    helpContent.slice(4, 9),
    helpContent.slice(9, 12),
    helpContent.slice(12),
  ]
  /* eslint-enable no-magic-numbers */

  return (
    <Box sx={{marginLeft: '10px', height: '240px'}}>
      {pageContents[pageIndex].map((item, index) => (
        <HelpComponent key={index} icon={item.icon} description={item.description}/>
      ))}
    </Box>
  )
}
