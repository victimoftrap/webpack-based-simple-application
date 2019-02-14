'use strict';

class OperationExecutor {
    constructor() {
        this.state = {
            0: this.firstTaskExecute.bind(this),
            1: this.secondTaskExecute.bind(this),
            2: this.thirdTaskExecute.bind(this),
            3: this.fourthTaskExecute.bind(this),
            4: this.fifthTaskExecute.bind(this),
            5: this.sixthTaskExecute.bind(this),
            6: this.seventhTaskExecute.bind(this),
            7: this.eighthTaskExecute.bind(this),
            8: this.ninthTaskExecute.bind(this),
            9: this.tenthTaskExecute.bind(this),
        };
    }

    /**
     * Execute some transformation of incoming arg
     * @param actionType – type of transformation
     * @param arg – incoming arg
     * @returns object with result
     */
    execute(actionType, arg) {
        return this.state[actionType](arg);
    }

    /**
     * First task of homework
     * @param arg – object with value that you should clone
     * arg = { obj1: { ... } }
     * @returns object that contains source object and his modified clone
     */
    firstTaskExecute(arg) {
        let clone = Object.assign({}, arg.obj1);
        clone.lastName = "Pryadko";
        return {arg, clone};
    }

    /**
     * Second task of homework
     * @param arg – object with values that you should combine
     * arg = { obj1: { ... }, obj2: { ... } }
     * @returns object that contains source objects and their combined and modified clone
     */
    secondTaskExecute(arg) {
        let third = {...arg.obj1, ...arg.obj2};
        third.b = 86;
        return {arg, third};
    }

    /**
     * Third task of homework
     * @param arg – object with value that you should modify
     * arg = { obj1: { ... } }
     * @returns object that contains modified source object
     */
    thirdTaskExecute(arg) {
        let clone = Object.assign({}, arg.obj1);
        clone.relatives.forEach(x => {
            x.gender = x.lastName.match(/[A-Z]([a-z]+)va/g) ? "female" : "male"
        });
        return {arg, clone};
    }

    /**
     * Fourth task of homework
     * @param arg – object with value that contains relatives
     * arg = { obj1: { ... relatives: [ ... ] ... } }
     * @returns object that contains array of string with female relatives
     */
    fourthTaskExecute(arg) {
        let greetings = [];
        arg.obj1.relatives.forEach(rel => {
            if (rel.gender === "female") {
                greetings.push(`Hello, ${rel.firstName}!`);
            }
        });
        return {greetings};
    }

    /**
     * Fifth task of homework
     * @param arg – object which contains new color of the button and the class of it
     * arg = { color: '...', className: '...' }
     * @returns string which contains the class of the button and current color
     */
    fifthTaskExecute(arg) {
        document.getElementsByClassName(arg.className)[0].style.backgroundColor = arg.color;
        return arg;
    }

    /**
     * Sixth task of homework
     * @param arg – object with values that you should handle
     * arg = { hostNames: [ ... ] }
     * @returns object that contains array of items that match the hostname on which the application is running
     */
    sixthTaskExecute(arg) {
        let url = location.hostname;
        let hostNames = [];

        arg.hostNames.forEach(domain => {
            if (url === domain) {
                hostNames.push(domain);
            }
        });
        return {hostNames};
    }

    /**
     * Seventh task of homework
     * @param arg – object which contains simple key-value pairs
     * arg = { key: value }
     * @returns obj that contains swap pairs ('value: key')
     */
    seventhTaskExecute(arg) {
        let swapped = {};
        for (let key in arg) {
            swapped[arg[key]] = key;
        }
        return swapped;
    }

    /**
     * Eighth task of homework
     * @param arg – object which contains two array
     * arg = { arr1: [ ... ], arr2: [ ... ] }
     * @returns obj that built using array's values
     */
    eighthTaskExecute(arg) {
        let arr = [...arg.arr1, ...arg.arr2];
        let res = {};
        if (arr.length % 2 !== 0) {
            arr.push(null);
        }
        for (let i = 0; i < arr.length / 2; i++) {
            res[arr[2 * i]] = arr[2 * i + 1];
        }
        return res;
    }

    /**
     * Ninth task of homework
     * @param arg – object which contains array of users
     * arg = { users: [ ... ] }
     * @returns obj that contains pairs id: obj with this id
     */
    ninthTaskExecute(arg) {
        let users = {};
        for (let i = 0; i < arg.users.length; i++) {
            users[arg.users[i].id] = arg.users[i];
        }
        return users;
    }

    /**
     * Tenth task of homework
     * @param arg – object which contains class of item and empty array
     * arg = { className: '...', childrenInfo: [ ... ] }
     * @returns obj that contains the array with info about children of the node
     */
    tenthTaskExecute(arg) {
        let children = document.getElementsByClassName(arg.className)[0].children;

        for (let i = 0; i < children.length; i++) {
            arg.childrenInfo.push({
                tagName: children[i].tagName,
                className: children[i].className
            });
        }
        return arg;
    }
}

export default OperationExecutor;
