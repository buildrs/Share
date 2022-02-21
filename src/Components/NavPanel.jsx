import React, {useEffect} from 'react'
import {useLocation} from 'react-router-dom'
import Paper from '@mui/material/Paper'
import TreeView from '@mui/lab/TreeView'
import IconButton from '@mui/material/IconButton'
import {makeStyles} from '@mui/styles'
import NavTree from './NavTree'
import {assertDefined} from '../utils/assert'
import NodeClosed from '../assets/2D/NodeClosed.svg'
import NodeOpen from '../assets/2D/NodeOpened.svg'
import Tree from '../assets/2D/Tree.svg'

/** Navigation panel control is a button that toggles the visibility of nav panel
 * @param {Number} topOffset global offset defined in the cad view
 * @param {function} onClickMenuCb callback passed from cad view
 * @return {Object} The button react component
 */
export function NavPanelControl({topOffset, onClickMenuCb}) {
  const classes = useStyles({topOffset: topOffset})
  return (
    <div className={classes.toggleButton}>
      <IconButton onClick={() => {
        onClickMenuCb()
      }}
      >
        <Tree className = {classes.treeIcon}/>
      </IconButton>

    </div>
  )
}

/** Navigation panel contains hierarchical tree of IFC elements
 * @param {Object} viewer
 * @param {Object} element
 * @param {Array} selectedElements
 * @param {Array} defaultExpandedElements
 * @param {Array} expandedElements
 * @param {function} onElementSelect
 * @param {function} setExpandedElements
 * @param {string} pathPrefix
 * @return {Object}
 */
export default function NavPanel({
  viewer,
  element,
  selectedElements,
  defaultExpandedElements,
  expandedElements,
  onElementSelect,
  setExpandedElements,
  pathPrefix,
}) {
  assertDefined(...arguments)

  const location = useLocation()

  useEffect(() => {
    if (location.pathname.length <= 0) {
      return
    }
    const parts = location.pathname.split(/\//)
    if (parts.length > 0) {
      const targetId = parseInt(parts[parts.length - 1])
      if (isFinite(targetId)) {
        onElementSelect({expressID: targetId})
        setExpandedElements(parts)
      }
    }
  // eslint-disable-next-line
  }, [location])

  const classes = useStyles()
  // TODO(pablo): the defaultExpanded array can contain bogus IDs with
  // no error.  Not sure of a better way to pre-open the first few
  // nodes besides hardcoding.
  return (
    <Paper className={classes.contextualMenu}>
      <div className={classes.treeContainer}>
        <TreeView
          aria-label='IFC Navigator'
          defaultCollapseIcon={<NodeOpen className = {classes.icon} />}
          defaultExpandIcon={<NodeClosed className = {classes.icon} />}
          sx={{flexGrow: 1, maxWidth: 400, overflowY: 'auto'}}
          defaultExpanded={defaultExpandedElements}
          expanded={expandedElements}
          selected={selectedElements}
          onNodeToggle={(event, nodeIds) => {
            setExpandedElements(nodeIds)
          }}
          key='tree'
        >
          {
            <NavTree
              viewer={viewer}
              element={element}
              pathPrefix={pathPrefix}
              onElementSelect={onElementSelect}
              setExpandedElements={setExpandedElements}
            />
          }
        </TreeView>
      </div>
    </Paper>
  )
}


const useStyles = makeStyles({
  contextualMenu: {
    'position': 'absolute',
    'top': '80px',
    'left': '23px',
    'overflow': 'auto',
    'width': '308px',
    'justifyContent': 'space-around',
    'alignItems': 'center',
    'maxHeight': '50%',
    '@media (max-width: 900px)': {
      'maxHeight': '30%',
      'width': '250px',
      'top': '80px',
    },
  },
  treeContainer: {
    paddingTop: '14px',
    paddingBottom: '14px',
    overflow: 'scroll',
  },
  paper: {
    display: 'flex',
    overflow: 'auto',
    flexDirection: 'column',
    width: '220px',
    backgroundColor: 'lightGray',
  },
  treeIcon: {
    width: 30,
    height: 30,
  },
  icon: {
    width: 12,
    height: 12,
  },
  toggleButton: {
    'position': 'absolute',
    'top': (props) =>`${props.topOffset}px`,
    'left': '30px',
    '@media (max-width: 900px)': {
      right: '10px',
    },
  },
})
