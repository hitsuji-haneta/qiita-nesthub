import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  background-color: white;
  height: 120px;
  width: 220px;
  display: flex;
  flex-direction: row;
  margin: 20px 20px;
`;
const TextWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
`;
const MainText = styled.p`
  font-size: 1em;
  margin: 0;
  color: black;
  text-align: center;
`;
const SubText = styled.p`
  font-size: 0.7em;
  margin-right: 10px;
  color: black;
  text-align: center;
`;
const Image = styled.img`
  width: 40px;
  height: 40px;
`;

const TagCard = ({ tagId, number, itemsCount, iconUrl, onClick }) => (
  <Container onClick={() => onClick(tagId)}>
    <Image src={iconUrl}/>
    <TextWrapper>
      <SubText>No. {number}</SubText>
      <MainText>{tagId}</MainText>
      <SubText>{itemsCount} items</SubText>
    </TextWrapper>
  </Container>
);

export default TagCard;