const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createProject = async (req, res) => {

  try {

    if (req.user.role !== 'ADMIN') {

      return res.status(403).json({
        message: 'Only admin can create projects'
      });

    }

    const { name, description } = req.body;

    if (!name || !description) {

      return res.status(400).json({
        message: 'All fields are required'
      });

    }

    const project = await prisma.project.create({
      data: {
        name,
        description,
        createdBy: req.user.id
      }
    });

    res.status(201).json(project);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

exports.getProjects = async (req, res) => {

  try {

    const projects = await prisma.project.findMany({
      include: {
        tasks: true,
        creator: true
      }
    });

    res.json(projects);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};