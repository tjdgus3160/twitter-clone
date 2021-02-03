import { authService } from 'fbase';
import React from 'react';
import { useHistory } from 'react-router-dom';

export default () => {
    const history = useHistory();   // Hook을 사용한 redirection
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    }
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}