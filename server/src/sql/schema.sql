CREATE TABLE songs (
	id int NOT NULL PRIMARY KEY,
	song_title text NOT NULL,
	notes varchar NOT NULL,
	song_artist text NOT NULL
);

INSERT INTO songs (id, song_title, notes, song_artist) 
VALUES (1, 'Ode to Joy', 'E4 E4 F4 G4 G4 F4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'Christmas Joe');

INSERT INTO songs (id, song_title, notes, song_artist) 
VALUES (2, 'Hello', 'E4 E4 E4 G4 G4 G4 E4 D4 C4 C4 D4 E4 E4 D4 D4', 'Adele');

INSERT INTO songs (id, song_title, notes, song_artist) 
VALUES (3, 'Easy On Me', 'C4 E4 D4 G4 G4 G4 E4 D4 C4 C4 E4 E4 E4 D4 D4', 'Adele');

INSERT INTO songs (id, song_title, notes, song_artist) 
VALUES (4, 'Chunky', 'C4 E4 D4 G4 G4 G4 E4 D4 C4 C4 E4 E4 E4 D4 D4', 'Bruno Mars');

INSERT INTO songs (id, song_title, notes, song_artist) 
VALUES (5, 'Merry-Go-Round of Life', 'D4 G4 A#4 D5 D5 C5 A#4 A4 A#4 G4 A#4 D5 G5 G5 G5 F5 D#5 F5', 'Joe Hisaishi');