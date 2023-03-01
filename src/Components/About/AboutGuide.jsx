import React from 'react'
import Box from '@mui/material/Box'
import useTheme from '@mui/styles/useTheme'
import CutPlaneIcon from '../../assets/icons/CutPlane.svg'
import ListIcon from '../../assets/icons/List.svg'
import LogoBuildings from '../../assets/Logo_Buildings.svg'
import NotesIcon from '../../assets/icons/Notes.svg'
import OpenIcon from '../../assets/icons/Open.svg'
import ShareIcon from '../../assets/icons/Share.svg'


/**
 * A miniature view of the App to show as a guide in the About dialog.
 *
 * @return {React.ReactComponent}
 */
export default function AboutGuide({setIsDialogDisplayed}) {
  const theme = useTheme()

  /**
   * Close About dialog when a link is clicked
   */
  function onClickLink() {
    setIsDialogDisplayed(false)
  }
  return (
    <Box
      sx={{
        width: '260px',
        height: '160px',
        fontSize: '0.8em',
        borderRadius: '10px',
        margin: '2em 0',
        padding: '.3em 1em .5em .5em',
        color: theme.palette.primary.contrastText,
        backgroundColor: theme.palette.scene.background,
      }}
    >
      <Box
        sx={{
          'float': 'right',
          'margin': '.4em 0em 0em 0em',
          '& svg': {
            width: '13px',
            height: '13px',
            verticalAlign: 'middle',
            lineHeight: '15px',
            fill: theme.palette.primary.contrastText,
          },
          '& div': {
            textAlign: 'right',
            verticalAlign: 'middle',
            whiteSpace: 'nowrap',
            lineHeight: '16px',
            fontSize: '14px',
          },
          '& a': {
            textAlign: 'right',
            verticalAlign: 'middle',
            whiteSpace: 'nowrap',
            lineHeight: '20px',
          },
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
            width: '234px',
          }}
        >
          <a
            href='https://bldrs.ai/share/v/p/index.ifc#c:-111.37,14.94,90.63,-43.48,15.73,-4.34::i:1506392033'
            onClick={onClickLink}
          >
            <OpenIcon/> ← <span style={{textDecoration: 'underline'}}>Open</span>
          </a>
          <a
            href='https://bldrs.ai/share/v/p/index.ifc#c:-111.37,14.94,90.63,-43.48,15.73,-4.34::i:1493510953'
            onClick={onClickLink}
          >
            <span style={{textDecoration: 'underline'}} >Share</span> → <ShareIcon/>
          </a>
        </Box>
        <div>Notes → <NotesIcon/></div>
        <div>
          Properties → <ListIcon/>
        </div>
        <div>Section → <CutPlaneIcon/></div>
        <Box
          sx={{
            position: 'relative',
            bottom: '-3.9em',
            right: '0em',
          }}
        >
          <a
            href='https://bldrs.ai/share/v/p/index.ifc#c:-93.79,4.24,100.38,-43.48,15.73,-4.34::i:1148362525'
            onClick={onClickLink}
          >
            <div style={{textDecoration: 'underline'}}>About</div>
          </a>
        </Box>
      </Box>
      <Box
        sx={{
          'float': 'right',
          'margin': '-2.8em 7.5em 0em 0em',
          '& svg': {
            width: '140px',
            height: '110px',
          },
        }}
      >
        <LogoBuildings/>
      </Box>
    </Box>
  )
}
