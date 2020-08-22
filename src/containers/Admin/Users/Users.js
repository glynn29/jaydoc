import React from "react";
import axiosCall from "../../../axios";

let users = {
        1:{name: 'john'},
        2:{name: 'ryan'}
    };

const userers = [
    {name: 'ryan'},
    {name: 'tom'}
]
class Users extends React.Component{


    componentDidMount() {

        axiosCall.get('https://jaydoc-cb1af.firebaseio.com/users.json')
            .then(res => {
                console.log("success: " + res.data);
                users =  res.data;
            })
            .catch(error => {
                alert(error);
            });
    }

    render() {
        let list = <h2>Hi</h2>;

        if(users !== null){
            Object.keys(users).map(user => {
                return(
                    <h1 key={user}>:) {users[user]}</h1>
                )
            });
            list = (
                <div>
                    {userers.map(user =>{
                        console.log(user);
                        return (

                            <h1> hi</h1>
                        )
                        // return(
                        // <p>
                        //     {user.name}
                        // </p>
                        // );
                    })}
                </div>
            );
        }
        return list;
    }
}

export default Users;
