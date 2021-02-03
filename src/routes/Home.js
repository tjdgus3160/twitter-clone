import React, { useState } from 'react';

const Home = () => {
    const [tweet, setTweet] = useState("");
    const onSubmit = (event) => {
        event.preventDefault();
    };
    const onChange = (event) => {
        const { target: { value }} = event;
        setTweet(value);
    };
    return (
        <div>
            <input type="text" placeholder="What's on your mind?" value={tweet} onChange={onChange} maxLength={120} />
            <input type="submit" value="Tweet" />
        </div>
    );
}
export default Home;