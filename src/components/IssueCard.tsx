import React from 'react';
import Card from 'react-bootstrap/Card';
import { Row, Col } from 'react-bootstrap';

const IssueCard: React.FC = (issue: any) => {
    const date = new Date(issue.created_at);
    const difDate = Math.ceil((Date.now() - date.getTime()) / (1000 * 60 * 60 * 24));

    return (
        <Card border={issue.border} bg="light" style={{width: '90%', margin: '15px'}}>
                <Card.Body>
                    <Card.Text style={{fontWeight: 'bold', fontSize: 'small'}}>{issue.title}
                    </Card.Text>
                    <Row xs='auto'>
                        <Col>
                            <Card.Text style={{fontSize: 'small'}}>{`#${issue.number}`}</Card.Text>
                        </Col>
                        <Col>
                            <Card.Text style={{fontSize: 'small'}}>{`opened ${difDate} days ago`}</Card.Text>
                        </Col>
                    </Row>
                </Card.Body>
                <Card.Footer className="text-muted" >
                <Row xs={'auto'} style={{display: 'flex', justifyContent: 'space-between'}}>
                    <Card.Text style={{ fontSize: 'small', margin: '5px', fontWeight: 'bold' }}>{issue.user.login}</Card.Text>
                    
                    <Card.Text style={{ fontSize: 'small', margin: '5px' }} className='coments-text'>Coments: {issue.comments}</Card.Text>
                </Row>
                </Card.Footer>
            </Card>
    );
};

export default IssueCard;