const { PrismaClient } = require('@prisma/client');

const prisma = new PrismaClient();

exports.createTask = async (req, res) => {

  try {

    const {
      title,
      description,
      dueDate,
      assignedTo,
      projectId
    } = req.body;

    const task = await prisma.task.create({
      data: {
        title,
        description,
        dueDate: new Date(dueDate),
        assignedTo,
        projectId
      }
    });

    res.status(201).json(task);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

exports.getTasks = async (req, res) => {

  try {

    const tasks = await prisma.task.findMany({
      include: {
        assignee: true,
        project: true
      }
    });

    res.json(tasks);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

exports.updateTaskStatus = async (req, res) => {

  try {

    const { id } = req.params;

    const { status } = req.body;

    const task = await prisma.task.update({
      where: {
        id: parseInt(id)
      },
      data: {
        status
      }
    });

    res.json(task);

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};

exports.getDashboard = async (req, res) => {

  try {

    const totalTasks = await prisma.task.count();

    const completedTasks = await prisma.task.count({
      where: {
        status: 'DONE'
      }
    });

    const overdueTasks = await prisma.task.count({
      where: {
        dueDate: {
          lt: new Date()
        },
        status: {
          not: 'DONE'
        }
      }
    });

    res.json({
      totalTasks,
      completedTasks,
      overdueTasks
    });

  } catch (error) {

    res.status(500).json({
      error: error.message
    });

  }
};