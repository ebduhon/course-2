import React from 'react';
import ReactDOM from 'react-dom';
import { App } from "./App";
import { handleModifyAnswerVotes } from '../shared/utility';

let state = undefined;

fetch("https://5d64763bd3284b1e814c86503fafd866.vfs.cloud9.us-east-1.amazonaws.com/data")
    .then(data => data.json())
    .then(json => {
        state = json;
        console.log("state updated.");
        render();
    });

// ReactDOM.render(<App/>, document.querySelector("#Container"));
function handleVote(answerId, increment) {
    state.answers = handleModifyAnswerVotes(state.answers, answerId, increment);
    
    fetch(`https://5d64763bd3284b1e814c86503fafd866.vfs.cloud9.us-east-1.amazonaws.com/vote/${answerId}?increment=${increment}`);
    
    render();
}


function render() {
    ReactDOM.hydrate(<App {...state} handleModifyAnswerVotes={handleVote}/>, document.querySelector("#Container"));
}

render();