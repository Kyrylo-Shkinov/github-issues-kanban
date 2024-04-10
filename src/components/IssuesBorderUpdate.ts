import { doneState, progressState, todoState  } from './State';
import { action } from 'mobx';

const issuesUpdate = action((title: any) => {
    switch (title) {
        case 'To do':
            todoState.issues.map((issue: any) => { issue.border = 'primary'; return });
            break;
        case 'In progress':
            progressState.issues.map((issue: any) => { issue.border = 'warning'; return });
            break;
        case 'Done':
            doneState.issues.map((issue: any) => { issue.border = 'success'; return });
            break;
        default:
            break;
    }
    return;
});

export default issuesUpdate;