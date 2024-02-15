import React, { createContext, useEffect, useState } from 'react'
import { auth } from './firebase';
import MasjidList from './comp/MasjidList';
import { GoogleAuthProvider, onAuthStateChanged, onIdTokenChanged, signInWithPopup, signOut } from 'firebase/auth';
import { Button } from 'semantic-ui-react';
import MasjidTimes from './comp/MasjidTimes';
export const MyContext = createContext(null)

export default function App() {
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
      <MyContext.Provider value={{ user, setUser }}>
        {user ?
          <Button color='red' onClick={doLogout}>Logout</Button>
          :
          <Button onClick={doLogin}>Login with Google</Button>
        }
        {/* <MasjidList /> */}
        <MasjidTimes />
      </MyContext.Provider>

    </div>
  )
}
