USE employees_db;

INSERT INTO departments (department_name)
VALUES  ('Design'),
        ('Development'),
        ('Production'),
        ('Release and Management'),
        ('Content');

INSERT INTO employee_roles(title,salary, department_id)
VALUES  ('Manager', 120000.00, 1),
        ('Lead', 100000.00, 3),
        ('worker', 80000.00, 2),
        ('Intern', 60000.00, 4),
        ('Owner', 200000.00, 5);

INSERT INTO employee(first_name,last_name, role_id, manager_id)
VALUES  ('Bob','Ross', 4, 1,1),
        ('Bill','Gates', 5, NULL),
        ('Ken','kutaragi', 2, 1),
        ('Satya', 'Nadella', 3, 2),
        ('Phil','Spencor', 2, 1),
        ('Jen','Taylor', 1, 2);