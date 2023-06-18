import React, {useState} from 'react'
import Paper from '@mui/material/Paper'
import ButtonGroup from '@mui/material/ButtonGroup'
import {useAuth0} from '@auth0/auth0-react'
import useStore from '../store/useStore'
import {useIsMobile} from './Hooks'
import CameraControl from './CameraControl'
// import ViewsMenu from './ViewsMenu'
// import CombinedViewsMenu from './CombinedViewsMenu'
// import StandardViewsMenu from './StandardViewsMenu'
import ResourcesMenu from './ResourcesMenu'
// import AboutControl from './About/AboutControl'
import ShareControl from './ShareControl'
import {TooltipIconButton} from './Buttons'
import AuthNav from './AuthNav'
import ClearIcon from '../assets/icons/Clear.svg'
import ListIcon from '../assets/icons/List.svg'
import NotesIcon from '../assets/icons/Notes.svg'
// import {useExistInFeature} from '../hooks/useExistInFeature'
import ExpandIcon from '../assets/icons/Expand.svg'
import CollapseIcon from '../assets/icons/Collapse.svg'
import IsolateIcon from '../assets/icons/Isolate.svg'
// import CaptureIcon from '../assets/icons/Capture.svg'
// import HelpControl from './HelpControl'


/**
 * OperationsGroup contains tools for sharing, notes, properties, cut
 * plane, deselect, theme change and about.
 *
 * @property {Function} deselectItems deselects currently selected element
 * @return {React.Component}
 */
