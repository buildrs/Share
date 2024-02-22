/**
 * Data stored in Zustand for UI state.
 *
 * @param {Function} set
 * @param {Function} get
 * @return {object} Zustand slice.
 */
export default function createUISlice(set, get) {
  return {
    alertMessage: null,
    setAlertMessage: (msg) => set(() => ({snackMessage: msg})),

    snackMessage: null,
    setSnackMessage: (msg) => set(() => ({snackMessage: msg})),

    // TODO(pablo): move all of these to feature slice files
    // NOTE: Nav, Notes, Search and Versions have been moved to their Slices
    isAboutVisible: false,
    setIsAboutVisible: (isVisible) => set(() => ({isAboutVisible: isVisible})),

    isHelpVisible: false,
    setIsHelpVisible: (isVisible) => set(() => ({isHelpVisible: isVisible})),

    isHelpTooltipsVisible: false,
    setIsHelpTooltipsVisible: (isVisible) => set(() => ({isHelpTooltipsVisible: isVisible})),

    isImagineVisible: false,
    setIsImagineVisible: (isVisible) => set(() => ({isImagineVisible: isVisible})),

    isOpenModelVisible: false,
    setIsOpenModelVisible: (isVisible) => set(() => ({isOpenModelVisible: isVisible})),

    isShareVisible: false,
    setIsShareVisible: (isVisible) => set(() => ({isShareVisible: isVisible})),

    cutPlanes: [],
    levelInstance: null,
    viewer: null,
    addCutPlaneDirection: ({direction, offset}) => set((state) => {
      if (state.cutPlanes.findIndex((cutPlane) => cutPlane.direction === direction) === -1) {
        state.cutPlanes.push({direction, offset})
      }
      return state.cutPlanes
    }),
    removeCutPlaneDirection: (direction) => set((state) => {
      const filterPlanes = state.cutPlanes.filter((cutPlane) => cutPlane.direction !== direction)
      return {cutPlanes: filterPlanes}
    }),
    setCutPlaneDirections: (directions) => set(() => ({cutPlanes: directions})),
    setLevelInstance: (planeHeightBottom) => set(() => ({levelInstance: planeHeightBottom})),
    setViewer: (newViewer) => set(() => ({viewer: newViewer})),
  }
}
