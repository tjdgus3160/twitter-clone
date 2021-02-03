import React, { useEffect, useState } from 'react';
import AppRouter from 'components/Router';
import { authService } from "fbase";

function App() {
  const [init, setInit] = useState(false);
  const [userObj, setUserObj] = useState(null);
  useEffect(() => {
    authService.onAuthStateChanged((user) => {
      if(user){
        // 프로필에서 유저 이름의 변화를 실시간으로 반영하기 위해 객체의 크기를 경량화
        // setUserObj(user);
        setUserObj({
          displayName: user.displayName,
          uid: user.uid,
          updateProfile: (args) => user.updateProfile(args)
        });
      }
      setInit(true);
    });
  }, []);
  const refreshUser = () => {
    const user = authService.currentUser;
    // setUserObj(user);
    setUserObj({
      displayName: user.displayName,
      uid: user.uid,
      updateProfile: (args) => user.updateProfile(args)
    });
  }
  return (
    <>
      {init ? (
        <AppRouter 
          refreshUser={refreshUser}
          isLoggedIn={Boolean(userObj)} 
          userObj={userObj} 
        /> ) : "Initializing..."}
      <footer>&copy; {new Date().getFullYear()} Twitter-clone</footer>
    </>
  );
}

export default App;
