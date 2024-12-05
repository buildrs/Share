import React, {ReactElement} from 'react'
import Box from '@mui/material/Box'
import AppsPanel, {AppPreviewPanel} from '../Components/Apps/AppsPanel'
import SideDrawer from '../Components/SideDrawer/SideDrawer'
import useStore from '../store/useStore'


/**
 * @return {ReactElement}
 */
export default function AppsSideDrawer() {
  const isAppsVisible = useStore((state) => state.isAppsVisible)
  const appsDrawerWidth = useStore((state) => state.appsDrawerWidth)
  const appsDrawerWidthInitial = useStore((state) => state.appsDrawerWidthInitial)
  const setAppsDrawerWidth = useStore((state) => state.setAppsDrawerWidth)
  const selectedApp = useStore((state) => state.selectedApp)
  return (
    <SideDrawer
      isDrawerVisible={isAppsVisible}
      drawerWidth={appsDrawerWidth}
      drawerWidthInitial={appsDrawerWidthInitial}
      setDrawerWidth={setAppsDrawerWidth}
      dataTestId='AppsDrawer'
    >
      <Box
        sx={{
          width: '100%',
          overflow: 'hidden',
        }}
        data-testid='AppsSideDrawer-OverflowHidden'
      >
        <Box
          sx={{
            display: isAppsVisible ? 'block' : 'none',
            height: '100%',
            overflowX: 'hidden',
            overflowY: 'auto',
          }}
          data-testid='AppsSideDrawer-OverflowYAuto'
        >
          {!selectedApp ?
           <AppsPanel/> :
           <AppPreviewPanel item={selectedApp}/>
          }
        </Box>
      </Box>
    </SideDrawer>
  )
}
