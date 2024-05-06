const {Router} = require("express")

const authRoutes = require("./authRoutes.js")
const teachRoutes = require("./teachRoutes.js")
const stdRoutes = require("./stdRoutes.js")

const router = Router();

router.use("/auth", authRoutes)
router.use("/teach", teachRoutes)
router.use("/std", stdRoutes)


module.exports = router ;