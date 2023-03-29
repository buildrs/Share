import React, {useEffect, useState} from 'react'
import {useNavigate} from 'react-router-dom'
import Box from '@mui/material/Box'
import MenuItem from '@mui/material/MenuItem'
import Paper from '@mui/material/Paper'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import useTheme from '@mui/styles/useTheme'
import debug from '../utils/debug'
import {getBranches} from '../utils/GitHub'
import useStore from '../store/useStore'
import {navigateBaseOnModelPath} from '../utils/location'
import {handleBeforeUnload} from '../utils/event'


/**
 * @param {boolean} isDialogDisplayed
 * @param {Function} setIsDialogDisplayed
 * @return {object} React component
 */
export default function Branches() {
  const navigate = useNavigate()
  const repository = useStore((state) => state.repository)
  const branches = useStore((state) => state.branches)
  const setBranches = useStore((state) => state.setBranches)
  const [versionPaths, setVersionPaths] = useState([])
  const [selected, setSelected] = useState(0)
  const modelPath = useStore((state) => state.modelPath)
  const accessToken = useStore((state) => state.accessToken)
  const theme = useTheme()


  useEffect(() => {
    if (!repository) {
      debug().warn('IssuesControl#Issues: 1, no repo defined')
      return
    }
    const fetchBranches = async () => {
      try {
        const newBranches = await getBranches(repository, accessToken)
        const versionPathsTemp = []
        if (newBranches.length > 0) {
          setBranches(newBranches)
        }
        newBranches.map((branch, i) => {
          if (branch.name === modelPath.branch) {
            // select the current branch
            setSelected(i)
          }
          const versionPath = navigateBaseOnModelPath(modelPath.org, modelPath.repo, branch.name, modelPath.filepath)
          versionPathsTemp.push(versionPath)
        })
        setVersionPaths(versionPathsTemp)
      } catch (e) {
        debug().warn('failed to fetch branches', e)
      }
    }

    if (branches.length === 0 && modelPath.repo !== undefined) {
      fetchBranches()
    }
  }, [accessToken, repository, branches.length, modelPath.branch, modelPath.filepath, modelPath.org, modelPath.repo, setBranches])


  const handleSelect = (event) => {
    const versionNumber = event.target.value
    setSelected(versionNumber)
    window.removeEventListener('beforeunload', handleBeforeUnload)
    navigate({
      pathname: versionPaths[versionNumber],
    })
  }


  return (
    <Box sx={{width: '100%'}}>
      {branches.length > 1 && modelPath.repo !== undefined &&
        <Paper elevation={0} variant='control'
          sx={{
            marginTop: '14px',
            opacity: .8,
          }}
        >
          <TextField
            sx={{
              'width': '100%',
              '& .MuiOutlinedInput-input': {
                color: theme.palette.primary.contrastText,
                padding: '13px 0px 13px 16px',
              },
              '& .MuiInputLabel-root': {
                color: theme.palette.primary.contrastText,
                opacity: .5,
              },
              '& .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              '&:hover .MuiOutlinedInput-input': {
                color: theme.palette.primary.contrastText,
              },
              // TODO(oleg): connect to props
              '&:hover .MuiInputLabel-root': {
                color: theme.palette.primary.contrastText,
                opacity: 1,
              },
              '&:hover .MuiOutlinedInput-root .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
              // TODO(oleg): connect to props
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-input': {
                color: theme.palette.primary.contrastText,
              },
              // TODO(oleg): connect to props
              '& .MuiInputLabel-root.Mui-focused': {
                color: theme.palette.primary.contrastText,
              },
              '& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline': {
                border: 'none',
              },
            }}
            onChange={(e) => handleSelect(e)}
            variant='outlined'
            label='Project Iterations'
            value={selected}
            select
            role="button"
          >
            {branches.map((branch, i) => {
              return (
                <MenuItem
                  key={i}
                  value={i}
                >
                  <Typography variant='p'>{branch.name}</Typography>
                </MenuItem>
              )
            })
            }
          </TextField>
        </Paper>
      }
    </Box>
  )
}
