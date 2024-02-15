import React, {useState} from 'react'
import TreeView from '@mui/lab/TreeView'
import ToggleButton from '@mui/material/ToggleButton'
import ToggleButtonGroup from '@mui/material/ToggleButtonGroup'
import Tooltip from '@mui/material/Tooltip'
import {styled} from '@mui/material/styles'
import useTheme from '@mui/styles/useTheme'
import useStore from '../../store/useStore'
import {assertDefined} from '../../utils/assert'
import Panel from '../SideDrawer/Panel'
import NavTree from './NavTree'
import {handleNavigation} from './NavTreeControl'
import TypesNavTree from './TypesNavTree'
import AccountTreeIcon from '@mui/icons-material/AccountTree'
import ListIcon from '@mui/icons-material/List'
import NodeClosedIcon from '../../assets/icons/NodeClosed.svg'
import NodeOpenIcon from '../../assets/icons/NodeOpened.svg'


/**
 * @param {object} model
 * @param {Array} selectedElements
 * @param {Array} defaultExpandedElements
 * @param {Array} expandedElements
 * @param {Function} setExpandedElements
 * @param {string} pathPrefix
 * @return {object}
 */
export default function NavTreePanel({
  model,
  defaultExpandedElements,
  defaultExpandedTypes,
  expandedElements,
  setExpandedElements,
  expandedTypes,
  setExpandedTypes,
  selectWithShiftClickEvents,
  pathPrefix,
}) {
  assertDefined(...arguments)
  const elementTypesMap = useStore((state) => state.elementTypesMap)
  const isNavTreeVisible = useStore((state) => state.isNavTreeVisible)
  const rootElement = useStore((state) => state.rootElement)
  const selectedElements = useStore((state) => state.selectedElements)

  const [navigationMode, setNavigationMode] = useState('spatial-tree')
  const theme = useTheme()

  const onTreeViewChanged = (event, value) => {
    if (value !== null) {
      setNavigationMode(value)
    }
  }

  const StyledToggleButtonGroup = styled(ToggleButtonGroup)(() => ({
    '& .MuiToggleButtonGroup-grouped': {
      'margin': '0 0.5em',
      'border': 0,
      'borderRadius': 0,
      '&.Mui-disabled': {
        border: 0,
      },
    },
  }))

  const isNavTree = navigationMode === 'spatial-tree'

  return (
    <Panel
      onCloseClick={() => handleNavigation(isNavTreeVisible)}
      title='Navigation'
      action={
        <StyledToggleButtonGroup
          exclusive
          id={'togglegrp'}
          value={navigationMode}
          size='small'
          onChange={onTreeViewChanged}
        >
          <ToggleButton value='spatial-tree' aria-label='spatial-tree'>
            <Tooltip
              title={'Spatial Structure'}
              describeChild
              placement={'bottom-end'}
              PopperProps={{style: {zIndex: 0}}}
            >
              <AccountTreeIcon/>
            </Tooltip>
          </ToggleButton>
          <ToggleButton value='element-types' aria-label='element-types'>
            <Tooltip
              title={'Element Types'}
              describeChild
              placement={'bottom-end'}
              PopperProps={{style: {zIndex: 0}}}
            >
              <ListIcon/>
            </Tooltip>
          </ToggleButton>
        </StyledToggleButtonGroup>
      }
    >
      <TreeView
        aria-label={isNavTree ? 'IFC Navigator' : 'IFC Types Navigator'}
        defaultCollapseIcon={<NodeOpenIcon className='icon-share icon-nav-caret'/>}
        defaultExpandIcon={<NodeClosedIcon className='icon-share icon-nav-caret'/>}
        defaultExpanded={isNavTree ? defaultExpandedElements : defaultExpandedTypes}
        expanded={isNavTree ? expandedElements : expandedTypes}
        selected={selectedElements}
        onNodeToggle={(event, nodeIds) => {
          if (isNavTree) {
            setExpandedElements(nodeIds)
          } else {
            setExpandedTypes(nodeIds)
          }
        }}
        key='tree'
        sx={{
          'padding': '7px 0 14px 0',
          'maxWidth': '400px',
          'overflowY': 'auto',
          'overflowX': 'hidden',
          'flexGrow': 1,
          'backgroundColor': theme.palette.secondary.main,
          '&:focus svg': {
            visibility: 'visible !important',
          },
        }}
      >
        {isNavTree ? (
          <NavTree
            model={model}
            element={rootElement}
            pathPrefix={pathPrefix}
            selectWithShiftClickEvents={selectWithShiftClickEvents}
          />
        ) : (
          <TypesNavTree
            model={model}
            types={elementTypesMap}
            pathPrefix={pathPrefix}
            selectWithShiftClickEvents={selectWithShiftClickEvents}
          />
        )}
      </TreeView>
    </Panel>
  )
}
