import React from "react";

function ProfilePage() {
  const user = {
    name: "John Smith",
    username: "@John Smith",
    bio: "Hi there! I'm a software developer proficient in JavaScript, React, and Node.js.",
    avatar: "https://i.pravatar.cc/150?img=12",
    posts: [
      { id: 1, content: "Just launched my new app! 🚀" },
      {
        id: 2,
        content: "Exploring Tailwind CSS — loving the utility-first approach!",
      },
      {
        id: 3,
        content: "React Native + Expo makes mobile dev so much smoother.",
      },
    ],
  };

  return (
    <div className="max-w-xl mx-auto p-6 bg-[#2A324B] min-h-screen">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-30 h-30 rounded-full border-2 border-gray-300"
        />
        <div className="flex flex-col text-center">
          <h2 className="text-center text-2xl font-semibold text-[#E1E5EE]">{user.name}</h2>
          <p className="text-center text-[#E1E5EE] text-sm">{user.username}</p>
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

      <div className="flex justify-between mb-6">
        <button className="bg-[#F9D9C2] text-[#2A324B] px-12 py-1.5 rounded hover:bg-gray-700 transition cursor-pointer">
          Message
        </button>
        <button className="bg-[#F9D9C2] text-[#2A324B] px-12 py-1.5 rounded hover:bg-gray-700 transition cursor-pointer">
          Follow
        </button>
      </div>

      {/* User Posts */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-2 text-[#E1E5EE]">Posts</h3>
        {user.posts.map((post) => (
          <div
            key={post.id}
            className="bg-white shadow-md rounded-lg p-4 border border-gray-200"
          >
            <p className="text-gray-800">{post.content}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ProfilePage;
