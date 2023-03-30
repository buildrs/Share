import React from 'react'
import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'
import Tooltip from '@mui/material/Tooltip'
import useTheme from '@mui/styles/useTheme'
import {useWindowDimensions} from './Hooks'


/**
 * @param {object} modelPath
 * @return {object} React component
 */
export default function FileBreadCrumbs({modelPath}) {
  const theme = useTheme()
  const windowDimensions = useWindowDimensions()
  const spacingBetweenSearchAndOpsGroupPx = 20
  const operationsGroupWidthPx = 60
  const searchAndNavWidthPx = windowDimensions.width - (operationsGroupWidthPx + spacingBetweenSearchAndOpsGroupPx)
  const searchAndNavMaxWidthPx = 300
  return (
    <Box sx={{
      'display': 'flex',
      'flexDirection': 'row',
      'borderRadius': '5px',
      'width': '275px',
      'marginTop': '6px',
      'padding': '6px 0px 16px 14px',
      'background': theme.palette.primary.background,
      'color': theme.palette.primary.contrastText,
      'textOverflow': 'ellipsis',
      'overflow': 'hidden',
      'whiteSpace': 'nowrap',
      'border': 'none',
      'opacity': .8,
      '& a': {
        ...theme.typography.tree,
        color: theme.palette.primary.contrastText,
        opacity: .4,
      },
      '@media (max-width: 900px)': {
        width: `${searchAndNavWidthPx}px`,
        maxWidth: `${searchAndNavMaxWidthPx}px`,
      },
    }}
    component="fieldset"
    >
      <legend>
        <Typography
          sx={{
            fontSize: '11px',
            marginLeft: '-2px',
            opacity: .5}}
        >
          Project model path : org/repo/file
        </Typography>
      </legend>
      <Tooltip title={modelPath.org} placement={'bottom'}>
        <Box>
          <a
            href={`https://github.com/${modelPath.org}`}
            target='_new'
          >
            {modelPath.org} &gt;&nbsp;
          </a>
        </Box>
      </Tooltip>
      <Tooltip title={modelPath.repo} placement={'bottom'}>
        <Box
          sx={{
            maxWidth: '60px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <a
            href={`https://github.com/${modelPath.org}/${modelPath.repo}`}
            target='_new'
          >
            {modelPath.repo}
          </a>
        </Box>
      </Tooltip>
      <Tooltip title={modelPath.filepath} placement={'bottom'}>
        <Box
          sx={{
            maxWidth: '60px',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
            whiteSpace: 'nowrap',
          }}
        >
          <a
            href={`https://github.com/${modelPath.org}/${modelPath.repo}/blob/${modelPath.branch}${modelPath.filepath}`}
            target='_new'
          >
            {modelPath.filepath}
          </a>
        </Box>
      </Tooltip>
    </Box>
  )
}
