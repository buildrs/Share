/* eslint-disable no-magic-numbers */
import React, {useState} from 'react'
import {styled} from '@mui/material/styles'
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'


const CustomTabs = styled(Tabs)(({theme}) => ({
  'borderBottom': `1px solid ${theme.palette.primary.main}`,
  '& .MuiTabs-indicator': {
    backgroundColor: theme.palette.secondary.main,
  },
}))


const CustomTab = styled((props) => <Tab disableRipple {...props}/>)(({theme}) => ({
  'textTransform': 'none',
  'minWidth': 0,
  [theme.breakpoints.up('sm')]: {
    minWidth: 0,
  },
  'fontSize': '1em',
  'fontWeight': theme.typography.fontWeight,
  'marginRight': theme.spacing(0),
  'color': theme.palette.primary.contrastText,
  'fontFamily': theme.typography.fontFamily,
  '&:hover': {
    color: theme.palette.secondary.main,
  },
  '&.Mui-selected': {
    color: theme.palette.secondary.main,
    fontWeight: theme.typography.fontWeight,
  },
  '&.Mui-focusVisible': {
    backgroundColor: 'green',
  },
  '@media (max-width: 700px)': {
    fontSize: '.7em',
  },
}))


/**
 * Styled Tabs component.
 *
 * @property {Array<string>} tabs array of tabs
 * @return {React.Component}
 */
export default function BldrsTabs({tabNames, actionCb}) {
  const [value, setValue] = useState(0)

  const handleChange = (event, newValue) => {
    setValue(newValue)
    actionCb(newValue)
  }
  return (
    <Box sx={{width: '100%'}}>
      <CustomTabs value={value} onChange={handleChange} centered variant="fullWidth">
        {tabNames.map((tabName) => {
          return (
            <CustomTab key={tabName} label={tabName}/>
          )
        })}
      </CustomTabs>
    </Box>
  )
}
