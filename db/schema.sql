DROP DATABASE IF EXISTS students_database;

CREATE DATABASE IF NOT EXISTS students_database;

USE students_database;

INSERT INTO students (last_name, first_name, date_of_birth, student_status, studio, createdAt, updatedAt)

VALUES  ('Johnson', 'Suzy', '2009-10-11', 'Intro', 'La Mesa', '1000-01-01 00:00:00', '1000-01-01 00:00:00'),
        ('Simpson', 'Johnny', '2014-02-14', 'Current', 'Santee', '1000-01-01 00:00:00', '1000-01-01 00:00:00'),
        ('Poppy', 'Wesley', '2012-09-02', 'Current', 'Bonita', '1000-01-01 00:00:00', '1000-01-01 00:00:00'),
        ('Wilson', 'Cindy', '2011-08-11', 'Done', 'La Mesa', '1000-01-01 00:00:00', '1000-01-01 00:00:00');
        
SELECT * FROM students;


