const options = {
    descripcion: {
        demand: true,
        alias: 'd'
    },
    completado: {
        demand: false,
        default: true,
        alias: "c"
    }
}
const argv = require('yargs')
    .command('crear-tarea', 'Ingrese una descripcion', options)
    .command('modificar-tarea', "ingrese una descripcion y si está completado si o no.", options)
    .command('delete-task', "Ingrese una descripcion para borrar", options)
    .help().argv;

module.exports = {
    argv
}