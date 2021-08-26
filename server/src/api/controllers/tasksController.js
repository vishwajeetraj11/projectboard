import { catchAsync } from '../../utils/catchAsync.js';
import { Task } from '../../models/Task.js';
import { AppError } from '../../utils/AppError.js';
import { User } from '../../models/User.js';
import { Member } from '../../models/Member.js';
import { Project } from '../../models/Project.js';
import { History } from '../../models/History.js';

export const getAllTasks = catchAsync(async (req, res, next) => {
  const { projectId } = req.params;
  const tasks = await Task.find({
    project: projectId,
  }).sort('order');
  await Member.populate(tasks, {
    path: 'assignee author',
  });
  await User.populate(tasks, {
    path: 'author.user assignee.user',
  });
  return res.status(200).json({ status: 'success', tasks });
});

export const getTaskById = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const task = await Task.findById(id).populate({
    path: 'author project assignee',
    Model: [User, Project, Member],
  });
  await User.populate(task, {
    path: 'assignee.user',
  });
  if (!task) {
    return next(
      new AppError("The Task you are looking for doesn't exist.", 404)
    );
  }
  return res.status(200).json({ status: 'success', task });
});

export const createTask = catchAsync(async (req, res) => {
  const { projectId } = req.params;

  const tasksWithSameStatus = await Task.find({
    status: req.body.status,
    project: projectId,
  });
  const newTask = await Task.create({
    ...req.body,
    author: req.user.memberId,
    project: projectId,
    order: tasksWithSameStatus.length,
  });

  const history = await History.create({
    task: newTask._id,
    project: projectId,
    user: req.user.userId,
    action: 'create',
    extraDetails: {
      taskTitle: newTask.title,
    },
  });
  await User.populate(history, 'user extraDetails.user');
  return res.status(200).json({
    status: 'success',
    task: newTask,
    history,
  });
});

export const updateTask = catchAsync(async (req, res, next) => {
  const { projectId, id } = req.params;
  const {
    title,
    description,
    status,
    priority,
    label,
    startDate,
    dueDate,
    assignee,
  } = req.body;
  const history = {};

  // if (status) {
  //   return next(
  //     new AppError('You cannot update status through this route.', 403)
  //   );
  // }
  const taskToUpdate = await Task.findById(id);
  if (!taskToUpdate) {
    return next(
      new AppError("The Task you are trying to update doesn't exist.", 404)
    );
  }
  const updatedTask = await Task.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });
  if (title) {
    history.title = await History.create({
      task: updatedTask._id,
      project: projectId,
      user: req.user.userId,
      action: 'update',
      extraDetails: {
        updatedField: 'title',
        updatedValue: updatedTask.title,
      },
    });
    await User.populate(history, 'user');
  }

  if (description) {
    history.description = await History.create({
      task: updatedTask._id,
      project: projectId,
      user: req.user.userId,
      action: 'update',
      extraDetails: {
        updatedField: 'description',
        updatedValue: updatedTask.description,
      },
    });
    await User.populate(history, 'user');
  }

  if (priority) {
    history.priority = await History.create({
      task: updatedTask._id,
      project: projectId,
      user: req.user.userId,
      action: 'update',
      extraDetails: {
        updatedField: 'priority',
        updatedValue: updatedTask.priority,
      },
    });
    await User.populate(history, 'user');
  }

  if (startDate) {
    history.startDate = await History.create({
      task: updatedTask._id,
      project: projectId,
      user: req.user.userId,
      action: 'update',
      extraDetails: {
        updatedField: 'startDate',
        updatedValue: updatedTask.startDate,
      },
    });
    await User.populate(history, 'user');
  }

  if (dueDate) {
    history.dueDate = await History.create({
      task: updatedTask._id,
      project: projectId,
      user: req.user.userId,
      action: 'update',
      extraDetails: {
        updatedField: 'dueDate',
        updatedValue: updatedTask.dueDate,
      },
    });
    await User.populate(history, 'user');
  }

  if (label) {
    history.label = await History.create({
      task: updatedTask._id,
      project: projectId,
      user: req.user.userId,
      action: 'update',
      extraDetails: {
        updatedField: 'label',
        updatedValue: updatedTask.label,
      },
    });
    await User.populate(history, 'user');
  }

  if (assignee) {
    await Member.populate(updatedTask, 'assignee');
    history.assignee = await History.create({
      task: updatedTask._id,
      project: projectId,
      user: req.user.userId,
      action: 'assign',
      extraDetails: {
        user: updatedTask.assignee.user,
      },
    });
    await User.populate(history, 'user extraDetails.user');
  }

  if (status) {
    const destinationLength = await Task.countDocuments({
      status: updatedTask.status,
      project: projectId,
    });
    updatedTask.order = !destinationLength ? 0 : destinationLength - 1;
    await updatedTask.save();

    await Task.updateMany(
      {
        status: taskToUpdate.status,
        project: projectId,
        order: {
          $gt: taskToUpdate.order,
        },
      },
      {
        $inc: { order: -1 },
      }
    );

    const destinationTasks = await Task.find({
      status: updatedTask.status,
      project: projectId,
    });
    const sourceTasks = await Task.find({
      status: taskToUpdate.status,
      project: projectId,
    });
    history.status = await History.create({
      task: updatedTask._id,
      project: projectId,
      user: req.user.userId,
      action: 'update',
      extraDetails: {
        updatedField: 'status',
        updatedValue: updatedTask.status,
      },
    });
    await User.populate(history, 'user');
    res.status(200).json({
      status: 'success',
      updatedTask,
      sourceTasks,
      destinationTasks,
      sourceStatus: taskToUpdate.status,
      destinationStatus: updatedTask.status,
      history,
    });
    return;
  }

  res.status(200).json({
    status: 'success',
    updatedTask,
    history,
  });
});

