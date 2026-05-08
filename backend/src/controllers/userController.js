const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.getUsers = async (req, res) => {

  try {

    const users = await prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        role: true
      }
    });

    res.json(users);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};