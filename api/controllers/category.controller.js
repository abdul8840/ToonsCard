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

export const getcategory = async (req, res, next) => {
  try {
    const category = await Category.find().sort({
      createdAt: -1
    });
    const totalCategory = await Category.countDocuments();

    const now = new Date();

    const oneMonthAgo = new Date(
      now.getFullYear(),
      now.getMonth() - 1,
      now.getDate()
    );

    const lastMonthCategory = await Category.countDocuments({
      createdAt: { $gte: oneMonthAgo },
    });

    res.status(200).json({
      category,
      totalCategory,
      lastMonthCategory,
    });
  } catch (error) {
    next(error);
  }
};

export const deletecategory = async (req, res, next) => {
  if (!req.user.isAdmin || req.user.id !== req.params.userId) {
    return next(errorHandler(403, 'You are not allowed to delete this category'));
  }
  try {
    await Category.findByIdAndDelete(req.params.categoryId);
    res.status(200).json('The category has been deleted');
  } catch (error) {
    next(error);
  }
};