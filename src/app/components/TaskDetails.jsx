import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import * as mutations from '../store/mutations';
const TaskDetail = ({
    id,
    comments,
    task,
    isComplete,
    groups,
    setTaskCompletion,
    setTaskGroup,
    setTaskName
}) => (
    <div> 
        <h2><input onChange={setTaskName} type="text" value={task.name}/></h2>
        <button onClick= {()=> setTaskCompletion(id, !isComplete)}>{isComplete?`Reopen`: `Complete`}</button>
        <select onChange={setTaskGroup} value={task.group}>
            {groups.map((group)=>(
                <option value={group.id} key={group.id}>{group.name}</option>
            ))}
        </select>
        <Link to="/dashboard">
            <button>Done</button>
        </Link>
    </div>
);
const mapStateToProps = (state, ownProps)=>{
    let id= ownProps.match.params.id;
    let task = state.tasks.find(task => task.id===id);
    let groups =state.groups;
    return {
        id,
        task,
        groups,
        isComplete: task.isComplete
    }
};
const mapDispatchToProps = (dispatch, ownProps) => {
    const id= ownProps.match.params.id;
    return {
        setTaskCompletion(id, isComplete){
            dispatch(mutations.setTaskCompletion(id, isComplete));
        },
        setTaskGroup(e){
            dispatch(mutations.setTaskGroups(id, e.target.value));
        },        
        setTaskName(e){
            dispatch(mutations.setTaskName(id, e.target.value));
        }
    }

}
export const ConnectedTaskDetail = connect(mapStateToProps, mapDispatchToProps)(TaskDetail);