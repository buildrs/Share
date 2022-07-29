import React from 'react'
import Dialog, {OpenDialogHeaderContent, OpenDialogBodyContent} from '../../Components/Dialog_redesign'


export default {
  title: 'BLDRS UI/Dialogs/Open_Dialog',
  component: Dialog,
  argTypes: {
    icon: {
      options: ['add', 'back', 'check', 'forward', 'help'],
      control: {
        type: 'select',
      },
      defaultValue: 'help',
    },
  },
}

const Template = (args) => {
  return <Dialog
    headerContent={<OpenDialogHeaderContent/>}
    bodyContent={<OpenDialogBodyContent/>}
    headerText={'Open file'}
    isDialogDisplayed={ true }
    setIsDialogDisplayed={() => {}}
  />
}

export const OpenDialog = Template.bind({})
