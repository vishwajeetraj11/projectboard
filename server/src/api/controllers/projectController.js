import { Member } from '../../models/Member.js';
import { Project } from '../../models/Project.js';
import { Task } from '../../models/Task.js';
import { History } from '../../models/History.js';
import { User } from '../../models/User.js';
import { AppError } from '../../utils/AppError.js';
import { catchAsync } from '../../utils/catchAsync.js';

export const getAllProjects = catchAsync(async (req, res) => {
  const { scope } = req.query;
  const filterObj = {
    user: req.user.userId,
  };
  if (scope === 'admin') {
    filterObj.access = 'admin';
  } else if (scope === 'shared') {
    filterObj.access = 'member';
  }

  // const projects = await Project.find(filterObj);
  const members = await Member.find(filterObj);
  await Project.populate(members, 'project');
  await User.populate(members, 'user');

  return res.status(200).json({ status: 'success', projects: members });
});

export const getProjectById = catchAsync(async (req, res, next) => {
  const project = await Project.findById(req.params.id);
  if (!project) {
    return next(new AppError('No project found.', 404));
  }
  return res.status(200).json({ status: 'success', project });
});

export const createProject = catchAsync(async (req, res) => {
  const { title, description } = req.body;
  const newProject = await Project.create({
    title,
    description,
    admin: req.user.userId,
  });
  const member = await Member.create({
    project: newProject._id,
    user: req.user.userId,
    access: 'admin',
  });
  return res.status(201).json({
    status: 'success',
    project: newProject,
    member,
  });
});

export const updateProject = catchAsync(async (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  const updatedProject = await Project.findByIdAndUpdate(
    id,
    {
      title,
      description,
    },
    {
      new: true,
      runValidators: true,
    }
  );

  return res.status(200).json({
    status: 'success',
    project: updatedProject,
  });
});

export const deleteProject = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const project = await Project.findById(id);

  if (!project) {
    return next(
      new AppError("The project you are trying to delete doesn't exist.", 404)
    );
  }

  await Member.deleteMany({ project: project._id });
  await History.deleteMany({ project: project._id });
  await Task.deleteMany({ project: project._id });

  await project.remove();
  res.status(204).json({
    status: 'success',
    message: 'Project deleted Successfully',
  });
});
