import React, { useState } from 'react';
import styled from 'styled-components';
import config from '../config';
import TagCard from './TagCard';

const interactiveCanvas = window.interactiveCanvas;

const Container = styled.div`
  background-color: #55c501;
  min-height: 100vh;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
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

const fetchArticles = async (tagId, setArticle, setTags) => {
  const uri = `https://qiita.com//api/v2/tags/${tagId}/items?page=1&per_page=5`;
  const res = await fetch(uri, {
    mode: "cors",
    headers: {
      Authorization: `Bearer ${config.token}`
    }
  });
  console.log(res);
  const resJson = await res.json();
  console.log(resJson);
  setTags([]);
  setArticle(resJson);
};

const clickTag = tagId => {
  console.log(tagId);
  // interactiveCanvas.sendTextQuery(`${tagId}の記事を取得`);
  const setArticle = input => console.log(input);
  const setTags = input => console.log(input);
  fetchArticles(tagId, setArticle, setTags);
};
const TagList = ({ tags }) =>
  tags.map((elm, idx) => (
    <TagCard
      tagId={elm.id}
      number={idx + 1}
      itemsCount={elm.items_count}
      iconUrl={elm.icon_url}
      onClick={clickTag}
    />
  ));

const TagButton = ({ tags, setTags }) => {
  if (tags && tags.length > 0) return <></>;
  return <Button onClick={() => fetchTags(setTags)}>タグ</Button>;
};

const ArticleList = ({ article }) => {
  if (!article) return <></>;
  return <p>{article}</p>;
};

const App = () => {
  const [tags, setTags] = useState([]);
  const [article, setArticle] = useState();
  interactiveCanvas.ready({
    onUpdate(data) {
      if (data.type === 'tagList') fetchTags(setTags);
      if (data.type === 'articles')
        fetchArticles(data.tagId, setArticle, setTags);
    }
  });
  return (
    <Container>
      <TagList tags={tags} />
      <ArticleList article={article} />
      <TagButton tags={tags} setTags={setTags} />
    </Container>
  );
};

export default App;
