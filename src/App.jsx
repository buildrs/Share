import React from 'react'
import {
  Outlet,
  Routes,
  Route,
  useLocation,
  useNavigate
} from 'react-router-dom'
import CadView from './Containers/CadView'
import 'normalize.css'


function Forward({appPrefix}) {
  const location = useLocation(), navigate = useNavigate();
  console.log('Forward: location: ', location);
  React.useEffect(() => {
    console.log('App.jsx: Base: should forward?: ', location);
    if (location.pathname == appPrefix) {
      const dest = appPrefix + '/v/p';
      console.log('App.jsx: Base: forwarding to: ', dest);
      navigate(dest);
    }
  }, []);

  return (<Outlet/>)
}


/**
 * For URL design see: https://github.com/buildrs/Share/wiki/URL-Structure
 *
 * Examples for this component:
 *   http://host/share/v/p/haus.ifc
 *   http://host/share/v/gh/IFCjs/test-ifc-files/main/Others/479l7.ifc
 */
export default function App({installPrefix, appPrefix}) {
  return (
    <Routes>
      <Route path="/" element={<Forward appPrefix={appPrefix}/>}>
        <Route path="v/p/*"
               element={
                 <CadView
                   installPrefix={installPrefix}
                   appPrefix={appPrefix}
                   pathPrefix={appPrefix + '/v/p'} />
               } />
        <Route path="v/gh/:org/:repo/:branch/*"
               element={
                 <CadView
                   installPrefix={installPrefix}
                   appPrefix={appPrefix}
                   pathPrefix={appPrefix + '/v/p'} />
               } />
      </Route>
    </Routes>);
}
