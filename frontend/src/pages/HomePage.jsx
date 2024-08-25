import { useState, useEffect, useCallback } from "react";
import toast from "react-hot-toast";

import ProfileInfo from "../components/ProfileInfo";
import Repos from "../components/Repos";
import Search from "../components/Search";
import SortRepos from "../components/SortRepos";
import Spinner from "../components/Spinner";

const HomePage = () => {
  const [userProfile, setUserProfile] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);

  const [sortType, setSortType] = useState("forks");
  const user = true;

  const getUserProfileAndRepos = useCallback(
    async (username = "IT21182914") => {
      setLoading(true);
      try {
        const userRes = await fetch(`http://api.github.com/users/${username}`);
        const userProfile = await userRes.json();
        setUserProfile(userProfile);

        const reposRes = await fetch(userProfile.repos_url);
        const userRepos = await reposRes.json();
        setRepos(userRepos);
        // console.log("userProfile", userProfile);
        // console.log("repos", repos);

        return { userProfile, userRepos };
      } catch (error) {
        toast.error(error.message);
      } finally {
        setLoading(false);
      }
    },
    []
  );

  useEffect(() => {
    getUserProfileAndRepos();
  }, [getUserProfileAndRepos]);

  const onSearch = async (e, username) => {
    e.preventDefault();

    setLoading(true);
    setRepos([]);
    setUserProfile(null);

    const { userProfile, userRepos } = await getUserProfileAndRepos(username);

    // console.log("Repos from onSearch", repos);

    setUserProfile(userProfile);
    setRepos(userRepos);
    setLoading(false);
  };

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      <SortRepos />
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
