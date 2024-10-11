"use client";
import { useEffect, useRef, useState } from "react";
import { useParams } from "next/navigation";
import styled, { css } from "styled-components";

export default function Page() {
  const { id } = useParams();
  const [inView, setInView] = useState(false);
  const animatedElement = useRef<HTMLDivElement>(null);

  const [scale, setScale] = useState(1);

  // Intersection Observer
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setInView(true);
          } else {
            setInView(false);
          }
        });
      },
      { threshold: 0.5 }
    );

    if (animatedElement.current) {
      observer.observe(animatedElement.current);
    }

    return () => {
      if (animatedElement.current) {
        observer.unobserve(animatedElement.current);
      }
    };
  }, []);

  // 스크롤에 따른 텍스트 크기 변화
  useEffect(() => {
    const handleScroll = () => {
      console.log("scrolling");
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const windowHeight = window.innerHeight;
      const newScale = 1 + scrollTop / (windowHeight * 2);
      setScale(Math.max(0.5, Math.min(2, newScale)));
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <PageContainer>
      <h1>This is Page {id}</h1>
      {id === "1" && (
        <Page1Container>
          <CenteredText scale={scale}>goes bigger</CenteredText>
        </Page1Container>
      )}
      {id === "2" && (
        <Page1Container>
          <AnimatedDiv inView={inView} ref={animatedElement}>
            <p>appears when scrolled down</p>
          </AnimatedDiv>
        </Page1Container>
      )}
      {id === "3" && <p>Content for Page3</p>}
    </PageContainer>
  );
}

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 100vh;
  background-color: #f5f5f5;
  padding: 20px;
  color: black;

  p {
    font-size: 1.2rem;
    margin-top: 20px;
    text-align: center;
  }

  h2 {
    margin-top: 40px;
    font-size: 2rem;
  }
`;

const Page1Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background-color: #f5f5f5;
  padding: 20px;
  color: black;
  height: 200vh;
`;

const AnimatedDiv = styled.div<{ inView: boolean }>`
  opacity: ${({ inView }) => (inView ? 1 : 0)};
  transform: translateY(0);
  transition: opacity 0.6s ease-out, transform 0.6s ease-out;
  ${({ inView }) =>
    inView &&
    css`
      transform: translateY(20px);
    `}
`;

const CenteredText = styled.h2<{ scale: number }>`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%) scale(${({ scale }) => scale});
  /* transition: transform 0.1s ease-out; */
  font-size: 3rem;
  color: black;
  white-space: nowrap;
`;
