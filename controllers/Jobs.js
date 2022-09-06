const Job = require("../models/Job");
const { NotFoundError, BadRequestError } = require("../errors")
const index = async (req, res) => {
    const jobs = await Job.find({ created_by: req.user.id }).sort('created_by')

    res.status(200).json({
        success: true,
        message: "Jobs fetched",
        data: {
            list:  jobs,
            count: jobs.length
        }
    })
}

const store = async (req, res) => {
    req.body.created_by = req.user.id;

    const job = await Job.create(req.body)

    res.status(200).json({
        success: true,
        message: "Job created",
        data: job
    })
}

const show = async (req, res) => {
    const job = await Job.findOne({ created_by: req.user.id, _id: req.params.id })

    if(!job) {
        throw new NotFoundError("No job with id")
    }
    res.status(200).json({
        success: true,
        message: "Job fetched",
        data: job
    })
}

const update = async (req, res) => {

    if(!req.body.company || !req.body.position) {
        throw new BadRequestError("All fields are required")
    }

    const job = await Job.findByIdAndUpdate({ _id: req.params.id, created_by: req.user.id }, req.body, { new: true, runValidators: true})
    if(!job) {
        throw new NotFoundError("No job with id")
    }
    res.status(200).json({
        success: true,
        message: "Job updated",
        data: job
    })
}

const destroy = async (req, res) => {
    const job = await Job.findOneAndRemove({ _id: req.params.id, created_by: req.user.id })

    if(!job) {
        throw new NotFoundError("No job with id")
    }
    res.status(200).json({
        success: true,
        message: "Job deleted",
        data: null
    })
}

module.exports = { index, store, show, update, destroy }
