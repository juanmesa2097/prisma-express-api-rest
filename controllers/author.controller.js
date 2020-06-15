const { PrismaClient } = require("@prisma/client");

const prisma = new PrismaClient();

exports.getAuthors = async (req, res) => {
  const authors = await prisma.author.findMany({
    include: { posts: true },
  });

  res.status(200).json(authors);
};

exports.getAuthor = async (req, res) => {
  const { id } = req.params;

  const author = await prisma.author.findOne({
    where: { id: Number(id) },
  });

  res.status(200).json(author);
};

exports.createAuthor = async (req, res) => {
  const author = await prisma.author.create({
    data: {
      ...req.body,
    },
  });

  res.status(200).json(author);
};

exports.updateAuthor = async (req, res) => {
  const { id } = req.params;

  const author = await prisma.author.update({
    where: { id: Number(id) },
    data: {
      ...req.body,
    },
  });

  res.status(200).json(author);
};

exports.deleteAuthor = async (req, res) => {
  const { id } = req.params;

  const author = await prisma.author.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json(author);
};
