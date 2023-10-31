import React, {useEffect, useState} from 'react'
import Accordion from '@mui/material/Accordion'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'
import Typography from '@mui/material/Typography'
import CaretIcon from '../assets/icons/Caret.svg'


/**
 * Expansion panels are used to package property sets
 *
 * @property {string} summary content of the panel
 * @property {string} detail title of the panel
 * @property {boolean} expandState global control of the panel
 * @return {React.ReactElement}
 */
export default function ExpansionPanel({summary, detail, expandState}) {
  const [expanded, setExpanded] = useState(expandState)


  useEffect(() => {
    setExpanded(expandState)
  }, [expandState])


  return (
    <Accordion
      elevation={0}
      PaperProps={{variant: 'control'}}
      sx={{
        '& .MuiAccordionSummary-root': {
          width: '100%',
          padding: '0px 10px',
        },
        '& .MuiAccordionSummary-root.Mui-expanded': {
          marginBottom: '0.5em',
        },
        '& .MuiAccordionDetails-root': {
          padding: '0px 10px',
        },
        '& svg': {
          marginRight: '12px',
          marginLeft: '12px',
        },
      }}
      expanded={expanded}
      onChange={() => setExpanded(!expanded)}
    >
      <AccordionSummary
        expandIcon={<CaretIcon className='caretToggle'/>}
        aria-controls="panel1a-content"
        id="panel1a-header"
      >
        <Typography sx={{
          'maxWidth': '320px',
          'whiteSpace': 'nowrap',
          'overflow': 'hidden',
          'textOverflow': 'ellipsis',
          '@media (max-width: 900px)': {
            maxWidth: '320px',
          },
        }}
        >
          {summary}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        {detail}
      </AccordionDetails>
    </Accordion>
  )
}
