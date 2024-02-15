import React from 'react'
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box'
import ControlsGroup from '../Components/ControlsGroup'
import {useWindowDimensions} from '../Components/Hooks'
import NavTreePanel from '../Components/NavTree/NavTreePanel'
import SearchBar from '../Components/Search/SearchBar'
import SideDrawer from '../Components/SideDrawer/SideDrawer'
import VersionsPanel from '../Components/Versions/VersionsPanel'
import useStore from '../store/useStore'


/**
 * @property {Function} deselectItems deselects currently selected element
 * @return {React.ReactElement}
 */
export default function ControlsGroupAndDrawer({
  deselectItems,
  model,
  modelPath,
  pathPrefix,
  branch,
  selectWithShiftClickEvents,
}) {
  const isNavTreeEnabled = useStore((state) => state.isNavTreeEnabled)
  const isNavTreeVisible = useStore((state) => state.isNavTreeVisible)
  const isSearchBarVisible = useStore((state) => state.isSearchBarVisible)
  const isSearchEnabled = useStore((state) => state.isSearchEnabled)
  const isVersionsEnabled = useStore((state) => state.isVersionsEnabled)
  const isVersionsVisible = useStore((state) => state.isVersionsVisible)

  const navigate = useNavigate()

  const windowDimensions = useWindowDimensions()
  const spacingBetweenSearchAndOpsGroupPx = 20
  const operationsGroupWidthPx = 100
  const searchAndNavWidthPx =
    windowDimensions.width - (operationsGroupWidthPx + spacingBetweenSearchAndOpsGroupPx)
  const searchAndNavMaxWidthPx = 300

  return (
    <Box
      sx={{
        'position': 'absolute',
        'top': `1em`,
        'left': '1em',
        'display': 'flex',
        'flexDirection': 'column',
        'justifyContent': 'flex-start',
        'alignItems': 'flex-start',
        'maxHeight': '95%',
        'width': '275px',
        '@media (max-width: 900px)': {
          width: `${searchAndNavWidthPx}px`,
          maxWidth: `${searchAndNavMaxWidthPx}px`,
        },
      }}
    >
      <ControlsGroup
        navigate={navigate}
        isRepoActive={modelPath.repo !== undefined}
      />

      {isSearchEnabled &&
       <Box sx={{marginTop: '0.82em', width: '100%'}}>
         {isSearchBarVisible && <SearchBar/>}
       </Box>
      }

      <Box sx={{marginTop: '.82em', width: '100%'}}>
        {isNavTreeEnabled &&
         isNavTreeVisible &&
         model &&
         <NavTreePanel
           model={model}
           selectWithShiftClickEvents={selectWithShiftClickEvents}
           pathPrefix={
             pathPrefix + (modelPath.gitpath ? modelPath.getRepoPath() : modelPath.filepath)
           }
         />
        }

        {isVersionsEnabled &&
         modelPath.repo !== undefined &&
         isVersionsVisible &&
         !isNavTreeVisible &&
         <VersionsPanel
           filePath={modelPath.filepath}
           currentRef={branch}
         />}
      </Box>
    </Box>
  )
}
