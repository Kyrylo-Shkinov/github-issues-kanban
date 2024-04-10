import { Octokit } from "octokit";
import { action } from 'mobx';
import globalState, { doneState, progressState, todoState  } from './State';


const RequestStarter = () => {
    const repository = globalState;
    //створюємо octokit для доступу до github api
    const octokit = new Octokit();
    //action для оновлення issues в глобальному стані
    const issuesUpdate = action((response: any, callback: Function) => {
        
        repository.issues = response.data as [];

        repository.issues.map((issue: any) => { //направляємо issues в правильні колонки
            if (issue.state === 'closed') {
                issue.border = 'success';
                doneState.issues.push(issue);
            } else if (issue.state === 'open' && issue.assignee === null) {
                issue.border = 'primary';
                todoState.issues.push(issue);
            } else if (issue.state === 'open' && issue.assignee !== null) {
                issue.border = 'warning';
                progressState.issues.push(issue);
            };
            return issue;
        });


        callback();
        return 
    });

    //функція для отримання issues з репозиторію
    const issues = async (callback: any) => {
        try {
            const response = await octokit.request('GET /repos/{owner}/{repo}/issues', {
                owner: repository.repoAuthorName,
                repo: repository.repoName,
                state: 'all'
            });
            
            return callback(response, action(() => { repository.isLoaded = true  }));
        } catch (error) {
            console.error('Error fetching issues:', error);
        }
    };
    //функція для отримання кількості зірок репозиторію
    const stars = async (callback: Function) => {
        const response = await octokit.request('GET /repos/{owner}/{repo}', {
            owner: repository.repoAuthorName,
            repo: repository.repoName
        });
        callback(response);
        return null;
    };
    const setStars = action((response: any) => {
        
        repository.stars = response.data.stargazers_count;
    });

    
    issues(issuesUpdate);
    stars(setStars);
};

export default RequestStarter;

export const stateReset = action(() => {
    todoState.issues = [];
    progressState.issues = [];
    doneState.issues = [];
    globalState.isLoaded = false;
    globalState.repoAuthorName = '';
    globalState.repoName = '';
    globalState.stars = 0;
});