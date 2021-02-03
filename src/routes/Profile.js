import { authService, dbService } from 'fbase';
import React, { useEffect } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ userObj }) => {
    const history = useHistory();   // Hook을 사용한 redirection
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const getMyTweets = async() => {
        // firebase는 NoSQL이여서 쿼리 사용시 쿼리에 대한 복합 인덱스를 생성해주어야한다.
        const tweets = await dbService
            .collection("tweets")
            .where("creatorId", "==", userObj.uid)
            .orderBy("createdAt")
            .get();
    };
    useEffect(() => {
        getMyTweets();
    }, []);
    return (
        <>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}