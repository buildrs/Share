import React from 'react'
import {act, render, renderHook, fireEvent} from '@testing-library/react'
import useStore from '../../store/useStore'
import NotesNavBar from './NotesNavBar'


describe('NotesNavBar', () => {
  beforeEach(async () => {
    const {result} = renderHook(() => useStore((state) => state))
    await act(() => {
      result.current.setNotes(null)
    })
  })


  it('changes to back nav when issue selected', async () => {
    const {result} = renderHook(() => useStore((state) => state))
    const {getByTitle} = render(<NotesNavBar/>)
    const testNoteId = 10
    await act(() => {
      result.current.setSelectedNoteId(testNoteId)
    })
    expect(await getByTitle('Back to the list')).toBeInTheDocument()
  })


  it('Navigate notes', async () => {
    const {result} = renderHook(() => useStore((state) => state))
    const {getByTitle} = render(<NotesNavBar/>)
    const notes = [
      {id: 1, index: 0},
      {id: 2, index: 1},
      {id: 3, index: 2},
    ]
    await act(() => {
      result.current.setNotes(notes)
      // eslint-disable-next-line no-magic-numbers
      result.current.setSelectedNoteId(2)
    })
    expect(getByTitle('Back to the list')).toBeInTheDocument()
    const nextButton = getByTitle('Next Note')
    expect(nextButton).toBeInTheDocument()
    fireEvent.click(nextButton)
    expect(getByTitle('Next Note')).toBeInTheDocument()
  })


  it('Navigate to create note', async () => {
    const {result} = renderHook(() => useStore((state) => state))
    const {getByTitle} = render(<NotesNavBar/>)
    await act(() => {
      result.current.setSelectedNoteId(null)
    })
    const addNote = getByTitle('ADD A NOTE')
    expect(addNote).toBeInTheDocument()
    fireEvent.click(addNote)
    expect(getByTitle('Back to the list')).toBeInTheDocument()
  })
})
