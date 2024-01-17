import * as React from 'react';
import ReportProblemIcon from '@mui/icons-material/ReportProblem';
import InfoIcon from '@mui/icons-material/Info';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import DoneIcon from '@mui/icons-material/Done';
import Chip from '@mui/material/Chip';
import { styled } from '@mui/material/styles';

const StyledChip = styled(Chip)(({ theme }) => ({
  justifyContent: 'left',
  '& .icon': {
    color: 'inherit',
  },
  '&.Open': {
    color: (theme.vars || theme).palette.info.dark,
    border: `1px solid ${(theme.vars || theme).palette.info.main}`,
  },
  '&.Filled': {
    color: (theme.vars || theme).palette.success.dark,
    border: `1px solid ${(theme.vars || theme).palette.success.main}`,
  },
  '&.PartiallyFilled': {
    color: (theme.vars || theme).palette.warning.dark,
    border: `1px solid ${(theme.vars || theme).palette.warning.main}`,
  },
  '&.Rejected': {
    color: (theme.vars || theme).palette.error.dark,
    border: `1px solid ${(theme.vars || theme).palette.error.main}`,
  },
}));

const StatusProps= {
  'status':''
}

const Status = React.memo((StatusProps) => {
  console.log(StatusProps)
  //const { status } = StatusProps;
  const status = StatusProps.status.value;
 
  let icon= null;
  let clasStyle=null;
  if (status === 'inactivo') {
    icon = <ReportProblemIcon className="icon" />;
    clasStyle='Rejected'
  } else if (status === 'Open') {
    icon = <InfoIcon className="icon" />;
  } else if (status === 'PartiallyFilled') {
    icon = <AutorenewIcon className="icon" />;
  } else if (status === 'activo') {
    icon = <DoneIcon className="icon" />;
    clasStyle='Filled'
  }

  let label = status;
  if (status === 'PartiallyFilled') {
    label = 'Partially Filled';
  }

  return (
    <StyledChip  className={clasStyle} icon={icon} size="small" label={label} variant="outlined" />
    //<StyledChip label="Hols" variant="outlined"  />
  );
});

export function RenderStatus(value) {
  if (value == null) {
    return '';
  }

  return <Status status={value} />;
}