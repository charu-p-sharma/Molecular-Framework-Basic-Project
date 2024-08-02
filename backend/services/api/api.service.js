import ApiGateway from 'moleculer-web';

export default{
    name:"api",
    mixins:[ApiGateway],
    settings:{
        port:process.env.PORT || 8000,
        routes:[{
            path:"/api",
            aliases:{
                "POST /users":"users.createUser",
                "GET /users":"users.getUsers",
            },
            mappingPolicy:"all", // Expose all actions
        },
        ],
    }
};