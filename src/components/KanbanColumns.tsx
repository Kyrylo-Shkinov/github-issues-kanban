import KanbanColumn from './KanbanColumn';
import { Row, Col } from 'react-bootstrap';
import { DragDropContext } from 'react-beautiful-dnd';
import { onDragEnd } from './OnDragFunction';
// import localSave from './localSave';
import { observer } from 'mobx-react';


const KanbanColumns = observer(() => {
    

    return (
        <DragDropContext onDragEnd={onDragEnd}>
            <Row style={{width: '80%', margin: '25px auto'}} xs={3} data-testid="columns">
                <Col data-testid="kanban-column">
                    <KanbanColumn title='To do'/>
                </Col> 
                <Col data-testid="kanban-column">
                    <KanbanColumn title='In progress'/>
                </Col>
                <Col data-testid="kanban-column">
                    <KanbanColumn title='Done'/>
                </Col>
            </Row>
        </DragDropContext>
    );
});

export default KanbanColumns;
