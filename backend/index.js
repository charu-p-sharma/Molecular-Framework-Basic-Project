import {ServiceBroker} from 'moleculer';
import userService from './services/user.service.js';

const broker = new ServiceBroker({
    nodeID:"node-1",
    transporter:"NATS",
});

broker.loadServices("./services");

broker.start().then(() => {
    broker.repl();
});

async function startApp(){
    await userService.start();
    try {
        //Create User
        const newUser = await userService.call("user.createUser",{
            name:"charu sharma",
            email:"a@gmail.com",
        })
        console.log("New User Created:",newUser);

        //Get User Service
        const users=await userService.call("user.getUsers",{
            name:newUser.name,
            email:newUser.email,
        });
        console.log("All Users:",users);
    } catch (error) {
        console.log("Error:",error);
    }finally{
        await userService.stop();
    }
}
startApp();

