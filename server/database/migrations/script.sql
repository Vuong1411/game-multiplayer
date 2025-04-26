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
)$$

-- Bảng bộ câu hỏi (question sets)
CREATE TABLE question_sets (
    id INT PRIMARY KEY AUTO_INCREMENT,
    title VARCHAR(100) NOT NULL,
    description TEXT,
    created_by INT, -- Người tạo bộ câu hỏi
    FOREIGN KEY (created_by) REFERENCES users(id)
)$$

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
)$$

-- Bảng phương án trả lời
CREATE TABLE answers (
    id INT PRIMARY KEY AUTO_INCREMENT,
    question_id INT,
    content TEXT NOT NULL,
    is_correct BOOLEAN DEFAULT FALSE,
    FOREIGN KEY (question_id) REFERENCES questions(id)
)$$

-- Bảng phòng chơi
CREATE TABLE rooms (
    id INT PRIMARY KEY AUTO_INCREMENT,
    pin VARCHAR(6) UNIQUE NOT NULL,
    question_set_id INT NOT NULL, -- Bộ câu hỏi
    host_id INT NOT NULL, -- Chủ phòng
    type ENUM('sync', 'async') DEFAULT 'async', -- Kiểu phòng (Đồng bộ hoặc không đồng bộ)
    status ENUM('waiting', 'active', 'finished') DEFAULT 'waiting',
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    ended_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (host_id) REFERENCES users(id),
    FOREIGN KEY (question_set_id) REFERENCES question_sets(id)
)$$

-- Bảng người chơi trong phòng
CREATE TABLE players (
    id INT PRIMARY KEY AUTO_INCREMENT,
    room_id INT,
    nickname VARCHAR(100) NOT NULL,
    avatar_url VARCHAR(255),
    score INT DEFAULT 0,
    joined_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (room_id) REFERENCES rooms(id)
)$$

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
)$$

DELIMITER ;

-- Thêm users mẫu
INSERT INTO users (username, password, email, role) VALUES
('admin', '12345', 'admin@example.com', 'admin'),
('user1', '12345', 'user1@example.com', 'user'),
('user2', '12345', 'user2@example.com', 'user')$$

-- Thêm bộ câu hỏi mẫu
INSERT INTO question_sets (title, description, created_by) VALUES
('Bộ câu hỏi Toán', 'Các câu hỏi toán học cơ bản', 1),
('Câu đố vui', 'Các câu đố vui nhộn', 1),
('Tiếng Anh', 'Từ vựng tiếng Anh cơ bản', 1)$$

-- Thêm câu hỏi mẫu
INSERT INTO questions (question_set_id, content, type, time_limit, difficulty) VALUES
-- Bộ câu hỏi Toán
(1, 'Bao nhiêu là 2 + 2?', 'choice', 30, 'easy'),
(1, 'Căn bậc hai của 16 là?', 'choice', 30, 'medium'),
(1, '8 x 7 = ?', 'choice', 30, 'easy'),

-- Câu đố vui
(2, 'Con gì đập thì sống, không đập thì chết?', 'choice', 45, 'medium'),
(2, 'Cái gì càng giảm càng lớn?', 'choice', 45, 'medium'),
(2, 'Có 1 bầy chim đậu trên 3 cành cây, hỏi mỗi cành có bao nhiêu con?', 'choice', 45, 'hard'),

-- Tiếng Anh
(3, 'What is "táo" in English?', 'choice', 30, 'easy'),
(3, 'Complete: "I _____ a student"', 'choice', 30, 'easy'),
(3, 'Which word means "happy"?', 'choice', 30, 'medium')$$

-- Thêm đáp án mẫu
INSERT INTO answers (question_id, content, is_correct) VALUES
-- Câu hỏi 1
(1, '3', FALSE),
(1, '4', TRUE),
(1, '5', FALSE),
(1, '6', FALSE),

-- Câu hỏi 2
(2, '2', FALSE),
(2, '4', TRUE),
(2, '6', FALSE),
(2, '8', FALSE),

-- Câu hỏi 3
(3, '54', FALSE),
(3, '56', TRUE),
(3, '58', FALSE),
(3, '60', FALSE),

-- Câu hỏi 4
(4, 'Con tim', TRUE),
(4, 'Con mèo', FALSE),
(4, 'Con chó', FALSE),
(4, 'Con cá', FALSE),

-- Câu hỏi 5
(5, 'Cái hố', TRUE),
(5, 'Cái cây', FALSE),
(5, 'Cái bàn', FALSE),
(5, 'Cái ghế', FALSE),

-- Câu hỏi 6
(6, '3-3-3', FALSE),
(6, 'Tùy vào chim bay', TRUE),
(6, '1-1-1', FALSE),
(6, '2-2-2', FALSE),

-- Câu hỏi 7
(7, 'Apple', TRUE),
(7, 'Orange', FALSE),
(7, 'Banana', FALSE),
(7, 'Mango', FALSE),

-- Câu hỏi 8
(8, 'am', TRUE),
(8, 'is', FALSE),
(8, 'are', FALSE),
(8, 'be', FALSE),

-- Câu hỏi 9
(9, 'Vui vẻ', FALSE),
(9, 'Happy', TRUE),
(9, 'Sad', FALSE),
(9, 'Angry', FALSE);
