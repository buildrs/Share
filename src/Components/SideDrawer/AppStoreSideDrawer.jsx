import React, {useEffect, useRef} from 'react'
import {useLocation} from 'react-router-dom'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import useTheme from '@mui/styles/useTheme'
import {useIsMobile} from '../Hooks'
import useStore from '../../store/useStore'
import {hexToRgba} from '../../utils/color'
import {getHashParams} from '../../utils/location'
import HorizonResizerButton from './HorizonResizerButton'
import VerticalResizerButton from './VerticalResizerButton'
import {AppStorePanel} from './SideDrawerPanels'


/**
 * @return {React.Component}
 */
export default function AppStoreSideDrawer() {
  const isAppStoreOpen = useStore((state) => state.isAppStoreOpen)
  const sidebarWidth = useStore((state) => state.appStoreSidebarWidth)
  const setAppStoreSidebarWidth = useStore((state) => state.setAppStoreSidebarWidth)
  const sidebarHeight = useStore((state) => state.appStoreSidebarHeight)
  const setAppStoreSidebarHeight = useStore((state) => state.setAppStoreSidebarHeight)
  const isMobile = useIsMobile()
  const sidebarRef = useRef(null)
  const theme = useTheme()
  const thickness = 10
  const borderOpacity = 0.5


  // useEffect(() => {
  // }, [location])


  return (
    <Box
      sx={Object.assign({
        display: isAppStoreOpen ? 'flex' : 'none',
        flexDirection: 'row',
      }, isMobile ? {
        width: '100%',
        height: sidebarHeight,
      } : {
        top: 0,
        right: 0,
        width: sidebarWidth,
        height: '100vh',
        minWidth: '8px',
        maxWidth: '100vw',
      })}
    >
      <Paper
        sx={{
          position: 'relative',
          display: 'flex',
          flexDirection: 'row',
          width: '100%',
          borderRadius: 0,
          background: theme.palette.primary.background,
        }}
        ref={sidebarRef}
        onMouseDown={(e) => e.preventDefault()}
      >
        {!isMobile &&
          <HorizonResizerButton
            sidebarRef={sidebarRef}
            thickness={thickness}
            isOnLeft={true}
            sidebarWidth={sidebarWidth}
            setSidebarWidth={setAppStoreSidebarWidth}
          />
        }
        {isMobile &&
          <VerticalResizerButton
            sidebarRef={sidebarRef}
            thickness={thickness}
            isOnTop={true}
            sidebarHeight={sidebarHeight}
            setSidebarHeight={setAppStoreSidebarHeight}
          />
        }
        {/* Content */}
        <Box
          sx={{
            width: '100%',
            margin: '1em',
            overflow: 'hidden',
          }}
        >
          <Box
            sx={{
              display: isAppStoreOpen ? 'block' : 'none',
              height: '100%',
              overflowX: 'hidden',
              overflowY: 'auto',
            }}
          >
            <AppStorePanel/>
          </Box>
        </Box>
      </Paper>
    </Box>
  )
}
