const { PrismaClient } = require("@prisma/client");
const asyncHandler = require("../middlewares/async.middleware");

const prisma = new PrismaClient();

// @desc      Obtiene todas las publicaciones
// @route     GET /api/v1/autores | /api/v1/autores?busqueda=<keyword>
// @access    Public
exports.getPosts = asyncHandler(async (req, res) => {
  const { busqueda } = req.query;
  
  const posts = await prisma.post.findMany({
    where: {
      OR: [
        { title: { contains: busqueda } },
        { content: { contains: busqueda } },
        { resume: {contains: busqueda} }
      ],
    },
    include: { author: true },
  });

  res.status(200).json({ success: true, data: posts });
});

// @desc      Obtiene una publicación por id
// @route     GET /api/v1/autores
// @access    Public
exports.getPost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const post = await prisma.post.findOne({
    where: { id: Number(id) },
    include: { author: true },
  });

  if (!post) {
    return res
      .status(404)
      .json({ success: false, message: "La publicación no fue encontrada." });
  }

  res.status(200).json({ success: true, data: post });
});

// @desc      Crea una publicación
// @route     POST /api/v1/autores?email=<email>&password=<password>
// @access    Private
exports.createPost = asyncHandler(async (req, res) => {
  const { title, content, resume } = req.body;
  const { email, password } = req.query;

  const author = await prisma.author.findMany({
    where: { email: email || "", password: password || "" },
  });

  if (author.length === 0) {
    return res.status(401).json({
      success: false,
      message: "No tienes autorización para realizar la publicación.",
    });
  }

  try {
    const post = await prisma.post.create({
      data: {
        title,
        content,
        resume,
        published: false,
        author: { connect: { id: author[0].id } },
      },
    });
    res.status(200).json({ success: true, data: post });
  } catch (err) {
    res.status(400).json({ success: false, data: 'Los argumentos: title, content y resume son requeridos.' });
  }
});

// @desc      Actualiza una publicación
// @route     PUT /api/v1/autores
// @access    Public
exports.updatePost = asyncHandler(async (req, res) => {
  const { id } = req.params;

  const data = req.body;
  data.published = true;

  prisma.post
    .update({
      where: { id: Number(id) },
      data: { ...data },
    })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: err.meta.details });
    });
});

// @desc      Elimina una publicación
// @route     DELETE /api/v1/autores?email=<email>&password=<password>
// @access    Private
exports.deletePost = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { email, password } = req.query;

  const author = await prisma.author.findMany({
    where: { email: email || "", password: password || "" },
  });

  if (author.length === 0) {
    return res.status(401).json({
      success: false,
      message: "No tienes autorización para eliminar la publicación.",
    });
  }

  prisma.post
    .delete({
      where: { id: Number(id) },
    })
    .then((post) => {
      res.status(200).json(post);
    })
    .catch((err) => {
      res.status(404).json({ success: false, message: err.meta.details });
    });
});
