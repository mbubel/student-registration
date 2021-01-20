USE students_database;

INSERT INTO studios (studio_name, phone_number, email_address)
VALUES  ('La Mesa', '619-857-1270', 'lamesa@artwithlarisse.com'),
        ('Santee', '619-855-2787', 'santee@artwithlarisse.com'),
        ('Bonita', '619-508-1299', 'bonita@artwithlarisse.com');

INSERT INTO students (last_name, first_name, date_of_birth, student_status, createdAt, updatedAt, studio_id)
VALUES  ('Johnson', 'Suzy', '2009-10-11', 'Intro', '1000-01-01 00:00:00', '1000-01-01 00:00:00', 1),
        ('Simpson', 'Johnny', '2014-02-14', 'Current', '1000-01-01 00:00:00', '1000-01-01 00:00:00', 2),
        ('Poppy', 'Wesley', '2012-09-02', 'Current', '1000-01-01 00:00:00', '1000-01-01 00:00:00', 3),
        ('Wilson', 'Cindy', '2011-08-11', 'Done', '1000-01-01 00:00:00', '1000-01-01 00:00:00', 1);
