import React from "react"

import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import NavigationMoreVert from 'material-ui/svg-icons/navigation/more-vert';
import { List, ListItem } from 'material-ui/List';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/content/add';
import Dialog from 'material-ui/Dialog';
import FlatButton from 'material-ui/FlatButton';
import IconMenu from 'material-ui/IconMenu';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';
import Snackbar from 'material-ui/Snackbar';

import { Grid, Row, Col } from 'react-flexbox-grid';

const HeaderTask = class extends React.Component{
    render(){
        return (
            <AppBar title="Tarefas"/>
        );
    }
}

const ContentTask = class extends React.Component{    

    state = {
        tasks: [],
        openDialogFormAddTask: false,
        textTitleTask: "",
        textDescriptionTask: "",
        openMessageForm: false,
        messageForm: "",
        errorValidateForm: false
    };

    renderTaskForList = (task, index) => {
        return (
            <ListItem key={index} 
                      primaryText={task.completed ? <strike>{task.name}</strike> : task.name}
                      secondaryText={task.completed ? <strike>{task.description}</strike> : task.description} 
                      secondaryTextLines={2}
                      rightIconButton={                
                        <IconMenu iconButtonElement={<IconButton><NavigationMoreVert /></IconButton>}
                                  anchorOrigin={{horizontal: 'left', vertical: 'top'}}
                                  targetOrigin={{horizontal: 'left', vertical: 'top'}}>
                            <MenuItem primaryText={task.completed ? "Desfazer" : "Completar"} onClick={() => this.completedTask(index, !task.completed)} />
                            <MenuItem primaryText="Remover" onClick={() => this.removeTask(index)} />
                        </IconMenu>
                      } 
            />
        );
    };

    renderListTask = () => {
        return (
            <Row around="xs">
                <Col xs={12} lg={6}>            
                    <List>  
                        {this.state.tasks.map((task, index) =>                           
                            this.renderTaskForList(task.task, index)
                        )}                        
                    </List>            
                </Col>
            </Row>
        );
    };

    fieldTitleChange = (newValue) => {
        this.setState({ textTitleTask: newValue });
    };

    fieldDescriptionChange = (newValue) => {
        this.setState({ textDescriptionTask: newValue });
    };

    renderDialogFormAddTask = () => {
        const actions = [
            <FlatButton label="Cancelar"
                        primary={false}
                        onClick={this.handleCloseDialogFormTask}
            />,
            <FlatButton label="Cadastrar"
                        primary={true}
                        onClick={this.handleCloseDialogFormAddTask}
            />,
        ];
        return (
            <Row>
                <FloatingActionButton style={{
                                      margin: 0,
                                      top: 'auto',
                                      right: 20,
                                      bottom: 20,
                                      left: 'auto',
                                      position: 'fixed'}}
                                      onClick={this.handleOpenDialogFormAddTask}>
                    <ContentAdd />
                </FloatingActionButton>
                <Dialog title="Cadastrar tarefa"
                        actions={actions}
                        modal={false}
                        open={this.state.openDialogFormAddTask}
                        onRequestClose={this.handleCloseDialogFormTask}
                        repositionOnUpdate={false}
                        autoDetectWindowHeight={false}
                        autoScrollBodyContent={false}
                        contentStyle={{
                            width: '100%',
                            maxWidth: '450px',
                            maxHeight: '100% !important'
                        }}
                        bodyStyle={{
                            maxHeight: '100% !important'
                        }}
                        style={{
                            paddingTop:'0 !important',
                            marginTop:'-65px !important',
                            bottom: '0 !important',
                            overflow: 'scroll !important',
                            height: 'auto !important'
                        }}
                >
                    
                    {
                        this.state.errorValidateForm ?
                        <div>Informe os dados para cadastrar a tarefa 
                            <p style={{color:"red"}}>
                                Preencha os campos para cadastrar a terafa!
                            </p>
                        </div>
                        :
                        <div>
                            Informe os dados para cadastrar a tarefa
                        </div>
                    }    

                    <TextField hintText="Escreva o título da tarefa"
                               floatingLabelText="Título"
                               style={{width:"100%"}}
                               value={this.state.textTitleTask} 
                               onChange={(event, newValue) => this.fieldTitleChange(newValue)}
                               autoFocus
                    />
                    <br/>                    
                    <TextField hintText="Escreva a descrição da tarefa"
                               floatingLabelText="Descrição"
                               multiLine={true}
                               rows={1}
                               style={{width:"100%"}}
                               value={this.state.textDescriptionTask} 
                               onChange={(event, newValue) => this.fieldDescriptionChange(newValue)}
                    />
                    
                </Dialog>
            </Row>
        );
    };

    handleOpenDialogFormAddTask = () => {
        this.setState({openDialogFormAddTask: true});
    };
    
    handleCloseDialogFormTask = () => {
        this.setState({
            openDialogFormAddTask: false,
            textTitleTask: "",
            textDescriptionTask: "",
            errorValidateForm: false
        });
    };

    handleCloseDialogFormAddTask = () => {                
        if (this.state.textTitleTask.trim() === "" || this.state.textDescriptionTask.trim() === ""){
            this.setState({errorValidateForm: true});
        }else{        
            this.setState({openDialogFormAddTask: false});
            var tasks = this.state.tasks;
            tasks.push({
                task: {
                    name: this.state.textTitleTask,
                    description: this.state.textDescriptionTask,
                    completed: false
                },
                edit: false
            });
            this.setState({
                textTitleTask: "",
                textDescriptionTask: "",
                tasks: tasks,
                openMessageForm: true,
                messageForm: "Tarefa cadastrada com sucesso",
                errorValidateForm: false
            });
        }
    };

    removeTask = (index) => {
        var tasks = this.state.tasks;
        tasks.splice(index, 1);
        this.setState({ 
            tasks: tasks,
            openMessageForm: true,
            messageForm: "Tarefa removida com sucesso" 
        });
    }

    completedTask = (index, completed) => {
        var tasks = this.state.tasks;
        tasks[index].task.completed = completed;
        this.setState({ 
            tasks: tasks,
            openMessageForm: true,
            messageForm: "Tarefa completada com sucesso"
        });
    }

    handleRequestCloseMessageForm = () => {
        this.setState({
          openMessageForm: false,
          messageForm: ""
        });
    };

    render(){
        return (            
            <Grid fluid >                
                {this.renderListTask()}
                {this.renderDialogFormAddTask()}
                <Snackbar open={this.state.openMessageForm}
                          message = {this.state.messageForm}
                          autoHideDuration = {4000}
                          onRequestClose = {this.handleRequestCloseMessageForm}
                />
            </Grid>
        );
    }
}

class Task extends React.Component {

    render() {
        return (        
            <MuiThemeProvider>
                <HeaderTask/>
                <ContentTask/>
            </MuiThemeProvider>
        );
    }

}

export default Task