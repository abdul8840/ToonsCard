import Category from '../models/category.model.js';
import { errorHandler } from '../utils/error.js';

export const create = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return next(errorHandler(403, 'You are not allowed to create a Category'));
  }
  if (!req.body.name) {
    return next(errorHandler(400, 'Please provide all required fields'));
  }
  const newCategory = new Category({
    ...req.body,
    userId: req.user.id,
  });
  try {
    const savedCategory = await newCategory.save();
    res.status(201).json(savedCategory);
  } catch (error) {
    next(error);
  }
};