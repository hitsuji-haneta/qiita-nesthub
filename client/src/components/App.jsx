import React, { useState } from 'react';
import styled from 'styled-components';
import config from '../config';

const interactiveCanvas = window.interactiveCanvas;

const Container = styled.div`
  background-color: #55C501;
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  font-size: calc(14px + 2vmin);
  color: white;
`;

const Button = styled.button`
  width: 100px;
  height: 70px;
  border-radius: 20px;
  font-size: 1em;
`;

const fetchTags = async setTags => {
  const uri = `https://qiita.com/api/v2/users/${config.userId}/following_tags`;
  const res = await fetch(uri, {
    headers: {
      Authorization: `Bearer ${config.token}`
    }
  });
  const resJson = await res.json();
  console.log(resJson);
  setTags(resJson);
};

const TagList = ({ tags }) => tags.map(elm => <p>{elm.id}</p>);

const App = () => {
  const [tags, setTags] = useState([]);
  interactiveCanvas.ready({
    onUpdate(data) {
      fetchTags(setTags);
    }
  });
  return (
    <Container>
      <TagList tags={tags} />
      <Button onClick={() => fetchTags(setTags)}>qiita</Button>
    </Container>
  );
}

export default App;
