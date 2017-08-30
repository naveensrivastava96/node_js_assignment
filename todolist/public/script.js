const RESPONSE_DONE=4;

const STATUS_OK=200;
const to_do_list_id="todos_list";

function add_todo(id,todo_inner_text)
{
    var parent=document.getElementById(to_do_list_id);
    parent.innerText=todo_inner_text;
}
function todoajax()
{
    console.log("define it");
    var xhr=new XMLHttpRequest();
    xhr.open("GET","/api/todos",true);
    xhr.onreadystatechange=function()
    {
        if(xhr.readyState==RESPONSE_DONE)
        {
            if(xhr.status==STATUS_OK){
                //console.log(xhr.responseText);
                add_todo(to_do_list_id,xhr.responseText);
            }
        }
    }
    xhr.send(data=null);
}