import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function ProfilePage() {
  const user = {
    name: "John Smith",
    username: "@johnsmith",
    bio: "Hi there! I'm a software devloper proficient in JavaScript, React, and Node.js.",
    avatar: "https://i.pravatar.cc/150?img=12",
    posts: [
      {
        id: 1,
        image: "/magic_nav.png",
      },
      {
        id: 2,
        image: "/social.png",
      },
    ],
    savedPosts: [
      { id: 101, image: "/images/coding-editor.png" },
      { id: 102, image: "/images/supply-chain.png" },
    ],
  };

  const [activeTab, setActiveTab] = useState("posts");

  const postsToShow = activeTab === "posts" ? user.posts : user.savedPosts;

  const navigate = useNavigate();

  return (
    <div className="bg-[#2A324B] text-white p-6 flex flex-col items-center">
      <div className="w-full max-w-md flex flex-col h-full">
        {/* Top Static Section */}
        <div className="pb-6">
          <button
            className="absolute text-white text-base rounded hover:bg-gray-700 transition cursor-pointer"
            onClick={() => navigate("/")}
            aria-label="Back"
          >
            ←
          </button>

          {/* Profile Header */}
          <div className="flex items-center space-x-4 mb-6">
            <img
              src={user.avatar}
              alt="User Avatar"
              className="w-30 h-30 rounded-full border-2 border-gray-300"
            />
            <div className="flex flex-col text-center">
              <h2 className="text-center text-2xl font-semibold text-[#E1E5EE]">
                {user.name}
              </h2>
              <p className="text-center text-[#E1E5EE] text-sm">
                {user.username}
              </p>
              <div className="flex space-x-6 mt-2">
                <div className="text-center">
                  <p className="text-lg font-semibold text-[#E1E5EE]">150</p>
                  <p className="text-sm text-gray-300">Followers</p>
                </div>
                <div className="text-center">
                  <p className="text-lg font-semibold text-[#E1E5EE]">200</p>
                  <p className="text-sm text-gray-300">Following</p>
                </div>
              </div>
            </div>
          </div>

          {/* Bio Section */}
          <div className="mb-6">
            <p className="text-[#E1E5EE] text-sm">{user.bio}</p>
          </div>

          {/* Message & Follow Buttons */}
          <div className="w-full flex justify-center mb-6 gap-4">
            <button className="flex-1 bg-[#F9D9C2] text-[#2A324B] px-5 py-1.5 rounded hover:bg-gray-700 hover:text-gray-300 transition cursor-pointer">
              Message
            </button>
            <button className="flex-1 bg-[#F9D9C2] text-[#2A324B] px-5 py-1.5 rounded hover:bg-gray-700 hover:text-gray-300 transition cursor-pointer">
              Follow
            </button>
          </div>

          {/* Toggle Buttons */}
          <div className="-mx-6 flex gap-3 w-[calc(100%+3rem)]">
            <button
              onClick={() => setActiveTab("posts")}
              className={`flex-1 py-3 text-sm font-semibold ${
                activeTab === "posts"
                  ? "bg-[#c7ccdb] text-black transition cursor-pointer"
                  : "bg-gray-700 text-gray-300 transition cursor-pointer"
              }`}
            >
              Posts
            </button>
            <button
              onClick={() => setActiveTab("saved")}
              className={`flex-1 py-3 text-sm font-semibold ${
                activeTab === "saved"
                  ? "bg-[#c7ccdb] text-black transition cursor-pointer"
                  : "bg-gray-700 text-gray-300 transition cursor-pointer"
              }`}
            >
              Saved
            </button>
          </div>
        </div>

        {/* Scrollable Posts Section */}
        {postsToShow.length === 0 ? (
          <p className="text-gray-400">No posts to display.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {postsToShow.map((post) => (
              <div
                key={post.id}
                onClick={() => navigate("/profile-feed")}
                className="h-64 bg-white shadow-md rounded-lg border border-gray-200 text-black overflow-hidden cursor-pointer hover:shadow-lg transition-shadow"
              >
                <img
                  src={post.image}
                  alt="Post image"
                  className="w-full h-full object-cover hover:scale-105 transition-transform"
                />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
