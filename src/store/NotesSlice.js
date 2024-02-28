/**
 * Data stored in Zustand for Notes state.
 *
 * @param {Function} set
 * @param {Function} get
 * @return {object} Zustand slice.
 */
export default function createNotesSlice(set, get) {
  return {
    notes: null,
    isLoadingNotes: false,
    isCreateNoteActive: false,
    createdNotes: null,
    deletedNotes: null,
    synchSidebar: true, // To render again, not related to flag
    comments: null,
    selectedNoteId: null,
    selectedNoteIndex: null,
    placeMark: null,
    placeMarkId: null,
    placeMarkMode: false,
    setNotes: (notes) => set(() => ({notes: notes})),
    toggleSynchSidebar: () => set((state) => ({synchSidebar: !state.synchSidebar})),
    toggleIsLoadingNotes: () => set((state) => ({isLoadingNotes: !state.isLoadingNotes})),
    toggleIsCreateNoteActive: () => set((state) => ({isCreateNoteActive: !state.isCreateNoteActive})),
    setCreatedNotes: (createdNotes) => set(() => ({createdNotes: createdNotes})),
    setDeletedNotes: (deletedNotes) => set(() => ({deletedNotes: deletedNotes})),
    setComments: (comments) => set(() => ({comments: comments})),
    setSelectedNoteId: (noteId) => set(() => ({selectedNoteId: noteId})),
    setSelectedNoteIndex: (noteIndex) => set(() => ({selectedNoteIndex: noteIndex})),
    setPlaceMark: (newPlaceMark) => set(() => ({placeMark: newPlaceMark})),
    setPlaceMarkId: (newPlaceMarkId) => set(() => ({placeMarkId: newPlaceMarkId})),
    setPlaceMarkMode: (newplaceMarkMode) => set(() => ({placeMarkMode: newplaceMarkMode})),
  }
}
