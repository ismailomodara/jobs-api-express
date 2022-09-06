const index = async (req, res) => {
    res.json(req.user)
}

const store = async (req, res) => {
    res.send("Save job")
}

const show = async (req, res) => {
    res.send("Get job")
}

const update = async (req, res) => {
    res.send("Update job")
}

const destroy = async (req, res) => {
    res.send("Update job")
}

module.exports = { index, store, show, update, destroy }
