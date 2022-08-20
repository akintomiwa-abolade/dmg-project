/**
 |----------------------------------
 | Basic Api Route
 |----------------------------------
 */

const express = require("express");
const router = express.Router();
const BasicController = require('../controller/BasicController');


/**
 * @swagger
 * /api/v1/repository/{org}:
 *   get:
 *     tags:
 *       - Basic
 *     name: Fetch all Organisation Repositories
 *     summary: List all selected organisation repos
 *     consumes:
 *       - application/json
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: path
 *         name: org
 *         required: true
 *         schema:
 *           type: string
 *         description: Github Organisation Name
 *       - in: query
 *         name: per_page
 *         required: true
 *         schema:
 *           type: integer
 *         description: The number of Organisation repository you wish to see
 *       - in: query
 *         name: issues_per_page
 *         required: true
 *         schema:
 *           type: integer
 *         description: The number of repository issues you wish to see
 *     responses:
 *       200:
 *         description: Repository object
 *       500:
 *         description: Internal server error
 */
router.get("/repository/:org", BasicController.getOrganizationRepository);

module.exports = router;