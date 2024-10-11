"use client";

//https://velog.io/@yeolyi1310/posts 참고

//import React from "react";
import styled from "styled-components";
import React, { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

function NewPost() {
  const [isLoading, setIsLoading] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [userId, setUserId] = useState(1);

  const create = async () => {
    setIsLoading(true);
    const { data, error } = await supabase.from("post").insert({
      title: title,
      content: content,
      user_id: 1,
    });

    if (error) {
      console.error("Error uploading post:", error);
      alert("에러");
    } else {
      console.log("Post uploaded:", data);
      alert("업로드 완료");

      setTitle("");
      setContent("");
    }

    setIsLoading(false);
  };

  return (
    <ComposerContainer>
      <Header>새 포스트 작성하기</Header>
      <InputField
        placeholder="제목"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <TextField
        placeholder="내용"
        value={content}
        onChange={(e) => setContent(e.target.value)}
      />
      <Footer>
        <Iconlist>
          <Icon>🔗</Icon>
          <Icon>T</Icon>
          <Icon>☰</Icon>
          <Icon>⋯</Icon>
        </Iconlist>
        <SendButton onClick={create} disabled={isLoading}>
          {isLoading ? "업로드 중..." : "업로드"}
        </SendButton>
      </Footer>
    </ComposerContainer>
  );
}

export default NewPost;

const ComposerContainer = styled.div`
  width: 100%;
  border: 1px solid grey;
  border-radius: 10px;
  padding: 20px;
  display: flex;
  flex-direction: column;
`;

const Header = styled.div`
  padding-bottom: 10px;
  font-size: 18px;
  font-weight: bold;
`;

const InputField = styled.input`
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #e1e1e1;
  font-size: 16px;
  outline: none;
  width: 100%;
`;

const TextField = styled.textarea`
  margin-top: 10px;
  padding: 10px;
  border: none;
  border-bottom: 1px solid #e1e1e1;
  font-size: 16px;
  height: 200px;
  outline: none;
  resize: none;
  width: 100%;
`;

const Footer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-top: 10px;
`;

const SendButton = styled.button`
  background-color: #1a73e8;
  color: white;
  border: none;
  border-radius: 5px;
  padding: 10px 20px;
  font-size: 14px;

  &:hover {
    background-color: #155dbb;
  }
  &:disabled {
    background-color: gray;
    cursor: not-allowed;
  }
`;

const Iconlist = styled.div`
  display: flex;
  align-items: center;
`;

const Icon = styled.div`
  margin-right: 20px;
  /* border: 100px, 0; */
  /* border-right: 200px; */
  font-size: 20px;
  cursor: pointer;
`;
