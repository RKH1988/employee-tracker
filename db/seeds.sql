INSERT INTO department
    (name)
VALUES
    ('Administration'),
    ('Accounting & Finance'),
    ('Human Resources'),
    ('Legal'),
    ('Marketing'),
    ('Sales'),
    ('IT'),
    ('Facilities'),
    ('Customer Service');

INSERT INTO role
    (title, salary, department_id)
VALUES 
    ('CEO',10000000,1),
    ('COO',750000,1),
    ('Administrative Assistant',150000,1),
    ('CFO',700000,1),
    ('VP HR',500000,1),
    ('Chief Legal Officer',750000,1),
    ('VP Marketing',775000,1),
    ('VP Sales',700000,1),
    ('VP IT',700000,1),
    ('VP Facilities',500000,1),
    ('VP Customer Service',500000,1),
    ('HR Analyst',75000,3),
    ('Customer Service Rep',50000,9),
    ('Sales Rep',75000,6),
    ('Paralegal',85000,4)
    ('Developer',150000,7),
    ('IT Support Staff',60000,7),
    ('Facilities Rep',45000,8),
    ('Accountant',100000,2),
    ('Marketing Associate',80000,5),
    ('Temp',50000,8);

INSERT INTO employee
    (first_name, last_name, role_id, manager_id)
VALUES
    ('Mike','Manager',1,NULL),
    ('Corrine','Chambley',1,1),
    ('Adrian','Applegate',1,1),
    ('Abigail','Tracy',1,2),
    ('Charles','Smith',1,2),
    ('Hilda','Hendricks',1,2),
    ('Larry','Lynch',1,2),
    ('Marty','McFly',1,2),
    ('Solomon','Sampson',1,2),
    ('Isabel','Isaacson',1,2),
    ('Francine','Franks',1,2),
    ('Curt','Liotta',1,2),
    ('Herbert','Andrews',3,6),
    ('Andy','Cartwright',3,6),
    ('Samantha','Tangelo',3,6),
    ('Lisa','Andrews',9,12),
    ('Correy','Matthews',9,12),
    ('Abraham','Lincolnson',9,12),
    ('Mark','Tompkins',6,9),
    ('April','Apricot',6,9),
    ('Patricia','Jones',6,9),
    ('Yasmin','Sanchez',4,7),
    ('Eric','Foreman',4,7),
    ('Lionel','Richardson',4,7),
    ('RK','Harris',7,10),
    ('Damion','Drake',7,25),
    ('Porche','Carlton',7,25),
    ('Enrique','Iglesias',7,25),
    ('Israel','Hamilton',7,25),
    ('Francine','Arnold',8,11),
    ('Doug','Funny',8,11),
    ('Patty','Mayonnaise',8,11),
    ('Arielle','Arlington',2,5),
    ('Sam','Plantar',2,5),
    ('Michael','Jordan',2,5),
    ('Fred','McGriff',5,8),
    ('Jasmine','Ricardo',5,8),
    ('Gwen','Stefani',5,8),
    ('Tricia','Fuentes',8,11),
    ('Marshall','Whitman',8,11);