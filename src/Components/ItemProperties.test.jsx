import React from 'react'
import {render, screen, waitFor} from '@testing-library/react'
import ItemProperties from './ItemProperties'
import testObj from './ItemProperties.testobj.json'
import {disableDebug} from '../utils/debug'
import {MockViewer, newMockStringValueElt} from '../utils/IfcMock.test'
import {mockRoutes} from '../BaseRoutesMock.test'


disableDebug()


test('ItemProperties for single element', async () => {
  const testLabel = 'Test node label'
  const {getByText} = render(mockRoutes(
      <ItemProperties
        viewer={new MockViewer}
        element={newMockStringValueElt(testLabel)} />,
  ))
  await waitFor(() => screen.getByText(testLabel))
  expect(getByText(testLabel)).toBeInTheDocument()
})


test('ItemProperties for single element', async () => {
  const testLabel = 'Test node label'
  const {getByText} = render(mockRoutes(
      <ItemProperties
        viewer={new MockViewer}
        element={newMockStringValueElt(testLabel)} />,
  ))
  await waitFor(() => screen.getByText(testLabel))
  expect(getByText(testLabel)).toBeInTheDocument()
})

// TODO(pablo):
/*
test('ItemProperties for single element', async () => {
  const testLabel = 'Test node label'
  const {getByText} = render(mockRoutes(
      <ItemProperties
        viewer={new MockViewer}
        element={testObj} />,
  ))
  await waitFor(() => screen.getByText(testLabel))
  expect(getByText(testLabel)).toBeInTheDocument()
})
*/