export default function OperationsGroup({deselectItems}) {
  const showControls = useStore((state) => state.showControls)
  const toggleShowControls = useStore((state) => state.toggleShowControls)
  const toggleIsNotesOn = useStore((state) => state.toggleIsNotesOn)
  const openDrawer = useStore((state) => state.openDrawer)
  // const isAppStoreOpen = useStore((state) => state.isAppStoreOpen)
  // const toggleAppStoreDrawer = useStore((state) => state.toggleAppStoreDrawer)
  const isNotesOn = useStore((state) => state.isNotesOn)
  const isPropertiesOn = useStore((state) => state.isPropertiesOn)
  const toggleIsPropertiesOn = useStore((state) => state.toggleIsPropertiesOn)
  const cutPlanes = useStore((state) => state.cutPlanes)
  const levelInstance = useStore((state) => state.levelInstance)
  const selectedElement = useStore((state) => state.selectedElement)
  const isLoginVisible = useStore((state) => state.isLoginVisible)
  const isCollaborationGroupVisible = useStore((state) => state.isCollaborationGroupVisible)
  const isModelInteractionGroupVisible = useStore((state) => state.isModelInteractionGroupVisible)
  const isSettingsVisible = useStore((state) => state.isSettingsVisible)
  // const isAppStoreEnabled = useExistInFeature('apps')
  // const toggleIsHelpTooltips = useStore((state) => state.toggleIsHelpTooltips)
  // const isHelpTooltips = useStore((state) => state.isHelpTooltips)
  const turnOffIsHelpTooltips = useStore((state) => state.turnOffIsHelpTooltips)
  const viewer = useStore((state) => state.viewer)
  const [isolate, setIsolate] = useState(false)
  const {isAuthenticated} = useAuth0()
  const isMobile = useIsMobile()
  const turnOffTooltips = () => {
    return isMobile ? turnOffIsHelpTooltips() : null
  }
  const isSelectedElement = () => {
    const ifSelected = (
      selectedElement !== null
    )
    return ifSelected
  }
  const isSelectedPlane = () => {
    const ifSelected = (
      cutPlanes.length !== 0 ||
      levelInstance !== null
    )
    return ifSelected
  }

  const toggle = (panel) => {
    openDrawer()
    if (panel === 'Properties') {
      toggleIsPropertiesOn()
    }
    if (panel === 'Notes') {
      toggleIsNotesOn()
    }
  }

  return (
    <div>
      {showControls &&
      <div>
        <Paper
          variant='control'
          sx={{
            'display': 'flex',
            'flexDirection': 'column',
            'marginTop': '1em',
            'marginRight': '1em',
            'opacity': .9,
            '.MuiButtonGroup-root + .MuiButtonGroup-root': {
              borderRadius: 0,
            },
          }}
        >
          {isLoginVisible && isAuthenticated &&
          <ButtonGroup orientation='vertical'>
            <AuthNav/>
          </ButtonGroup>
          }

          {isCollaborationGroupVisible &&
          <ButtonGroup orientation='vertical'>
            <ShareControl/>
          </ButtonGroup>
          }

          {isModelInteractionGroupVisible &&
          <ButtonGroup orientation='vertical'>
            <TooltipIconButton
              title='Notes'
              icon={<NotesIcon/>}
              selected={isNotesOn}
              onClick={() => {
                turnOffTooltips()
                toggle('Notes')
              }}
            />

            {/* <PlanesMenu/> */}
            {/* <CombinedViewsMenu/> */}
            {/* <StandardViewsMenu/> */}

            {/* <TooltipIconButton
              title='Notes'
              icon={<CaptureIcon/>}
              selected={isNotesOn}
              onClick={() => {
                turnOffTooltips()
                toggle('Notes')
              }}
            /> */}
          </ButtonGroup>
          }

          {isSettingsVisible &&
          <ButtonGroup orientation='vertical'>
            {/* <TooltipIconButton
              title={`${theme.palette.mode === 'light' ? 'Day' : 'Night'} theme`}
              onClick={() => theme.toggleColorMode()}
              icon={theme.palette.mode === 'light' ? <MoonIcon/> : <SunIcon/>}
            /> */}
            {/* <TooltipIconButton
              title='Help'
              onClick={() => toggleIsHelpTooltips()}
              selected={isHelpTooltips}
              icon={<QuestionIcon/>}
            /> */}
            {/* <ResourcesMenu/> */}
            {/* <HelpControl/> */}
          </ButtonGroup>
          }
          <ResourcesMenu/>
          {/* <AboutControl/> */}
          {/* Invisible */}
          <CameraControl/>
        </Paper>
        {(isSelectedElement() || isSelectedPlane() || isolate) &&
        <Paper
          variant='control'
          sx={{
            'display': 'flex',
            'flexDirection': 'column',
            'marginRight': '1em',
            'marginTop': '1em',
            'opacity': .9,
            '.MuiButtonGroup-root + .MuiButtonGroup-root': {
              borderRadius: 0,
            },
          }}
        >
          <ButtonGroup
            orientation='vertical'
          >
            {isSelectedElement() &&
            <>
              <TooltipIconButton
                showTitle={true}
                title='Properties'
                onClick={() => {
                  turnOffTooltips()
                  toggle('Properties')
                }}
                selected={isPropertiesOn}
                icon={<ListIcon/>}
              />
              <TooltipIconButton
                showTitle={true}
                title='Isolate'
                onClick={() => {
                  viewer.isolator.toggleIsolationMode()
                  setIsolate(!isolate)
                }}
                selected={isolate}
                icon={<IsolateIcon/>}
              />
            </>
            }
            {(isSelectedElement() || isSelectedPlane()) &&
                <TooltipIconButton
                  showTitle={true}
                  title='Clear'
                  onClick={deselectItems}
                  selected={isSelectedElement() || isSelectedPlane()}
                  icon={<ClearIcon/>}
                />
            }
          </ButtonGroup>
        </Paper>
        }
      </div>
      }
      <Paper
        variant='control'
        sx={{
          'display': 'flex',
          'flexDirection': 'column',
          'marginRight': '1em',
          'marginTop': '1em',
          'opacity': .9,
          '@media (max-width: 900px)': {
            // padding: '1em 0.5em',
          },
          '.MuiButtonGroup-root + .MuiButtonGroup-root': {
            borderRadius: 0,
          },
        }}
      >
        <ButtonGroup
          orientation='vertical'
        >
          <TooltipIconButton
            title={''}
            showTitle={false}
            onClick={toggleShowControls}
            icon={showControls ? <CollapseIcon/> : <ExpandIcon/>}
          />
        </ButtonGroup>
      </Paper>
    </div>
  )
}
