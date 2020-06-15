const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("../middlewares/async.middleware");

const prisma = new PrismaClient();

exports.getAuthors = asyncHandler(async (req, res) => {
  const authors = await prisma.author.findMany({
    include: { posts: true },
  });

  res.status(200).json({ success: true, data: authors });
});

exports.getAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const author = await prisma.author.findOne({
    where: { id: Number(id) },
  });

  res.status(200).json({ success: true, data: author });
});

exports.createAuthor = asyncHandler(async (req, res) => {
  const author = await prisma.author.create({
    data: {
      ...req.body,
    },
  });

  res.status(200).json({ success: true, data: author });
});

exports.updateAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const author = await prisma.author.update({
    where: { id: Number(id) },
    data: {
      ...req.body,
    },
  });

  res.status(200).json(author);
});

exports.deleteAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const author = await prisma.author.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json(author);
});
