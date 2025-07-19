import React from "react";

function ProfilePage() {
  const user = {
    name: "Jayde Smith",
    username: "@jaydesmith",
    bio: "Software engineer, coffee lover, and React Native enthusiast.",
    avatar: "https://i.pravatar.cc/150?img=12", // Example avatar
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
    <div className="max-w-xl mx-auto p-6">
      {/* Profile Header */}
      <div className="flex items-center space-x-4 mb-6">
        <img
          src={user.avatar}
          alt="User Avatar"
          className="w-20 h-20 rounded-full border-2 border-gray-300"
        />
        <div>
          <h2 className="text-2xl font-semibold">{user.name}</h2>
          <p className="text-gray-500">{user.username}</p>
          <p className="text-sm text-gray-700 mt-1">{user.bio}</p>
        </div>
      </div>

      {/* User Posts */}
      <div className="space-y-4">
        <h3 className="text-xl font-semibold mb-2">Posts</h3>
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
