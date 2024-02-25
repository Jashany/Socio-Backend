import Post from "../models/post.model.js";
import User from "../models/user.model.js";


export const getfeedPosts = async (req, res) => {
    try {
        const posts = await Post.find();
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const getuserPosts = async (req, res) => {
    try {
        const { userId } = req.params;
        const posts = await Post.find({ userId });
        res.status(200).json(posts);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

export const addpost = async (req, res) => {
    try {
    const {userId ,description , picturePath } = req.body;
    const user = await User.findById(userId);
    const newpost = new Post({
        userId,
        firstName: user.firstName,
        lastName: user.lastName,
        location: user.location,
        description,
        picturePath,
        userPicturePath: user.picturePath,
    })
    await newpost.save();
    const post = await Post.find();
    res.status(201).json(post);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }

}