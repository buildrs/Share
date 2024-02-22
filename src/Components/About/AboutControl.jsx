import React from 'react'
import * as FirstTime from '../../privacy/firstTime'
import useStore from '../../store/useStore'
import {ControlButtonWithHashState} from '../Buttons'
import {LogoB} from '../Logo/Logo'
import AboutDialog from './AboutDialog'
import PkgJson from '../../../package.json'


/**
 * Button to toggle About panel on and off
 *
 * @return {React.ReactElement}
 */
export default function AboutControl() {
  const isAboutVisible = useStore((state) => state.isAboutVisible)
  const setIsAboutVisible = useStore((state) => state.setIsAboutVisible)

  return (
    <ControlButtonWithHashState
      title={`Bldrs: ${PkgJson.version}`}
      icon={<LogoB/>}
      isDialogDisplayed={isAboutVisible}
      setIsDialogDisplayed={setIsAboutVisible}
      hashPrefix={ABOUT_PREFIX}
      placement='right'
    >
      <AboutDialog
        isDialogDisplayed={isAboutVisible}
        setIsDialogDisplayed={setIsAboutVisible}
        onClose={() => {
          setIsAboutVisible(false)
          FirstTime.setVisited()
        }}
      />
    </ControlButtonWithHashState>
  )
}


const ABOUT_PREFIX = 'about'
