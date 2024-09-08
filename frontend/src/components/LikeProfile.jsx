import { FaHeart } from "react-icons/fa";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const LikeProfile = ({ userProfile }) => {
  const { authUser } = useAuthContext();

  // Check if the current profile is the user's own profile
  const isOwnProfile = authUser?.username === userProfile.login;

  const handleLikeProfile = async () => {
    if (isOwnProfile) {
      // Show a toast message if the user tries to like their own profile
      toast.error("You cannot like your own profile!");
      return;
    }

    try {
      const res = await fetch(`/api/users/like/${userProfile.login}`, {
        method: "POST",
        credentials: "include",
      });
      const data = await res.json();

      if (data.error) throw new Error(data.error);
      toast.success(data.message); // Show success toast when the profile is liked
    } catch (error) {
      toast.error(error.message); // Show error toast in case of any issues
    }
  };

  // Don't render the like button if the user is not authenticated or if it's their own profile
  if (!authUser || isOwnProfile) return null;

  return (
    <button
      className="p-2 text-xs w-full font-medium rounded-md bg-glass border border-blue-400 flex items-center gap-2"
      onClick={handleLikeProfile}
    >
      <FaHeart size={16} /> Like Profile
    </button>
  );
};

export default LikeProfile;
