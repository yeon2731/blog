"use client";

//https://velog.io/@yeolyi1310/posts 참고

import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

interface Post {
  id: number;
  title: string;
  content: string;
  user_id: number;
}

function TestPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [editMode, setEditMode] = useState<number | null>(null);
  const [editTitle, setEditTitle] = useState("");
  const [editContent, setEditContent] = useState("");

  const read = async () => {
    setIsLoading(true);

    const { data, error } = await supabase.from("post").select("*");

    if (error) {
      console.error("에러", error);
    } else {
      setPosts(data as Post[]);
    }

    setIsLoading(false);
  };

  const deletePost = async (id: number) => {
    const { error } = await supabase.from("post").delete().eq("id", id);

    if (error) {
      console.error("에러", error);
      alert("오류");
    } else {
      alert("삭제완료");
      read();
    }
  };

  const updatePost = async (id: number) => {
    const { error } = await supabase
      .from("post")
      .update({ title: editTitle, content: editContent })
      .eq("id", id);

    if (error) {
      console.error("에러", error);
      alert("오류");
    } else {
      alert("수정완료");
      setEditMode(null);
      read();
    }
  };

  const handleEdit = (post: Post) => {
    setEditMode(post.id);
    setEditTitle(post.title);
    setEditContent(post.content);
  };

  useEffect(() => {
    read();
  }, []);

  return (
    <Container>
      <Header>
        <HeaderText>My Blog</HeaderText>
        <HeadearIcon>
          <IconButton>🔔</IconButton>
          <IconButton>🔍</IconButton>
          <LoginButton>로그인</LoginButton>
        </HeadearIcon>
      </Header>

      <TitleContainer>
        <Circle>사진</Circle>
        <TitleContainerContainer>
          <Title>개발자 아무개</Title>
          <SubTitle>아무튼 해봄</SubTitle>
        </TitleContainerContainer>
      </TitleContainer>

      <FollowContainer>
        <Divider />
        <FollowersInfo>
          <InfoItem>
            <strong>63</strong> 팔로워
          </InfoItem>
          <InfoItem>
            <strong>0</strong> 팔로잉
          </InfoItem>
        </FollowersInfo>
      </FollowContainer>

      <TabsContainer>
        <TabItem active={true}>글</TabItem>
        <TabItem active={false}>시리즈</TabItem>
        <TabItem active={false}>소개</TabItem>
      </TabsContainer>

      {/* <ListContainer>
        <ListItem>
          <span>1</span> 골드가고싶다
        </ListItem>
        <ListItem>
          <span>2</span> 넷플릭스에너지드링크는
        </ListItem>
        <ListItem>
          <span>3</span> gs에서 원쁠원 하는 중이라고 한다
        </ListItem>
        <ListItem>
          <span>4</span> 아무말
        </ListItem>
        <ListItem>
          <span>5</span> 졸리다
        </ListItem>
        <ListItem>
          <span>6</span> 아무말2
        </ListItem>
        <ListItem>
          <span>7</span> 아무말3
        </ListItem>
        <ListItem>
          <span>8</span> 햄버거먹고싶다
        </ListItem>
        <ListItem>
          <span>9</span> 날씨가 시원해져서 좋다
        </ListItem>
      </ListContainer> */}

      <ListContainer>
        {isLoading ? (
          <p>Loading...</p>
        ) : (
          posts.map((post, index) => (
            <ListItem key={post.id}>
              <span>{index + 1}</span>{" "}
              {editMode === post.id ? (
                <>
                  <input
                    type="text"
                    value={editTitle}
                    onChange={(e) => setEditTitle(e.target.value)}
                  />
                  <textarea
                    value={editContent}
                    onChange={(e) => setEditContent(e.target.value)}
                  />
                  <button onClick={() => updatePost(post.id)}>저장</button>
                  <button onClick={() => setEditMode(null)}>취소</button>
                </>
              ) : (
                <>
                  {post.title} - {post.content}
                  <button onClick={() => handleEdit(post)}>수정</button>
                  <button onClick={() => deletePost(post.id)}>삭제</button>
                </>
              )}
            </ListItem>
          ))
        )}
      </ListContainer>
    </Container>
  );
}

