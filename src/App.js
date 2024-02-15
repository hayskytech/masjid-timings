import React, { createContext, useEffect, useState } from 'react'
import { auth } from './firebase';
import MasjidList from './comp/MasjidList';
import { GoogleAuthProvider, onAuthStateChanged, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
import { Button } from 'semantic-ui-react';
import MasjidTimes from './comp/MasjidTimes';
export const MyContext = createContext(null)

export default function App() {
  let urlParams = new URLSearchParams(window.location.search);
  let paramsObject = {};
  for (let pair of urlParams.entries()) {
    paramsObject[pair[0]] = pair[1];
  }

  if (Object.keys(paramsObject).length === 0) {
    paramsObject = { page: 'Home' }
  }
  const [params, setParams] = useState(paramsObject)

  useEffect(() => {
    for (const param in params) {
      if (params.hasOwnProperty(param)) {
        urlParams.set(param, params[param]);
      }
    }
    if (params.page === 'Home') {
      urlParams.delete('key');
      // for (const key of urlParams.keys()) {
      //   if (key !== 'page') {
      //     urlParams.delete(key);
      //   }
      // }
    }
    const updatedUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
    window.history.replaceState({}, '', updatedUrl);
  }, [params.page])

  const [user, setUser] = useState(null)

  const provider = new GoogleAuthProvider();
  useEffect(() => {
    const unsubscribeAuthState = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });
    const unsubscribeIdToken = onIdTokenChanged(auth, (user) => {
      setUser(user);
    });
    return () => {
      unsubscribeAuthState();
      unsubscribeIdToken();
    };
  }, [auth])

  function doLogin() {
    signInWithPopup(auth, provider)
      .then((result) => {
        const user = result.user;
        setUser(user)
      }).catch((error) => {
        console.log(error.message);
      });
  }

  function doLogout() {
    signOut(auth).then(() => {
      setUser(null)
    }).catch((error) => {
      console.log(error.message);
    });

  }
  return (
    <div>
      <MyContext.Provider value={{ user, setUser, params, setParams }}>
        {user ?
          <Button color='red' onClick={doLogout}>Logout</Button>
          :
          <Button onClick={doLogin}>Login with Google</Button>
        }
        <Button onClick={() => setParams({ page: 'Home' })}>Home</Button>
        {params.page === 'Home' && <MasjidList />}
        {params.page === 'Masjid' && <MasjidTimes />}
      </MyContext.Provider>

    </div>
  )
}
