import React, { useContext } from "react";
import { Box, Paper } from "@mui/material";
import TreeView from "@mui/lab/TreeView";
import NavTree from "./NavTree";
import NodeClosed from "../assets/2D_Icons/NodeClosed.svg";
import NodeOpen from "../assets/2D_Icons/NodeOpened.svg";
import useStore from "../store/useStore";
import { assertDefined } from "../utils/assert";
import { ColorModeContext } from "../Context/ColorMode";

/**
 * @param {object} model
 * @param {object} element
 * @param {Array} selectedElements
 * @param {Array} defaultExpandedElements
 * @param {Array} expandedElements
 * @param {Function} setExpandedElements
 * @param {string} pathPrefix
 * @return {object}
 */
export default function NavPanel({
  model,
  element,
  defaultExpandedElements,
  expandedElements,
  setExpandedElements,
  pathPrefix,
}) {
  assertDefined(...arguments);
  const theme = useContext(ColorModeContext);
  const selectedElements = useStore((state) => state.selectedElements);

  // TODO(pablo): the defaultExpanded array can contain bogus IDs with
  // no error.  Not sure of a better way to pre-open the first few
  // nodes besides hardcoding.
  return (
    <Paper
      sx={{
        backgroundColor: theme.isDay() ? "#E8E8E8" : "#4C4C4C",
        marginTop: "14px",
        overflow: "auto",
        width: "300px",
        opacity: 0.8,
        justifyContent: "space-around",
        alignItems: "center",
        maxHeight: "100%",
        "@media (max-width: 900px)": {
          maxHeight: "150px",
          width: "300px",
          top: "86px",
        },
      }}
      elevation={0}
    >
      <Box
        sx={{
          paddingTop: "14px",
          paddingBottom: "14px",
          overflow: "auto",
        }}
      >
        <TreeView
          aria-label="IFC Navigator"
          defaultCollapseIcon={
            <Box
              sx={{ width: "0.8em", height: "0.8em" }}
              component={NodeOpen}
            />
          }
          defaultExpandIcon={
            <Box
              sx={{
                width: "0.8em",
                height: "0.8em",
              }}
              component={NodeClosed}
            />
          }
          sx={{
            flexGrow: 1,
            maxWidth: 400,
            overflowY: "auto",
            overflowX: "hidden",
          }}
          defaultExpanded={defaultExpandedElements}
          expanded={expandedElements}
          selected={selectedElements}
          onNodeToggle={(event, nodeIds) => {
            setExpandedElements(nodeIds);
          }}
          key="tree"
        >
          {<NavTree model={model} element={element} pathPrefix={pathPrefix} />}
        </TreeView>
      </Box>
    </Paper>
  );
}
