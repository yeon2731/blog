"use client"; // 클라이언트 컴포넌트로 지정

import { FC } from "react";
import Link from "next/link"; // Link 컴포넌트 추가

interface BlogPageProps {
  params: { id: string }; // URL에서 가져올 id의 타입 정의
}

const BlogPage: FC<BlogPageProps> = ({ params }) => {
  const { id } = params; // URL에서 id 값을 가져옴

  // 예시 데이터 (id에 따라 다른 내용을 표시)
  const blogContents: Record<string, { title: string; content: string }> = {
    "1": {
      title: "Welcome to My Blog - Page 1",
      content: "This is the content of page 1.",
    },
    "2": {
      title: "Mimpsa - Page 2",
      content: "This is the content of page 2.",
    },
    // 다른 페이지들도 여기에 추가 가능
  };

  const blogContent = blogContents[id] || {
    title: "Not Found",
    content: "Sorry, this page does not exist.",
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <nav style={{ marginBottom: "20px" }}>
        <Link href="/page/1">
          <button style={{ marginRight: "10px" }}>Page 1</button>
        </Link>
        <Link href="/page/2">
          <button style={{ marginRight: "10px" }}>Page 2</button>
        </Link>
      </nav>
      <h1>{blogContent.title}</h1>
      <p>{blogContent.content}</p>
    </div>
  );
};

export default BlogPage;

// // src/app/page/[id]/page.tsx
// import { FC } from "react";

// // src/app/page/[id]/page.tsx

// interface BlogPageProps {
//   params: { id: string }; // URL에서 가져올 id의 타입 정의
// }

// const BlogPage = ({ params }: BlogPageProps) => {
//   const { id } = params; // URL에서 id 값을 가져옴

//   // 예시 데이터 (id에 따라 다른 내용을 표시)
//   const blogContents: Record<string, { title: string; content: string }> = {
//     "1": {
//       title: "Welcome to My Blog - Page 1",
//       content: "This is the content of page 1.",
//     },
//     "2": {
//       title: "Fuck U - Page 2",
//       content: "This is the content of page 2.",
//     },
//     // 다른 페이지들도 여기에 추가 가능
//   };

//   const blogContent = blogContents[id] || {
//     title: "Not Found",
//     content: "Sorry, this page does not exist.",
//   };

//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
//       <h1>{blogContent.title}</h1>
//       <p>{blogContent.content}</p>
//     </div>
//   );
// };

// export default BlogPage;
