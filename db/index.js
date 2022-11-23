require("console.table");

class Gamer {

    constructor (connection) {
        this.connection = connection
    }

    async viewDept(){
        const query = "select * from department"
        const [rows, fields] = await this.connection.execute(query)
        console.table(rows)
    }

    async viewRoles(){
        const query = 'SELECT employee_role.id, employee_role.title, department.department_name, employee_role.salary FROM employee_role LEFT JOIN department ON employee_role.department_id = department.id;'
        const [rows, fields] = await this.connection.execute(query)
        console.table(rows)
       
    }

    async viewEmploy(){
        const query = "SELECT employee.id, employee.first_name, employee.last_name, department.department_name, employee_role.title, employee_role.salary, employee.manager_id FROM employee LEFT JOIN employee_role ON employee.role_id = employee_role.id LEFT JOIN department ON employee_role.department_id = department.id;"
        const [rows, fields] = await this.connection.execute(query)
        console.table(rows)
    }

    async addDept(department_name){
        const query = `INSERT INTO department (department_name) VALUES("${department_name}");`
        await this.connection.execute(query)
        
        
    }

    async addRole(title, salary, department_id){
        const query = `INSERT INTO employee_role (title, salary, department_id) VALUES ("${title}", ${salary}, ${department_id});`
        await this.connection.execute(query)
       
    }

    async addEmplpy(first_name, last_name, role_id, manager_id){
        const query = `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES('${first_name}', '${last_name}', ${role_id}, ${manager_id});`
        await this.connection.execute(query)
        
    }

    async updateRole(updateRole, employID){
        const query = `UPDATE employee SET role_id = ${updateRole} WHERE id = ${employID};`
        await this.connection.execute(query)
        console.log("role updated")
    }

    async getRoles(){
        const query = "select * from employee_role"
        const [rows, fields] = await this.connection.execute(query)
        const roleArray =rows.map(x => {
            return{
                name: x.title,
                value: x.id
            }
        })
        return roleArray
    }

    async getEmployees(){
        const query = "select * from employee"
        const [rows, fields] = await this.connection.execute(query)
        const empArray = rows.map(x => {
            return {
                name: x.first_name +" "+ x.last_name,
                value: x.id
            }
             });
             return empArray
    }

    async getDepartments(){
        const query = "select * from department"
        const [rows, fields] = await this.connection.execute(query)
        const deptArray = rows.map(x => {
            return {
                name: x.department_name,
                value: x.id
            }
             });
             return deptArray
    }

}

module.exports=Gamer 