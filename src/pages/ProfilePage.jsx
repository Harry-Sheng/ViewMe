import React, { useState } from "react";

function ProfilePage() {
  const user = {
    name: "Jayde Lal",
    username: "@jaydelal",
    bio: "Description & Tech Stack: ",
    avatar: "https://i.pravatar.cc/150?img=12",
    posts: [
      {
        id: 1,
        content: "Just launched my new app! 🚀",
        image: "https://source.unsplash.com/random/400x200?tech",
      },
      {
        id: 2,
        content: "Exploring Tailwind CSS — loving the utility-first approach!",
        image: "https://source.unsplash.com/random/400x200?code",
      },
      {
        id: 3,
        content: "React Native + Expo makes mobile dev so much smoother.",
        image: "https://source.unsplash.com/random/400x200?mobile",
      },
    ],
    savedPosts: [
      { id: 101, content: "Saved post example #1" },
      { id: 102, content: "Saved post example #2" },
    ],
  };

  const [activeTab, setActiveTab] = useState("posts");

  const postsToShow = activeTab === "posts" ? user.posts : user.savedPosts;

  return (
    <div className="bg-[#2A324B] min-h-screen p-6 flex flex-col items-center text-white h-screen">
      {/* Sticky top section */}
      <div className="w-full max-w-md sticky top-0 bg-[#2A324B] z-20 pb-6">
        {/* Profile Header */}
        <div className="flex items-center space-x-4 mb-4">
          <img
            src={user.avatar}
            alt="User Avatar"
            className="w-20 h-20 rounded-full border-2 border-gray-300"
          />
          <div>
            <h2 className="text-2xl font-semibold">{user.name}</h2>
            <p className="text-gray-400">{user.username}</p>
            <p className="text-sm text-gray-300 mt-1">{user.bio}</p>
          </div>
        </div>

        {/* Toggle Buttons */}
        <div className="-mx-6 flex gap-3 w-[calc(100%+3rem)]">
          <button
            onClick={() => setActiveTab("posts")}
            className={`flex-1 py-3 text-sm font-semibold ${
              activeTab === "posts"
                ? "bg-[#c7ccdb] text-black"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Posts
          </button>
          <button
            onClick={() => setActiveTab("saved")}
            className={`flex-1 py-3 text-sm font-semibold ${
              activeTab === "saved"
                ? "bg-[#c7ccdb] text-black"
                : "bg-gray-700 text-gray-300"
            }`}
          >
            Saved
          </button>
        </div>
      </div>

      {/* Scrollable posts list */}
      <div className="w-full max-w-md flex-1 overflow-y-auto scrollbar-hide">
        {postsToShow.length === 0 ? (
          <p className="text-gray-400">No posts to display.</p>
        ) : (
          <div className="grid grid-cols-2 gap-4">
            {postsToShow.map((post) => (
              <div
                key={post.id}
                className="bg-white shadow-md rounded-lg border border-gray-200 text-black overflow-hidden"
              >
                <img
                  src={post.image}
                  alt="Post image"
                  className="w-full h-40 object-cover"
                />
                <div className="p-4">
                  <p>{post.content}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ProfilePage;
