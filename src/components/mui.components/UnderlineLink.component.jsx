/* eslint-disable jsx-a11y/anchor-is-valid */
import Link_MUI from '@mui/material/Link';
import { Link } from 'react-router-dom';

// underline options: none, hover, always

export default function UnderlineLink({ label, underline, linkTo }) {
  console.log(underline);

  return (
    <Link 
      to={linkTo}
      style={{textDecoration: 'none'}}
    >
      <Link_MUI underline={underline}>
        {label}
      </Link_MUI>
    </Link>
  );
}