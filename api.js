var serverURL = "http://localhost:3000";

var api = {
    name : "Devjobs api",
    description : "This is an api that provieds access to a list of development jobs currently available in Enterprise Applications",
    queries : [
        {name : "All Jobs", url: serverURL + "/jobs"},
        {name : "Job Detail", example : serverURL + "/jobs/129477BR", url: serverURL +  "/jobs/:id"}
    ],
    actions : {
        apply : {
            url : serverURL +  "/jobs/apply",
            method : "POST",
            fields : [
                {name : "Name",         required : true, description : "Applicant Name"},
                {name : "Email",        required : true, description : "Applicant Email"},
                {name : "About",        required : true, description : "Chunk of text that describes you and why you want to work at Turner Broadasting"},
                {name : "Req",          required : true, description : "The Requisition Number for the position.  You can find it in the job writeup at http://devjobs.turner.com"},
                {name : "geeklist",     required : false, description : "Your geeklist username if you have one"},
                {name : "stackoverflow",required : false, description : "Your Stack Overflow username if you have one"},
                {name : "github",       required : false, description : "Your github username if you have one"},
                {name : "coderwall",    required : false, description : "Your coderwall username if you have one"},
                {name : "urls",         required : false, description : "An array of strings representing any other social coding profiles you would like to provide"}
            ]
        }
    }
};

exports.Api = api;
