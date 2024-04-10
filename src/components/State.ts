import { observable } from 'mobx';

interface GlobalState {
        repoUrl: string;
        repoAuthorName: string;
        repoName: string;
        stars: number;
        issues: [];
        isLoaded: boolean;
        todoIssues: [];
        progressIssues: [];
        doneIssues: [];
    }

const globalState: GlobalState = observable({
        repoUrl: '',
        repoAuthorName: '',
        repoName: '',
        stars: 0,
        issues: [],
        isLoaded: false,
        todoIssues: [],
        progressIssues: [],
        doneIssues: [],
});
export default globalState;

export const todoState: any = observable({
        issues: [],
        title: 'To Do'
});
export const progressState: any = observable({
        issues: [],
        title: 'In progress'
});
export const doneState: any = observable({
        issues: [],
        title: 'Done'
});