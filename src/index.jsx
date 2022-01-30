import React from 'react'
import {
  BrowserRouter,
  Outlet,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom'
import { render } from 'react-dom'
import App from './App'
import { ThemeProvider, createTheme } from '@mui/material/styles'

// TODO: This isn't used.
// If icons-material isn't imported somewhere, mui dies
import AccountCircle from '@mui/icons-material/AccountCircle'


const INSTALL_PREFIX = window.location.pathname.startsWith('/Share') ? '/Share' : '';


const theme = createTheme({
  status: {
    danger: 'foo',
  },
});


const Themed = () => (
  <ThemeProvider theme={theme}>
    <Outlet/>
  </ThemeProvider>
)


/**
 * From URL design: https://github.com/buildrs/Share/wiki/URL-Structure
 * ... We adopt a URL structure similar to Google Apps URL structure:
 *
 *   http://host/<app>/<view>/<object>
 *
 * which when fully expanded becomes:
 *
 *   http://host/share/v/p/haus.ifc
 *   http://host/share/v/gh/buildrs/Share/main/public/haus.ifc
 */
function Routed() {
  const location = useLocation(), navigate = useNavigate();

  React.useEffect(() => {
    const referrer = document.referrer;
    if (referrer) {
      const path = new URL(document.referrer).pathname;
      if (path.length > 1) {
        navigate(path);
      }
    }
    if (location.pathname === '/') {
      navigate(INSTALL_PREFIX + '/share');
    }
  }, []);

  return (
    <Routes>
      <Route path={INSTALL_PREFIX} element={<Themed/>}>
        <Route path="share/*" element={
                 <App installPrefix={INSTALL_PREFIX}
                      appPrefix={INSTALL_PREFIX + "/share"} />
               }/>
      </Route>
    </Routes>
  )
}

render(
  <BrowserRouter>
    <Routed/>
  </BrowserRouter>, document.getElementById('root'))
