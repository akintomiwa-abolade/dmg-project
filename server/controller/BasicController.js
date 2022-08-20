/**
 |----------------------------------------------
 | Basic Controller
 |----------------------------------------------
 | Holds basic operations
 |----------------------------------------------
 */
require('dotenv').config();
const httpClient = require('../config/httpClient');
const redisClient = require("../config/redisClient");
const apiPath = process.env.BASE_URL;
const url = require('url');

class BasicController {

    static async getOrganizationRepository(req, res){
        try{

            let org = req.params.org;
            let repo_per_page = req.query["per_page"];
            let issues_per_page = req.query["issues_per_page"];

            let repo_payload = { per_page: repo_per_page, issues_per_page:issues_per_page};
            let issue_payload = { per_page: issues_per_page};

            const repoAndIssueParams = new url.URLSearchParams(repo_payload);
            const issueParams = new url.URLSearchParams(issue_payload);

            // check if the request is already stored in the cache, if so, return the response
            let orgData = await redisClient.get(org)
            if (orgData) {
                orgData = JSON.parse(orgData);
                if(orgData.repo_per_page == repo_per_page && orgData.issues_per_page == issues_per_page){
                    return res.status(200).json({
                        data: orgData.data
                    });
                }
            }

            // Organisation repositories
            let result = await httpClient.get(`${apiPath}/orgs/${org}/repos?${repoAndIssueParams}`);
            var dataArr  = [];

            //  Executing each repository to keep there respective issues
            for(var i = 0; i < result.data.length; i++){
                var item = result.data[i];
                var response =  await httpClient.get(`${apiPath}/repos/${item.owner.login}/${item.name}/issues?${issueParams}`);
                item["issues"] = response.data
                dataArr.push(item);
            }

            let redisPayload = {repo_per_page, issues_per_page, data: dataArr}

            //Persist cache with organisation repository and issue data provided it matches the variables
            await redisClient.set(org, JSON.stringify(redisPayload))
            return res.status(200).json({
                data: dataArr
            });

        }catch (err){
            console.log(err);
            res.sendStatus(500);
        }
    }
}
module.exports = BasicController;