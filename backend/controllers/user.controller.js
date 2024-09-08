import User from "../models/user.model.js";

export const getUserProfileandRepos = async (req, res) => {
  const { username } = req.params;
  try {
    // 60 requests per hour, 5000 requests per hour for authenticated requests
    // https://docs.github.com/en/rest/using-the-rest-api/rate-limits-for-the-rest-api?apiVersion=2022-11-28

    const userRes = await fetch(`https://api.github.com/users/${username}`, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });

    const userProfile = await userRes.json();

    const repoRes = await fetch(userProfile.repos_url, {
      headers: {
        authorization: `token ${process.env.GITHUB_API_KEY}`,
      },
    });
    const repos = await repoRes.json();

    res.status(200).json({ userProfile, repos });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

export const likeProfile = async (req, res) => {
  try {
    const { username } = req.params;
    const authUser = await User.findById(req.user._id.toString()); // The logged-in user
    console.log(authUser, "Authenticated user");

    // Check if the user to like exists in the local database
    let userToLike = await User.findOne({ username });

    // If the user is not found in the local database, fetch from GitHub and add to the database
    if (!userToLike) {
      console.log("User not found in local database, fetching from GitHub...");

      const userRes = await fetch(`https://api.github.com/users/${username}`);
      if (!userRes.ok) {
        return res.status(404).json({ error: "User not found on GitHub" });
      }

      const gitHubUser = await userRes.json();

      // Create a new user in the local database with the GitHub user details
      userToLike = new User({
        username: gitHubUser.login,
        profileUrl: gitHubUser.html_url,
        avatarUrl: gitHubUser.avatar_url,
        createdAt: Date.now(), // Record the current timestamp
      });

      await userToLike.save(); // Save the new user to the database
      console.log("User successfully saved to the local database.");
    }

    // Check if the authenticated user already liked the profile
    if (authUser.likedProfiles.includes(userToLike.username)) {
      return res.status(400).json({ error: "You already liked this user." });
    }

    // Add the authenticated user's like to the profile
    userToLike.likedBy.push({
      username: authUser.username,
      avatarUrl: authUser.avatarUrl,
      likedDate: Date.now(),
    });

    authUser.likedProfiles.push(userToLike.username);

    // Save the changes to both users
    await Promise.all([userToLike.save(), authUser.save()]);

    return res.status(200).json({ message: "User liked successfully!" });
  } catch (error) {
    console.error(error.message);
    return res.status(500).json({ error: error.message });
  }
};

export const getLikes = async (req, res) => {
  try {
    const user = await User.findById(req.user._id.toString());
    res.status(200).json({ likedBy: user.likedBy });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
