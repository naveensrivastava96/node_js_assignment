var statusenum={
    active:"active",
    complete:"complete",
    delete:"delete"
};
var todos={
    1:{title : "Learn Javascript", status: statusenum.active},
    2:{title : "git tutorial ", status:statusenum.active},
    3:{title : "interactive git ",status:statusenum.active}
};
var new_todo_id=4;
var status_array=[];
var num=0;
for(i in statusenum){
 status_array[num]=i;
 num++;
}

    module.exports={status_array:status_array,new_todo_id:new_todo_id,statusenum:statusenum, todos:todos};