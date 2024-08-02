import DbService from 'moleculer-db';
import MongooseAdapter from 'moleculer-db-adapter-mongoose';
import { ServiceBroker } from 'moleculer';
import User from '../models/user.model.js';

const userService = new ServiceBroker();
userService.createService({
    name:"user",
    mixins:[DbService],
    adapter: new MongooseAdapter("mongodb+srv://charupsharma5:charu5@cluster1.fjkwzjh.mongodb.net/?retryWrites=true&w=majority&appName=cluster1"
    ),
    model:[User],
    actions:{
        async createUser(ctx){
            const {name,email}=ctx.params;
            const newUser= await this.adapter.insert({name:name,email:email});
            return newUser;
        },
        async getUsers(ctx){
            return await this.adapter.find();
        }
    }
});
export default userService;

