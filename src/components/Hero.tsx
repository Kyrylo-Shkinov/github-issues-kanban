import React, { useState, useEffect } from 'react';
import validateURL from './UrlValidator';
import { action } from 'mobx';
import KanbanColumns from './KanbanColumns';
import repository from './State';
import RequestStarter, { stateReset } from './RequestAPI';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import InputGroup from 'react-bootstrap/InputGroup';
import Breadcrumb from 'react-bootstrap/Breadcrumb';
import { Row, Col } from 'react-bootstrap';
import { observer } from 'mobx-react';
import { localLoad } from './localSave';

const Hero = observer(() => {
    const [url, setUrl] = useState('');
    const [input, setInput] = useState('');
    const [isValid, setIsValid] = useState(false);
    const [repoName, setRepoName] = useState(repository.repoName);
    const [repoOwner, setRepoOwner] = useState(repository.repoAuthorName);
    const [disabled, setDisabled] = useState(false);

    // localStorage.clear(); //очищення localStorage
    //Action oновлення стану репозиторія
    const updateState = action((url: string, name: string, repoName: string, callback: Function) => {
        repository.repoUrl = url;
        repository.repoAuthorName = name;
        repository.repoName = repoName;
        callback();
    });

    //Отримання інформації про репозиторій з URL
    const getRepoInfo = (url: string) => {
        const urlParts = url.split('/');
        if (urlParts[4] == repoName) {
            setRepoName(repoName.toUpperCase()); //змінюємо регістр на великий для того щоб запустити оновлення стану (да, костиль)
        } else {
            setRepoName(urlParts[4]);
        }
        setRepoOwner(urlParts[3]);
    };

    //Запуск оновлення стану репозиторія після отримання інформації про репозиторій.
    useEffect(() => {
        if (repoName !== '') {
            updateState(url, repoOwner, repoName, RequestStarter); //RequestStarter
        }
    }, [repoName]);

    //Обробка корректності url
    const handleSubmit = (e: React.FormEvent) => {
        action(() => { repository.isLoaded = false; });
        setDisabled(true);
        e.preventDefault();
        stateReset();
        setUrl(input);
        if (validateURL(input)) {
            setIsValid(true);
            // getRepoInfo(input);
            if (localStorage.getItem(input) !== null) {
                localLoad(input); 
            } else { getRepoInfo(input); }
        } else {
            setIsValid(false);
        }
    };

    return (
        <>
            <h1 style={{ margin: '25px 0' }}>GitHub Issues Kanban Viewer</h1>
            <header style={{ maxWidth: '80%', margin: '0 auto' }}>
                <Form onSubmit={handleSubmit} data-testid="form">
                    <InputGroup>
                        <InputGroup.Text id="basic-addon3">
                            "https://github.com/user/repo"
                        </InputGroup.Text>
                        <Form.Control type="text" data-testid={'input'} placeholder="Enter URL" value={input}
                            onChange={(e) => { setInput(e.target.value); stateReset(); setDisabled(false); }} id='input-url' />
                        {disabled ? <Button type="submit" disabled>Load Issues</Button> : <Button type="submit">Load Issues</Button>}
                    </InputGroup>
                </Form>
                <div style={{ margin: '25px 0' }} className='links-container'>
                    {isValid && repository.isLoaded ?
                        (<>
                            <Row xs={'auto'}>
                                <Col>
                                    <Breadcrumb>
                                        <Breadcrumb.Item href={`https://github.com/${repoOwner}/`}>{`${repository.repoAuthorName}`}</Breadcrumb.Item>
                                        <Breadcrumb.Item href={url}>
                                            {repository.repoName}
                                        </Breadcrumb.Item>
                                        <Breadcrumb.Item active>Issues</Breadcrumb.Item>
                                    </Breadcrumb>
                                </Col>
                                <Col style={{ display: 'flex' }}>
                                    <svg xmlns="http://www.w3.org/2000/svg" id="Filled" viewBox="0 0 24 24" width="25" height="25">
                                        <path d="M1.327,12.4,4.887,15,3.535,19.187A3.178,3.178,0,0,0,4.719,22.8a3.177,3.177,0,0,0,3.8-.019L12,20.219l3.482,2.559a3.227,3.227,0,0,0,4.983-3.591L19.113,15l3.56-2.6a3.227,3.227,0,0,0-1.9-5.832H16.4L15.073,2.432a3.227,3.227,0,0,0-6.146,0L7.6,6.568H3.231a3.227,3.227,0,0,0-1.9,5.832Z" fill="#FFD700" />
                                    </svg>
                                    <p style={{ marginLeft: '10px' }}>{repository.stars} stars</p>
                                </Col>

                            </Row>


                        </>
                        )
                        : null}
                </div>
            </header>
            <KanbanColumns />
        </>
    );
});
export default Hero;
