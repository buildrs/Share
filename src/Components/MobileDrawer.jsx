import React, {useState} from 'react'
import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import SwipeableDrawer from '@mui/material/SwipeableDrawer'
import {useTheme} from '@mui/styles'
import useStore from '../store/useStore'
import {TooltipIconButton} from './Buttons'
import CaretIcon from '../assets/2D_Icons/Caret.svg'


const drawerBleeding = 300


/**
 * @param {object} content React component to be wrapped
 * @return {object} React component
 */
export default function MobileDrawer({content}) {
  const [open, setOpen] = useState(true)
  const toggleDrawer = () => setOpen(!open)
  const closeDrawer = useStore((state) => state.closeDrawer)
  const openDrawer = useStore((state) => state.openDrawer)
  const theme = useTheme()

  return (
    <Paper
      sx={{
        '& .MuiDrawer-root': {
          height: '100%',
          border: 'none',
          opacity: 0.95,
        },
        '& .MuiDrawer-root > .MuiPaper-root': {
          // TODO(pablo): Workaround bug...
          // https://github.com/mui/material-ui/issues/16942
          height: '100%',
          overflow: open ? 'scroll' : 'visible',
        },
      }}
    >
      <SwipeableDrawer
        anchor="bottom"
        variant="persistent"
        open={open}
        onClose={closeDrawer}
        onOpen={openDrawer}
        swipeAreaWidth={drawerBleeding}
        disableSwipeToOpen={false}
      >
        <Box
          sx={{
            backgroundColor: theme.palette.background.paper,
            overflowY: 'scroll',
            position: 'absolute',
            visibility: 'visible',
            top: open ? '0px' : `-${drawerBleeding}px`,
            right: 0,
            left: 0,
            padding: '.5em',
            borderTopLeftRadius: 16,
            borderTopRightRadius: 16,
          }}
        >
          <Box
            sx={{
              'display': 'flex',
              'justifyContent': 'center',
              'alignItems': 'center',
              '& svg': {
                transform: open ? 'none' : 'rotate(180deg)',
              },
            }}
          >
            <TooltipIconButton
              title="Expand"
              onClick={toggleDrawer}
              icon={<CaretIcon/>}
            />
          </Box>
          {content}
        </Box>
      </SwipeableDrawer>
    </Paper>
  )
}