export default TestPage;

const EditButton = styled.button`
  background-color: #007bff;
  color: white;
  border: none;
  padding: 8px;
  margin: 4px;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  background-color: #ff4d4d;
  color: white;
  border: none;
  padding: 8px;
  margin: 4px;
  cursor: pointer;
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  margin: 0 auto;
`;

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  padding: 10px 20px;
`;

const HeaderText = styled.div`
  font-size: 18px;
  font-weight: bold;
  margin-left: 10px;
`;

const HeadearIcon = styled.div`
  display: flex;
  align-items: center;
`;

const IconButton = styled.div`
  background: none;
  border: none;
  font-size: 18px;
  margin: 0 10px;
  cursor: pointer;
  color: black;
`;

const LoginButton = styled.div`
  background-color: #333;
  color: white;
  border: none;
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 16px;
  cursor: pointer;
  margin-left: 15px;

  &:hover {
    background-color: #555;
  }
`;

const TitleContainer = styled.div`
  /* display: flex;
    flex-direction: column;
    height: 40vh;
    width: 100%; */
  display: flex;
  align-items: center; /* 세로 중앙 정렬 */
  //justify-content: center; /* 가로 중앙 정렬 */
  height: 30vh;
  width: 100%;

  //얼마나 있나 보려고
  //background-color: #5d7f824c;
`;

const Circle = styled.div`
  width: 150px;
  height: 150px;
  background-color: #5a5858a0; /* 회색 원 */
  border-radius: 50%; /* 원형으로 만들기 */
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  font-size: 24px;
  //font-weight: bold;
  position: relative;
  left: 10%;
`;

const TitleContainerContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-left: 20px;
  position: relative;
  left: 10%;

  //background-color: #5d7f824c;
`;

const Title = styled.div`
  font-size: 24px;
  font-weight: bold;
  position: relative;
`;

const SubTitle = styled.div`
  font-size: 18px;
  margin-top: 10px;
  color: #777;
  position: relative;
  /* top: 50%;
  left: 20%; */
`;

const FollowContainer = styled.div`
  padding: 10px 0;
  display: flex;
  flex-direction: column;
  align-items: flex-end;
  padding: 1% 10%;

  //background-color: #825d7e69;
`;

const Divider = styled.div`
  //회색 선
  width: 100%;
  border: none;
  border-top: 1px solid #e1e1e1;
  margin-bottom: 10px;
`;

const FollowersInfo = styled.div`
  display: flex;
  gap: 20px; // 팔로워와 팔로잉 사이 간격
`;

const InfoItem = styled.div`
  font-size: 14px;
  color: black;

  strong {
    font-weight: bold;
    color: black;
  }
`;

const TabsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  width: 100%;
  padding: 10px 0;
  padding-top: 50px;
`;

const TabItem = styled.div<{ active: boolean }>`
  font-size: 16px;
  font-weight: ${(props) => props.active && "bold"};
  color: ${(props) => (props.active ? "#00c58e" : "#333")};
  padding: 10px;
  position: relative;

  &:after {
    content: "";
    display: ${(props) => (props.active ? "" : "none")};
    position: absolute;
    bottom: 0;
    left: 0;
    width: 100%;
    height: 2px;
    background-color: #00c58e;
  }
`;

const ListContainer = styled.div`
  list-style-type: none;
  padding: 1% 10%;
`;

const ListItem = styled.div`
  padding: 10px;
  border-bottom: 1px solid #e1e1e1;

  span {
    margin-right: 30px;
  }

  &:nth-child(2n + 1) {
    background-color: #f0f0f0; /* 홀수번째 줄은 회색 배경 */
  }
`;
