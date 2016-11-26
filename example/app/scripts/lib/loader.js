define([],function(){
    var store = {
        css:{}
    };
   return {
       css: function(name){
            if(!store.css[name]){
                store.css[name] = true;
                var link = document.createElement('link');
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = name;
                document.head.appendChild(link);
            }
       }
   };
});