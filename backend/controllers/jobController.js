import { catchAsyncErrors } from "../middlewares/catchAsyncError.js";
import { Job } from "../models/Reqschema.js";
import ErrorHandler from "../middlewares/error.js";

export const getAllReqs = catchAsyncErrors(async (req, res, next) => {
  const Reqs = await Job.find({ expired: false });
  res.status(200).json({
    success: true,
    Reqs,
  });
});

export const Postreq = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const {
    title,
    description,
    Gender,
    UPI,
    city,
    location,
    fixedAmount,
    AmountFrom,
    AmountTo,
  } = req.body;

  if (!title || !description || !Gender || !UPI || !city || !location) {
    return next(new ErrorHandler("Please provide full job details.", 400));
  }

  // if ((!AmountFrom || !AmountTo) && !fixedAmount) {
  //   return next(
  //     new ErrorHandler(
  //       "Please either provide fixed Amount or ranged Amount.",
  //       400
  //     )
  //   );
  // }

  // if (AmountFrom && AmountTo && fixedAmount) {
  //   return next(
  //     new ErrorHandler("Cannot Enter Fixed and Ranged Amount together.", 400)
  //   );
  // }
  const postedBy = req.user._id;
  const job = await Job.create({
    title,
    description,
    Gender,
    UPI,
    city,
    location,
    fixedAmount,
    AmountFrom,
    AmountTo,
    postedBy,
  });
  res.status(200).json({
    success: true,
    message: " Request Posted Successfully!",
    job,
  });
});

export const getMyReqs = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const myReqs = await Job.find({ postedBy: req.user._id });
  res.status(200).json({
    success: true,
    myReqs,
  });
});

export const updateJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  let job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  job = await Job.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
    useFindAndModify: false,
  });
  res.status(200).json({
    success: true,
    message: "Job Updated!",
  });
});

export const deleteJob = catchAsyncErrors(async (req, res, next) => {
  const { role } = req.user;
  if (role === "Job Seeker") {
    return next(
      new ErrorHandler("Job Seeker not allowed to access this resource.", 400)
    );
  }
  const { id } = req.params;
  const job = await Job.findById(id);
  if (!job) {
    return next(new ErrorHandler("OOPS! Job not found.", 404));
  }
  await job.deleteOne();
  res.status(200).json({
    success: true,
    message: "Job Deleted!",
  });
});

export const getSingleJob = catchAsyncErrors(async (req, res, next) => {
  const { id } = req.params;
  try {
    const job = await Job.findById(id);
    if (!job) {
      return next(new ErrorHandler("Job not found.", 404));
    }
    res.status(200).json({
      success: true,
      job,
    });
  } catch (error) {
    return next(new ErrorHandler(`Invalid ID / CastError`, 404));
  }
});
