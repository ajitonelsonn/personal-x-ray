-- database_setup.sql

-- Create the database
CREATE DATABASE IF NOT EXISTS xray_portal;
USE xray_portal;

-- Create users table
CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) NOT NULL UNIQUE,
    email VARCHAR(100) NOT NULL UNIQUE,
    password VARCHAR(255) NOT NULL,  -- Store hashed passwords
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
    last_login TIMESTAMP NULL,
    is_active BOOLEAN DEFAULT TRUE
);

-- Create OTP table
CREATE TABLE IF NOT EXISTS otp_codes (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    email VARCHAR(100) NOT NULL,
    otp_code VARCHAR(6) NOT NULL,
    purpose ENUM('REGISTRATION', 'PASSWORD_RESET', 'LOGIN') NOT NULL,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    expires_at TIMESTAMP NOT NULL,
    is_used BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE CASCADE,
    INDEX idx_email (email),
    INDEX idx_otp_code (otp_code)
);

-- Create authentication logs table (optional but useful for security)
CREATE TABLE IF NOT EXISTS auth_logs (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT,
    action ENUM('LOGIN', 'LOGOUT', 'OTP_REQUEST', 'OTP_VERIFY', 'PASSWORD_RESET') NOT NULL,
    status ENUM('SUCCESS', 'FAILURE') NOT NULL,
    ip_address VARCHAR(45),  -- Support for IPv6 addresses
    user_agent TEXT,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
);

-- Add indexes for better performance
CREATE INDEX idx_user_email ON users(email);
CREATE INDEX idx_user_username ON users(username);
CREATE INDEX idx_otp_expires ON otp_codes(expires_at);

-- Insert a test user (password: Test@123)
-- Note: In production, always hash passwords. This is just for testing.
INSERT INTO users (username, email, password) VALUES 
('testuser', 'test@example.com', '$2b$10$xPJ5sYqK8Y9cQVh5iJ7eZO8HE0EHl8JUf6y6VfD9H9AdxYh4yYQiK');