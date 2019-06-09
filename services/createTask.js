const fs = require("fs");

let aTodoTasks = [];

const fnSaveOnDatabase = () => {
    let data = JSON.stringify(aTodoTasks);
    fs.writeFile('./db/data.json', data, (e) => {
        if (e) throw new Error(e);
    });
};

const fnOpenDatabase = () => {
    try {
        aTodoTasks = require('../db/data.json');
    }
    catch (e) {
        aTodoTasks = [];
    }
};

const fnModifyTask = (sDescription, bComplete = true) => {
    fnOpenDatabase();
    let iIndex = aTodoTasks.findIndex((task) => {
        return task.sDescription === sDescription;
    })
    if (iIndex >= 0) {
        aTodoTasks[iIndex].completado = bComplete;
        // aTodoTasks[iIndex].sDescription = sDescription;
        fnSaveOnDatabase();
        return true;
    }
    else {
        return false
    }
}

const deleteTask = (sDescription) => {
    fnOpenDatabase();
    let iIndex = aTodoTasks.findIndex((task) => {
        return task.sDescription === sDescription;
    })
    if (iIndex >= 0) {
        aTodoTasks.splice(iIndex, 1);
        fnSaveOnDatabase();
        return true;
    }
    else {
        return false
    }

}

const getFile = () => {
    return new Promise((resolve, reject) => {
        fs.readFile('./db/data.json', 'utf-8', (err, data) => {
            if (err) throw new Error(err);
            resolve(data);
        })
    })
}

const fnGetTasks = async () => {
    let aFile = await getFile();
    return aFile;
}

const fnCreateTask = (sDescription) => {
    fnOpenDatabase();
    let oTask = {
        sDescription,
        completado: false
    };
    aTodoTasks.push(oTask);
    fnSaveOnDatabase();
    return oTask;
};

module.exports = {
    fnCreateTask,
    fnGetTasks,
    fnModifyTask,
    deleteTask
};