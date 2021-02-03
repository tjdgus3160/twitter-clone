import React, { useState } from 'react';
import { dbService } from 'fbase';

const Home = () => {
    const [tweet, setTweet] = useState("");
    const onSubmit = async (event) => {
        event.preventDefault();
        await dbService.collection("tweets").add({
            tweet,
            createdAt: Date.now()
        });
        setTweet("");
    };
    const onChange = (event) => {
        const { target: { value }} = event;
        setTweet(value);
    };
    return (
        <div>
            <input type="text" placeholder="What's on your mind?" value={tweet} onChange={onChange} maxLength={120} />
            <input type="submit" onClick={onSubmit} value="Tweet" />
        </div>
    );
}
export default Home;