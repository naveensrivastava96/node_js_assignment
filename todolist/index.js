var express=require("express");
var todo=require("./send.js");
var bodyparser=require("body-parser");
//console.log(todo);
var app=express();
//app.get('/',bodyparser.urlencoded({extended:false}));
app.use('/',bodyparser.urlencoded({extended:false}));
app.use("/",express.static(__dirname+"/public"));
app.get("/api/todos",function(req,res){res.json(todo.todos);});
app.delete("/api/todos/:id",function(req,res) {
    var id_to_delete = req.params.id;
    var todoo=todo.todos[id_to_delete];
    if(!todoo)
    {
        res.status(400).json({error:"this todo does not exists"});
    }
    else
    {
        todo.todos[id_to_delete].status = todo.statusenum.delete;
        res.json(todo.todos);
    }
});
app.post("/api/todos/",function(req,res){
    var todoo='maths';//req.body.todo_title;
    console.log(req.body);
    if(!todoo)
    {
        res.status(400).json({error:"todo title cant empty"});
    }
    else
    {

        var new_todo_obj={
            title:'maths',//req.body.todo_title,
            status:todo.statusenum.active
        };
        todo.todos[todo.new_todo_id++]=new_todo_obj;
        //console.log(todo.todos);
        res.json(todo.todos);
        //res.send(todo.todos);


    }
});
app.put("/api/todos/:id",function(req,res){
    var update_todo_id=req.params.id;
    var update=todo.todos[update_todo_id];
    if(!update)
        res.status(404).json({error:"this donot exists"});
    else {
        update.status=req.body.changed_status;
        res.json(todo.todos);
    }

});
app.get("/api/todos/:status_get",function(req,res){

   //if (!req.params.status_get)
    get_s=req.params.status_get;
    var j=0;k=false;
    for(i in todo.status_array)
    {
        if(get_s===todo.status_array[i])
        {
            k=true;
            break;
        }
    }
    if(!k)
        res.json({error:"bad request"});
   else {
        var result = {};
        var n = 0;

        for (i in todo.todos) {
            //console.log(i);
            if (todo.todos[i].status === get_s) {
                result[n] = todo.todos[i];
                n++;
            }

        }
        res.json(result);
    }

});
app.put("/api/todos/:set_state/:req_id",function(req,res){
   var stat=req.params.set_state;
   var req_id=req.params.req_id;
   todo.todos[req_id].status=stat;
   res.json(todo.todos);
});

app.listen(4000);