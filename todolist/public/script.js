const RESPONSE_DONE=4;

const STATUS_OK=200;
const to_do_list_id="todos_list";

window.onload=getactiveelements();
window.onload=getdeleteelement();
window.onload=get_complete_list();

function  getactiveelements() {
    xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos/active",true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK)
            {
                addtodoelement(to_do_list_id,xhr.responseText);
            }
        }
    }
    xhr.send(data=null);


}
function addtodoelement(id,todo_item)
{
    document.getElementById(to_do_list_id).innerHTML='';
    var todoos=JSON.parse(todo_item);
    console.log(todoos);
    var parent=document.getElementById(id);
    if(parent)
    {
        Object.keys(todoos).forEach(
            function(key)
            {
                var todo_element=createTodoElement(key, todoos[key]);
                parent.appendChild(todo_element);
            }
        )
    }
}
function createTodoElement(id,todo_object) {

    var todo_element=document.createElement("div");

    var todo_complete_button=document.createElement("button");
    todo_complete_button.innerText="mark as complete";
    todo_complete_button.setAttribute("onclick","completeajax("+id+")");
    todo_complete_button.setAttribute("class","complete-button");

    var todo_button=document.createElement("button");
    todo_button.innerText='mark as delete';
    todo_button.setAttribute("onclick","deleteajax("+id+")");
    todo_button.setAttribute("class","del-button");

    todo_element.innerText=todo_object.title;
    todo_element.setAttribute("data-id",id);
    todo_element.setAttribute("class","text-in-active");
    todo_element.appendChild(todo_complete_button);
    todo_element.appendChild(todo_button);
    return todo_element;
}
function activeajax(id){
    var xhr=new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="changed_status=active";
    xhr.onreadystatechange=function(){
        if(xhr.readyState==RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK)
            {
                getactiveelements();
                get_complete_list();
            }
            else
            {
                console.log("can't get completed list");
            }
        }
    }
    xhr.send(data);
}

function completeajax(id){

    var xhr=new XMLHttpRequest();
    xhr.open("PUT","/api/todos/"+id,true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
    var data="changed_status=complete";
    xhr.onreadystatechange=function(){
        if(xhr.readyState==RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK)
            {
                get_complete_list();
            }
            else
            {
                console.log("can't get completed list");
            }
        }
    }
    xhr.send(data);

}

function get_complete_list() {
    var xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos/complete",true);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK)
            {

                printelement(xhr.responseText,"completed_list");
            }
        }
    }
    xhr.send(data=null);

}

function deleteajax(id_to_delete){

    var xhr=new XMLHttpRequest();
    xhr.open("DELETE","/api/todos/"+id_to_delete,true);
   // xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
   // var data='todo_title='+encodeURI(title);
    xhr.onreadystatechange=function(){
        if(xhr.readyState==RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK)
            {

                getdeleteelement();
                get_complete_list();
            }
            else
            {
                console.log(xhr.responseText);
            }
        }

    }
    xhr.send(data=null)
}

function getdeleteelement() {

    var xhr = new XMLHttpRequest();
    xhr.open("GET", "/api/todos/delete", true);
    xhr.onreadystatechange = function () {
        if (xhr.readyState == RESPONSE_DONE) {
            if (xhr.status == STATUS_OK) {

                printelement(xhr.responseText,"deleted_list");
            }
        }

    }
    xhr.send(data=null);
}

function printelement(elements_list,div_id){
    getactiveelements();

    var item_to_print=JSON.parse(elements_list)


        var parent = document.getElementById(div_id);
        parent.innerHTML = ''
        if (parent) {

            // todos { id : {todo object}, id : {todo:object} ..}

            Object.keys(item_to_print).forEach(
                function (key) {
                    console.log("key : "+key+" value : "+item_to_print[key]);
                    if(div_id=="deleted_list") {
                        //get_complete_list();
                        var todo_element = createTodoElementtodelete(key, item_to_print[key]);

                    }
                    if(div_id=="completed_list") {
                        var todo_element = createTodoElementtocomplete(key, item_to_print[key]);

                    }
                    parent.appendChild(todo_element);
                }
            )
        }


}

function createTodoElementtocomplete(id,todo_object){

    var todo_element=document.createElement("div");
    todo_element.innerText=todo_object.title;
    todo_element.setAttribute("data-id",id);
    todo_element.setAttribute("class","text-in-complete");
    todo_delete_button=document.createElement("button");
    todo_delete_button.innerText="mark to delete";
    todo_delete_button.setAttribute("onclick","deleteajax("+id+")");
    todo_delete_button.setAttribute("class","del-button");

    todo_active_button=document.createElement("button");
    todo_active_button.innerText="mark to active";
    todo_active_button.setAttribute("onclick","activeajax("+id+")");
    todo_active_button.setAttribute("class","active-button");
    todo_element.appendChild(todo_active_button);
    todo_element.appendChild(todo_delete_button);
    return todo_element;
}

function createTodoElementtodelete(id, todo_object){

    console.log(id);
    var todo_element = document.createElement("div");
    todo_element.innerText = todo_object.title;

    todo_element.setAttribute(
        "data-id", id
    );
    todo_element.setAttribute("class","text-in-delete");
    return todo_element;

}

function addtodoajax()
{
    var title=document.getElementById("new_todo").value;

    var xhr=new XMLHttpRequest();
    xhr.open("POST","/api/todos/",true);
    xhr.setRequestHeader("content-type","application/x-www-form-urlencoded");
     var data='todo_title='+encodeURI(title);
     xhr.onreadystatechange=function(){
         if(xhr.readyState==RESPONSE_DONE)
         {
             if(xhr.status==STATUS_OK)
             {
                 getactiveelements();
             }
             else
             {

                 console.log(xhr.responseText);
             }
         }
     }

    xhr.send(data);
}
function todoajax()
{

    var xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);
    xhr.onreadystatechange=function()
    {
        if(xhr.readyState==RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK){
                //console.log(xhr.responseText);
                //add_todo(to_do_list_id,xhr.responseText);

                getactiveelements(to_do_list_id,xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}
var turn=0;
function hide_show_ajax_complete(){
    if(turn==0)
    {
        document.getElementById("completed_list").innerHTML='';
        turn=1;
        console.log("turn1"+turn);
        return;
    }
    if(turn==1)
    {
        get_complete_list();
        turn=0;
        console.log("turn1"+turn);
        return;

    }

}
var turn2=0;
function hide_show_ajax_delete()
{
    if(turn2==0)
    {
        document.getElementById("deleted_list").innerHTML='';
        turn2=1;
        console.log("turn2"+turn2);
        return;
    }
    if(turn2==1)
    {
        getdeleteelement();
        turn2=0;
        console.log("turn2"+turn2);
        return;

    }
}