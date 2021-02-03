import { authService, dbService } from 'fbase';
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';

export default ({ refreshUser, userObj }) => {
    const history = useHistory();   // Hook을 사용한 redirection
    const [newDisplayName, setNewDisplayName] = useState(userObj.displayName);
    const onLogOutClick = () => {
        authService.signOut();
        history.push("/");
    };
    const onChange = (event) => {
        const {target: {value}} = event;
        setNewDisplayName(value);
    };
    /* 
    React는 작은 변화는 잘 감지하지만 객체의 크기가 큰 경우 변화를
    감지하기가 쉽지 않다. 따라서 프로필에서 유저 이름을 실시간으로 변경하기
    위해서는 객체의 크기를 줄여야 한다.
    */ 
    const onSubmit = async (event) => {
        event.preventDefault();
        if(userObj.displayName !== newDisplayName){
            await userObj.updateProfile({
                displayName: newDisplayName
            });
            refreshUser();
        }
    };
    // const getMyTweets = async() => {
    //     // firebase는 NoSQL이여서 쿼리 사용시 쿼리에 대한 복합 인덱스를 생성해주어야한다.
    //     const tweets = await dbService
    //         .collection("tweets")
    //         .where("creatorId", "==", userObj.uid)
    //         .orderBy("createdAt")
    //         .get();
    // };
    // useEffect(() => {
    //     getMyTweets();
    // }, []);
    return (
        <>
            <form onSubmit={onSubmit}>
                <input 
                    onChange={onChange} 
                    type="text" 
                    placeholder="Display name" 
                    value={newDisplayName}
                />
                <input type="submit" value="Update Profile" />
            </form>
            <button onClick={onLogOutClick}>Log Out</button>
        </>
    );
}