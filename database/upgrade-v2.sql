-- Run this ONLY if you already created the database with the old schema.
-- Fresh installs just run schema.sql (it already includes everything).
USE school_db;

CREATE TABLE IF NOT EXISTS settings (
  k VARCHAR(60) PRIMARY KEY,
  v LONGTEXT NOT NULL
);

CREATE TABLE IF NOT EXISTS teachers (
  id INT AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR(120) NOT NULL,
  subject VARCHAR(80),
  grade VARCHAR(40),
  photo VARCHAR(500)
);
