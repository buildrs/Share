import React, {
  createContext,
  useMemo,
  useEffect,
  useState,
} from 'react'
import {useNavigate, useParams} from 'react-router-dom'
import {ThemeProvider, createTheme} from '@mui/material/styles'
import CadView from './Containers/CadView'
import debug from './utils/debug'
import 'normalize.css'

// TODO: This isn't used.
// If icons-material isn't imported somewhere, mui dies
/* eslint-disable */
import AccountCircle from '@mui/icons-material/AccountCircle'
/* eslint-enable */


/**
 * Handles path demuxing to pass to CadView.
 * @param {string} installPrefix e.g. '' on bldrs.ai or /Share on GitHub pages.
 * @param {string} appPrefix e.g. /share is the prefix for this component.
 * @param {string} pathPrefix e.g. v/p for CadView, currently the only child.
 * @return {Object} The Share react component.
 */
export default function Share({installPrefix, appPrefix, pathPrefix}) {
  const navigate = useNavigate()
  const urlParams = useParams()
  const [modelPath, setModelPath] = useState(null)
  const [mode, setMode] = useState('light')


  /**
   * On a change to urlParams, setting a new model path will clear the
   * scene and load the new model IFC.  If there's not a valid IFC,
   * the helper will redirect to the index file.
   *
   * Otherwise, the param change is a sub-path, e.g. the IFC element
   * path, so no other useEffect is triggered.
   */
  useEffect(() => {
    onChangeUrlParams()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [urlParams])


  /** A demux to help forward to the index file, load a new model or do nothing. */
  function onChangeUrlParams() {
    const mp = getModelPath(installPrefix, pathPrefix, urlParams)
    if (mp === null) {
      // TODO: probe for index.ifc
      navigate(appPrefix + '/v/p/index.ifc#c:-80,10,100')
      return
    }
    if (modelPath === null ||
        modelPath.filepath && modelPath.filepath != mp.filepath ||
        modelPath.gitpath && modelPath.gitpath != mp.gitpath) {
      setModelPath(mp)
      debug().log('Share#onChangeUrlParams: new model path: ', mp)
    }
  }


  const colorMode = useMemo(
      () => ({
        toggleColorMode: () => {
          setMode((prevMode) => (prevMode === 'light' ? 'dark' : 'light'))
        },
      }), [])


  const theme = useMemo(() => {
    return createTheme({
      palette: {
        mode,
        primary: {
          main: '#C8C8C8',
          light: '#e3f2fd',
          dark: '#42a5f5',
        },
        background: {
          paper: mode === 'light' ? '#FFFFFF' : '#252525',
        },
        tonalOffset: 1,
      },
      shape: {
        borderRadius: 10,
      },
    })
  }, [mode])


  return (
    modelPath && <ColorModeContext.Provider value={colorMode}>
      <ThemeProvider theme={theme}>
        <CadView
          installPrefix={installPrefix}
          appPrefix={appPrefix}
          pathPrefix={pathPrefix}
          modelPath={modelPath}
        />
      </ThemeProvider>
    </ColorModeContext.Provider>
  )
}


/**
 * Returns a reference to an IFC model file.  For use by IfcViewerAPI.load.
 *
 * Format is either a reference within this project's serving directory:
 *   {filepath: '/file.ifc'}
 *
 * or a global GitHub path:
 *   {gitpath: 'http://host/share/v/gh/buildrs/Share/main/haus.ifc'}
 *
 * @param {string} installPrefix e.g. /share
 * @param {string} pathPrefix e.g. /share/v/p
 * @param {Object} urlParams e.g. .../:org/:repo/:branch/*
 * @return {Object}
 */
function getModelPath(installPrefix, pathPrefix, urlParams) {
  // TODO: combine modelPath methods into class.
  let m = null
  let filepath = urlParams['*']
  if (filepath == '') {
    return null
  }
  const parts = filepath.split('.ifc')
  filepath = '/' + parts[0] + '.ifc' // TODO(pablo)
  if (pathPrefix.endsWith('new') || pathPrefix.endsWith('/p')) {
    // * param is defined in ../Share.jsx, e.g.:
    //   /v/p/*.  It should be only the filename.
    // Filepath is a reference rooted in the serving directory.
    // e.g. /haus.ifc or /ifc-files/haus.ifc
    m = {
      filepath: filepath,
      eltPath: parts[1],
    }
    debug().log('Share#getModelPath: is a project file: ', m, window.location.hash)
  } else if (pathPrefix.endsWith('/gh')) {
    m = {
      org: urlParams['org'],
      repo: urlParams['repo'],
      branch: urlParams['branch'],
      filepath: filepath,
      eltPath: parts[1],
    }
    m.getRepoPath = () => `/${m.org}/${m.repo}/${m.branch}${m.filepath}`
    m.gitpath = `https://raw.githubusercontent.com${m.getRepoPath()}`
    debug().log('Share#getModelPath: is a remote GitHub file: ', m)
  } else {
    throw new Error('Empty view type from pathPrefix')
  }
  return m
}


export const ColorModeContext = createContext({toggleColorMode: () => {}})
