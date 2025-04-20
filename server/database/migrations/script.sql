-- ========================
-- CSDL cho game multtiplayer
-- ========================

-- Bảng users (người dùng)
CREATE TABLE users (
    id INT PRIMARY KEY AUTO_INCREMENT,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    email VARCHAR(100) UNIQUE NOT NULL,
    role ENUM('user', 'admin') DEFAULT 'user',
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Bảng bộ câu hỏi (question sets)
CREATE TABLE question_sets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_by INT, -- Người tạo bộ câu hỏi
    FOREIGN KEY (created_by) REFERENCES users(id)
);

-- Bảng câu hỏi
CREATE TABLE questions (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_set_id INT,
    content TEXT NOT NULL,
    image_url VARCHAR(255),
    type ENUM('choice', 'text') DEFAULT 'choice', -- Loại câu hỏi (trắc nghiệm hoặc tự luận)
    time_limit INT DEFAULT 30, -- Thời gian trả lời câu hỏi
    difficulty ENUM('easy', 'medium', 'hard') DEFAULT 'easy',
    FOREIGN KEY (question_set_id) REFERENCES question_sets(id)
);

-- Bảng phương án trả lời
CREATE TABLE answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT,
    content TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(id)
);

-- Bảng phòng chơi
CREATE TABLE rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pin VARCHAR(6) UNIQUE NOT NULL,
    question_set_id INT NOT NULL, -- Bộ câu hỏi
    host_id INT NOT NULL, -- Chủ phòng
    status ENUM('waiting', 'active', 'finished') DEFAULT 'waiting',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ended_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (host_id) REFERENCES users(id),
    FOREIGN KEY (question_set_id) REFERENCES question_sets(id)
);

-- Bảng người chơi trong phòng
CREATE TABLE players (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    nickname VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255),
    score INT DEFAULT 0,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
);

-- Bảng người chơi trả lời câu hỏi
CREATE TABLE player_answers (
    player_id INT,
    question_id INT,
    answer_id INT, -- ID của phương án trả lời (trắc nghiệm)
    answer_text TEXT, -- Nội dung câu trả lời (tự luận)
    is_correct BOOLEAN,
    response_time INT NOT NULL, -- Thời gian trả lời (ms)
    points INT DEFAULT 0,
    FOREIGN KEY (player_id) REFERENCES players(id),
    FOREIGN KEY (question_id) REFERENCES questions(id),
    FOREIGN KEY (answer_id) REFERENCES answers(id)
);