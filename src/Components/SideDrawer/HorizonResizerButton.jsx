import React, {useEffect, useState, useCallback, useRef} from 'react'
import {useDoubleTap} from 'use-double-tap'
import Box from '@mui/material/Box'
import useTheme from '@mui/styles/useTheme'
import {MOBILE_WIDTH} from '../../utils/constants'


/**
 * Grab button to for resizing SideDrawer horizontally.
 *
 * @property {useRef} sidebarRef sidebar ref object.
 * @property {number} thickness resizer thickness in pixels.
 * @property {string} position position of the resizer on the sidebar (left or right).
 * @property {Function} setSidebarWidth sidebar width changing button.
 * @property {React.Component} The sidebar controlled by this button's action.
 * @return {React.Component}
 */
export default function HorizonResizerButton({
  sidebarRef,
  thickness = 10,
  position,
  sidebarWidth,
  setSidebarWidth,
}) {
  const [isXResizing, setIsXResizing] = useState(false)
  const [isSidebarXExpanded, setIsSidebarXExpanded] = useState(false)
  const xResizerRef = useRef(null)
  const theme = useTheme()
  const gripButtonRatio = 0.5
  const gripSize = thickness * gripButtonRatio
  // eslint-disable-next-line no-magic-numbers
  const horizonPadding = (thickness - gripSize) / 2

  const startXResizing = useCallback(() => {
    setIsXResizing(true)
  }, [])


  const stopResizing = useCallback(() => {
    setIsXResizing(false)
  }, [])


  const onXResizerDblTap = useDoubleTap((e) => {
    setIsSidebarXExpanded(!isSidebarXExpanded)
  })


  const resize = useCallback(
      (mouseMoveEvent) => {
        if (isXResizing) {
        // eslint-disable-next-line no-magic-numbers
          tempSidebarWidth = sidebarRef.current.getBoundingClientRect().right - mouseMoveEvent.clientX + 4
          if (tempSidebarWidth < 0) {
            tempSidebarWidth = 0
          }
          if (tempSidebarWidth > window.innerWidth) {
            tempSidebarWidth = window.innerWidth
          }
          setSidebarWidth(tempSidebarWidth)
          setIsSidebarXExpanded(true)
        }
      },
      [isXResizing, sidebarRef, setSidebarWidth],
  )


  useEffect(() => {
    const onWindowResize = (e) => {
      if (e.target.innerWidth < sidebarWidth) {
        tempSidebarWidth = e.target.innerWidth
        setSidebarWidth(tempSidebarWidth)
      }
    }
    window.addEventListener('resize', onWindowResize)
    window.addEventListener('mousemove', resize)
    window.addEventListener('mouseup', stopResizing)
    return () => {
      window.removeEventListener('resize', onWindowResize)
      window.removeEventListener('mousemove', resize)
      window.removeEventListener('mouseup', stopResizing)
    }
  }, [resize, setSidebarWidth, sidebarWidth, stopResizing])


  useEffect(() => {
    const xResizer = xResizerRef.current
    const onTouchStart = (e) => {
      switch (e.touches.length) {
        case 1: // one finger
          startXResizing(true)
          break
        // eslint-disable-next-line no-magic-numbers
        case 2: // two finger
          break
        // eslint-disable-next-line no-magic-numbers
        case 3: // three finger
          break
        default:
          break
      }
    }
    const onTouchEnd = (e) => {
      stopResizing()
    }
    const onTouchMove = (e) => {
      switch (e.touches.length) {
        case 1: // one finger
          resize(e.touches[0])
          break
        // eslint-disable-next-line no-magic-numbers
        case 2: // two finger
          break
        // eslint-disable-next-line no-magic-numbers
        case 3: // three finger
          break
        default:
          break
      }
    }
    xResizer.addEventListener('touchstart', onTouchStart)
    xResizer.addEventListener('touchend', onTouchEnd)
    xResizer.addEventListener('touchmove', onTouchMove)
    return () => {
      xResizer.removeEventListener('touchstart', onTouchStart)
      xResizer.removeEventListener('touchend', onTouchEnd)
      xResizer.removeEventListener('touchmove', onTouchMove)
    }
  }, [resize, setSidebarWidth, sidebarWidth, startXResizing, stopResizing])


  useEffect(() => {
    if (isSidebarXExpanded) {
      setSidebarWidth(tempSidebarWidth)
    } else {
      const defaultWidth = Math.min(window.innerWidth, MOBILE_WIDTH)
      setSidebarWidth(defaultWidth)
    }
  }, [isSidebarXExpanded, setSidebarWidth])


  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
        cursor: 'col-resize',
        resize: 'horizontal',
      }}
    >
      <Box
        sx={{
          padding: `${gripSize}px ${horizonPadding}px`,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          gap: `${gripSize}px`,
          background: theme.palette.primary.background,
        }}
        ref={xResizerRef}
        data-testid="x_resizer"
        onMouseDown={startXResizing}
        {...onXResizerDblTap}
      >
        {Array.from({length: 3}).map((v, i) =>
          <Box
            key={i}
            sx={{
              width: `${gripSize}px`,
              height: `${gripSize}px`,
              borderRadius: '3px',
              background: theme.palette.primary.contrastText,
              opacity: '0.3',
            }}
          />,
        )}
      </Box>
    </Box>
  )
}


let tempSidebarWidth = window.innerWidth
