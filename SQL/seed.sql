-- Departments
INSERT INTO department (name) VALUES ("Accounting");
INSERT INTO department (name) VALUES ("IT");
INSERT INTO department (name) VALUES ("Administrative");
INSERT INTO department (name) VALUES ("HR");

-- Roles
INSERT INTO role (title, salary, department_id) VALUES ("Accounting Manager", 80000, (select deptid from department where name = "Accounting"));
INSERT INTO role (title, salary, department_id) VALUES ("Accounts Payable Rep", 60000, (select deptid from department where name = "Accounting"));
INSERT INTO role (title, salary, department_id) VALUES ("Accounts Receivable Rep", 60000, (select deptid from department where name = "Accounting"));

INSERT INTO role (title, salary, department_id) VALUES ("IT Manager", 120000, (select deptid from department where name = "IT"));
INSERT INTO role (title, salary, department_id) VALUES ("Developer", 80000, (select deptid from department where name = "IT"));
INSERT INTO role (title, salary, department_id) VALUES ("Engineer", 100000, (select deptid from department where name = "IT"));
INSERT INTO role (title, salary, department_id) VALUES ("Jr Developer", 60000, (select deptid from department where name = "IT"));

INSERT INTO role (title, salary, department_id) VALUES ("Office Manager", 80000, (select deptid from department where name = "Administrative"));
INSERT INTO role (title, salary, department_id) VALUES ("Executive Assistant", 60000, (select deptid from department where name = "Administrative"));
INSERT INTO role (title, salary, department_id) VALUES ("Receptionist", 40000, (select deptid from department where name = "Administrative"));

INSERT INTO role (title, salary, department_id) VALUES ("HR Manager", 90000, (select deptid from department where name = "HR"));
INSERT INTO role (title, salary, department_id) VALUES ("HR Analyst", 70000, (select deptid from department where name = "HR"));
INSERT INTO role (title, salary, department_id) VALUES ("HR Assistant", 50000, (select deptid from department where name = "HR"));

-- Managers
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Bradley","Donovan",(select roleid from role where title = "Accounting Manager"),NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Rachel","Morton",(select roleid from role where title = "IT Manager"),NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Zakiyyah","Sapp",(select roleid from role where title = "Office Manager"),NULL);
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Zara","Hurston",(select roleid from role where title = "HR Manager"),NULL);

-- Employees
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Alan","Walker",(select roleid from role where title = "Accounts Receivable Rep"),(select roleid from role where title = "Accounting Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Rivkah","Chauvin",(select roleid from role where title = "Accounts Payable Rep"),(select roleid from role where title = "Accounting Manager"));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Lydia","Nelson",(select roleid from role where title = "Developer"),(select roleid from role where title = "IT Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Benny","Richards",(select roleid from role where title = "Developer"),(select roleid from role where title = "IT Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Amin","Ibram",(select roleid from role where title = "Engineer"),(select roleid from role where title = "IT Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Donna","LaVelle",(select roleid from role where title = "Engineer"),(select roleid from role where title = "IT Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Anya","Lorenzo",(select roleid from role where title = "Jr Developer"),(select roleid from role where title = "IT Manager"));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Pete","DuBrow",(select roleid from role where title = "Executive Assistant"),(select roleid from role where title = "Office Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Megan","Davies",(select roleid from role where title = "Receptionist"),(select roleid from role where title = "Office Manager"));

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Zach","Garcia",(select roleid from role where title = "HR Analyst"),(select roleid from role where title = "HR Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Reid","Peters",(select roleid from role where title = "HR Assistant"),(select roleid from role where title = "HR Manager"));
INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Melissa","Watowski",(select roleid from role where title = "HR Assistant"),(select roleid from role where title = "HR Manager"));





