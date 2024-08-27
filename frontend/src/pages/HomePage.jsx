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
        const userRes = await fetch(
          `http://api.github.com/users/${username}`
          // {
          //   headers: {
          //     authorization: `token ${process.env.REACT_APP_GITHUB_TOKEN}`,
          //   },
          // }
        );
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

  const onSort = (sortType) => {
    if (sortType === "recent") {
      repos.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)); //descending, most recent first
    } else if (sortType === "stars") {
      repos.sort((a, b) => b.stargazers_count - a.stargazers_count); //descending, most stars first
    } else if (sortType === "forks") {
      repos.sort((a, b) => b.forks_count - a.forks_count); //descending, most forks first
    }
    setSortType(sortType);
    setRepos([...repos]);
  };

  return (
    <div className="m-4">
      <Search onSearch={onSearch} />
      {repos.length > 0 && <SortRepos onSort={onSort} sortType={sortType} />}
      <div className="flex gap-4 flex-col lg:flex-row justify-center items-start">
        {userProfile && !loading && <ProfileInfo userProfile={userProfile} />}
        {!loading && <Repos repos={repos} />}
        {loading && <Spinner />}
      </div>
    </div>
  );
};

export default HomePage;
