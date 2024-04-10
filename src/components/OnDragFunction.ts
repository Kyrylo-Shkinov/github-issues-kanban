import { action } from 'mobx';
import { doneState, progressState, todoState  } from './State';
import  issuesUpdate  from './IssuesBorderUpdate';
import localSave from './localSave';
export const onDragEnd = action((result: any) => {
    if (!result.destination) return;
    const { source, destination } = result;
    let sourceColumn: any;
    let destinationColumn: any;
    switch (source.droppableId) {
        case 'To do':
            sourceColumn = todoState.issues;
            break;
        case 'In progress':
            sourceColumn = progressState.issues;
            break;
        case 'Done':
            sourceColumn = doneState.issues;
            break;
    };
    switch (destination.droppableId) {
        case 'To do':
        destinationColumn = todoState.issues;
            break;
        case 'In progress':
            destinationColumn = progressState.issues;
            break;
        case 'Done':
            destinationColumn = doneState.issues;
            break;
    };
    
    let [removed] = sourceColumn.splice(source.index, 1);
    destinationColumn.splice(destination.index, 0, removed);
    issuesUpdate(destination.droppableId);
    localSave();
});