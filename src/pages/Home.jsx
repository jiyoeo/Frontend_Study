import { useNavigate } from "react-router-dom";

function Profile() {
  const navigate = useNavigate();

  return (
    <div className="bg-[#ecdff2] min-h-screen py-10 px-4 flex flex-col items-center">
      {/* 상단 프로필 카드 (S_box) */}
      <div className="w-full max-w-2xl bg-white border border-[#ccc] rounded-[12px] p-[24px] shadow-[0_4px_10px_rgba(0,0,0,0.1)]">
        <div className="flex justify-between items-center mt-4">
          <h2 className="text-2xl font-bold text-gray-900 m-0">김지연</h2>
          <span className="cursor-pointer flex items-center gap-1.5 text-[#999999] text-2xl select-none">
            ♥<span className="text-black text-lg"> 0</span>
          </span>
        </div>

        <p className="font-bold text-[#0e17c9] mt-2 mb-1">Frontend</p>
        <p className="text-gray-600 m-0 text-sm">아직은 개발자 연습생</p>
      </div>

      {/* 하단 상세 소개 카드 (D_box) */}
      <div className="w-full max-w-2xl bg-white border border-[#ccc] rounded-[12px] p-[24px] shadow-[0_4px_10px_rgba(0,0,0,0.1)] mt-6 leading-[1.6]">
        <h1 className="text-2xl font-bold text-gray-900 m-0">김지연</h1>
        <p className="font-bold text-[#0e17c9] mt-1 mb-0">Frontend</p>
        <p className="text-gray-500 text-sm mt-0.5 mb-5">INU LIKELION</p>

        <h3 className="text-lg font-bold text-gray-900 mb-1">자기소개</h3>
        <p className="text-gray-700 m-0 mb-6">
          웹 프론트엔드 개발에 관심을 가지고 학습하고 있는 학생입니다. 단순히
          화면을 만드는 것을 넘어서 사용자 경험을 고려하여 직관적인 인터페이스를
          구현하는 개발자가 되고 싶습니다.
        </p>

        <h3 className="text-lg font-bold text-gray-900 mb-2">연락처</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-6">
          <li>Email: jiyoeo2@gmail.com</li>
          <li>
            Website:{" "}
            <a
              href="https://velog.io/@jiyoeo"
              target="_blank"
              rel="noreferrer"
              className="underline text-blue-600 hover:text-blue-800"
            >
              https://velog.io/@jiyoeo/posts
            </a>
          </li>
          <li>Phone: 010-8619-6763</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-900 mb-2">관심 기술</h3>
        <ul className="list-disc pl-5 text-gray-700 space-y-1 mb-6">
          <li>HTML</li>
          <li>CSS</li>
          <li>JavaScript</li>
          <li>React</li>
        </ul>

        <h3 className="text-lg font-bold text-gray-900 mb-1">한 마디</h3>
        <p className="text-gray-700 m-0">
          기초를 탄탄히 다져 꾸준히 성장하는 프론트엔드 개발자가 되겠습니다.
        </p>
      </div>

      <div className="w-full max-w-2xl mt-5 flex justify-start">
        <button
          onClick={() => navigate("/")}
          className="px-4 py-2 bg-white text-gray-800 border border-gray-300 rounded-[8px] shadow-sm hover:bg-gray-50 transition-colors cursor-pointer text-sm font-medium"
        >
          홈으로 돌아가기
        </button>
      </div>
    </div>
  );
}

export default Profile;