export const deleteTask = catchAsync(async (req, res, next) => {
  const { projectId, id } = req.params;

  const taskToDelete = await Task.findById(id);
  if (!taskToDelete) {
    return next(
      new AppError("The Task you are trying to delete doesn't exist.", 404)
    );
  }
  // db.collection.updateMany(filter, update, options)
  await Task.updateMany(
    {
      status: taskToDelete.status,
      project: taskToDelete.project,
      order: {
        $gt: taskToDelete.order,
      },
    },
    {
      $inc: { order: -1 },
    },
    {
      new: true,
      runValidators: true,
    }
  );

  // const sourceTasks = await Task.find({
  //   status: taskToDelete.status,
  //   project: projectId,
  // });

  const history = await History.create({
    task: taskToDelete._id,
    project: projectId,
    user: req.user.userId,
    action: 'delete',
    extraDetails: {
      taskTitle: taskToDelete.title,
    },
  });

  await User.populate(history, 'user extraDetails.user');

  await taskToDelete.remove();

  res.status(204).json({
    status: 'success',
    message: 'Task removed successfully',
    // sourceStatus: taskToDelete.status,
    // sourceTasks,
  });
});

// Board Drag n Drop
export const updateTaskStatusInBoard = catchAsync(async (req, res, next) => {
  const { id, projectId } = req.params;
  const { destinationStatus, sourceStatus, sourceIndex, destinationIndex } =
    req.body;

  const task = await Task.findById(id);
  if (!task) {
    return next(new AppError('Task not found.', 404));
  }
  // const srcStatusTasks = await Task.updateMany(
  await Task.updateMany(
    {
      status: sourceStatus,
      project: projectId,
      order: {
        $gt: task.order,
      },
    },
    {
      $inc: { order: -1 },
    }
  );

  // const destStatusTasks = await Task.updateMany(
  await Task.updateMany(
    {
      status: destinationStatus,
      project: projectId,
      order: {
        $gte: destinationIndex,
      },
    },
    {
      $inc: { order: 1 },
    }
  );

  task.status = destinationStatus;
  task.order = destinationIndex;
  await task.save();

  const sourceTasks = await Task.find({
    project: projectId,
    status: sourceStatus,
  });

  const destinationTasks = await Task.find({
    project: projectId,
    status: destinationStatus,
  });

  const history = await History.create({
    task: task._id,
    project: projectId,
    user: req.user.userId,
    action: 'update',
    extraDetails: {
      updatedField: 'status',
      updatedValue: task.status,
    },
  });

  await User.populate(history, 'user');

  res.status(200).json({
    status: 'success',
    destinationStatus,
    sourceStatus,
    sourceIndex,
    destinationIndex,
    task,
    sourceTasks,
    destinationTasks,
    history,
  });
});
