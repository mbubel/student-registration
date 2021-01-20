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
        
INSERT INTO availableclasses (day_of_week, start_time, end_time, teacher, createdAt, updatedAt, studio_id)
VALUES  ('Monday', '2:00PM', '3:30PM', 'Ms. Skye Jollie','1000-01-01 00:00:00', '1000-01-01 00:00:00',1),
		('Tuesday', '9:00AM', '10:30AM', 'Mr. Kyle McIntosh','1000-01-01 00:00:00', '1000-01-01 00:00:00',2),
		('Wednesday', '3:30PM', '5:00PM', 'Ms. Aubrey Sawicki','1000-01-01 00:00:00', '1000-01-01 00:00:00',3),
		('Thursday', '6:00PM', '7:30PM', 'Ms. Skye Jollie','1000-01-01 00:00:00', '1000-01-01 00:00:00',1),
		('Friday', '3:00PM', '4:30PM', 'Mr. Kyle McIntosh','1000-01-01 00:00:00', '1000-01-01 00:00:00',2),
		('Saturday', '10:00AM', '11:30AM', 'Ms. Aubrey Sawicki','1000-01-01 00:00:00', '1000-01-01 00:00:00',3);
