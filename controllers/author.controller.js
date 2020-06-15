const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("../middlewares/async.middleware");

const prisma = new PrismaClient();

// @desc      Obtiene todos los autores
// @route     GET /api/v1/autores
// @access    Public
exports.getAuthors = asyncHandler(async (req, res) => {
  const authors = await prisma.author.findMany({
    include: { posts: true },
  });

  res.status(200).json({ success: true, data: authors });
});

// @desc      Obtiene un autor por id
// @route     GET /api/v1/autores/:id
// @access    Public
exports.getAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const author = await prisma.author.findOne({
    where: { id: Number(id) },
  });

  if (!author) {
    return res
      .status(404)
      .json({ success: false, message: "El autor no fue encontrado." });
  }

  res.status(200).json({ success: true, data: author });
});

// @desc      Crea un autor
// @route     POST /api/v1/autores
// @access    Public
exports.createAuthor = asyncHandler(async (req, res) => {
  const author = await prisma.author.create({
    data: {
      ...req.body,
    },
  });

  res.status(200).json({ success: true, data: author });
});

// @desc      Actualiza un autor
// @route     PUT /api/v1/autores
// @access    Public
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

// @desc      Elimina un autor
// @route     DELETE /api/v1/autores
// @access    Public
exports.deleteAuthor = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const author = await prisma.author.delete({
    where: {
      id: Number(id),
    },
  });

  res.status(200).json(author);
});
