const argv = require('./config/yargs').argv;

let sCommand = argv._[0];

let oTaskFunctions = require('./services/createTask');

switch (sCommand) {
    case "crear-tarea":
        let oTask = oTaskFunctions.fnCreateTask(argv.descripcion);
        console.log(oTask);
        break;
    case "listar-tarea":
        oTaskFunctions.fnGetTasks().then((data) => {
            let aData = JSON.parse(data);
            for (let oTask of aData) {

                console.log(oTask);
            }
        });
        break;
    case "modificar-tarea":
        console.log("Modificar Tarea");
        let bModified = oTaskFunctions.fnModifyTask(argv.descripcion, argv.completado)
        console.log(bModified);
        break;
    case "delete-task":
        console.log("Borrar Tarea");
        let bBorrado = oTaskFunctions.deleteTask(argv.descripcion);
        console.log(bBorrado);
        break;
    default:
        console.log("Unrecognized Command");
        break;
}
