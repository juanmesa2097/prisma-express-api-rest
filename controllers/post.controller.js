const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("../middlewares/async.middleware");

const prisma = new PrismaClient();

exports.getPosts = asyncHandler(async (req, res) => {
  const posts = await prisma.post.findMany({
    include: { author: true },
  });

  res.status(200).json({ success: true, data: posts });
});

exports.getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findOne({
    where: { id: Number(id) },
    include: { author: true },
  });

  res.status(200).json({ success: true, data: post });
});

exports.createPost = asyncHandler(async (req, res) => {
  console.log(req.body);
  const { title, content, authorId } = req.body;

  const post = await prisma.post.create({
    data: {
      title,
      content,
      published: false,
      author: { connect: { id: authorId } },
    },
  });

  res.status(200).json({ success: true, data: post });
});

exports.updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = req.body;
  data.published = true;

  const post = await prisma.post.update({
    where: { id: Number(id) },
    data: { ...data },
  });

  res.status(200).json(post);
});

exports.deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.delete({
    where: { id: Number(id) },
  });

  res.status(200).json(post);
});
