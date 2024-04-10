import repository, { doneState, progressState, todoState  } from './State';
import { action } from 'mobx';

export default function localSave() { 
    if(repository.repoUrl !== ''){
        localStorage.removeItem(repository.repoUrl);
    };

    let localedRepo = repository;
    localedRepo.todoIssues = todoState.issues;
    localedRepo.progressIssues = progressState.issues;
    localedRepo.doneIssues = doneState.issues;
    localStorage.setItem(repository.repoUrl, JSON.stringify(localedRepo));
};
export const localLoad = action((input: any)=>{
    const localedRepo = JSON.parse(localStorage.getItem(input) as string);
    repository.repoUrl = localedRepo.repoUrl;
    repository.repoName = localedRepo.repoName;
    repository.repoAuthorName = localedRepo.repoAuthorName;
    repository.stars = localedRepo.stars;
    repository.issues = localedRepo.issues;
    todoState.issues = localedRepo.todoIssues;
    progressState.issues = localedRepo.progressIssues;
    doneState.issues = localedRepo.doneIssues;
    repository.isLoaded = localedRepo.isLoaded;
});