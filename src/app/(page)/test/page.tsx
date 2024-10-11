"use client";
// rfce
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import Button from "./components/Button";
import axios from "axios";
import { supabase } from "@/app/lib/supabaseClient";

function TestPage() {
  const [isLoading, setIsLoading] = useState(false);
  const testFetch = async () => {
    setIsLoading(true);

    // try {
    //   const { data, error } = await supabase.from("post").select("*");
    //   // .eq("user_id", 1);
    //   console.log(data);
    // } catch (e) {
    //   console.log(e);
    // } finally {
    //   setIsLoading(false);
    // }

    const response = await axios
      .get("https://jsonplaceholder.typicode.com/posts")
      .then((response) => {
        response.data;
        setIsLoading(false);
      })
      .catch((error) => console.error(error));
  };

  useEffect(() => {
    testFetch();
  }, []);

  //react query 로 .then .catch 를 한줄로
  //use server
  //react query - cache
  //server action -> 자동으로 fetching
  //revalidate qurey 특정 라우터내부 하위 페이지 중 해당 서버액션
  //db에서 바로 가져옴(백엔드를 통해서가 아니라) -> rerendering
  //server action을 client component에서 사용가능

  //supabase 연동, 읽기쓰기 다

  return (
    <Container>
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
      <Button />
    </Container>
  );
}

export default TestPage;

const Container = styled.div`
  display: flex;
  /* justify-content: space-evenly; */
  /* align-items: flex-end; */
  width: 500px;
  height: 500px;
  background-color: aliceblue;
  color: blue;
  /* gap: 10px; */
  /* flex-direction: column; */
  flex-wrap: wrap;
`;

//flex - 축을 기준으로 정렬
//justify-content: 기본축 중심으로 정렬
//center ;가운데정렬, space-between, space-around

//flex-start: 맨위, center,
//flex-end

//flex-wrap: 자동 줄바꿈
