import React from 'react';
import { Droppable, Draggable } from 'react-beautiful-dnd';
import Card from 'react-bootstrap/Card';
import IssueCard from './IssueCard';
import repository, { doneState, progressState, todoState } from './State';
import { observer } from 'mobx-react';
import Badge from 'react-bootstrap/Badge';

interface KanbanColumnProps {
    title: string;
}

const KanbanColumn: React.FC<KanbanColumnProps> = observer(({ title }) => {
    let issuesToRender: any;

    if (repository.isLoaded) {
        switch (title) {
            case 'To do':
                issuesToRender = todoState;
                break;
            case 'In progress':
                issuesToRender = progressState;
                break;
            case 'Done':
                issuesToRender = doneState;
                break;
            default:
                break;
        }
    };
    
    return (
        <Card bg='light'>
            <Card.Header>
                {repository.isLoaded ? issuesToRender.title : title}
                {repository.isLoaded ? <Badge bg="primary" style={{margin: '0 0 0 15px'}}>{issuesToRender.issues.length}</Badge>: null}
            </Card.Header>
            <Droppable droppableId={title}>
                {(provided) => (
                    <Card.Body
                        ref={provided.innerRef}
                        {...provided.droppableProps}
                    >
                        {repository.isLoaded && issuesToRender.issues.map((issue: any, index: number) => (
                            <Draggable key={issue.id} draggableId={issue.node_id} index={index}>
                                {(provided) => (
                                    <div
                                        ref={provided.innerRef}
                                        {...provided.draggableProps}
                                        {...provided.dragHandleProps}
                                    >
                                        <IssueCard key={issue.id} {...issue} />
                                    </div>
                                )}
                            </Draggable>
                        ))}
                        {provided.placeholder}
                    </Card.Body>
                )}
            </Droppable>
        </Card>
    );
});

export default KanbanColumn;
