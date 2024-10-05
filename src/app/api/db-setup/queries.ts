export const queries = [
    `CREATE TABLE IF NOT EXISTS users (
        user_id INT AUTO_INCREMENT PRIMARY KEY,
        username VARCHAR(50) NOT NULL UNIQUE,
        image_url VARCHAR(1000),
        email VARCHAR(100) NOT NULL UNIQUE,
        password_hash VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`,

    `CREATE TABLE IF NOT EXISTS characters (
        id INT AUTO_INCREMENT PRIMARY KEY,
        handle VARCHAR(255),
        image_url VARCHAR(1000),
        name VARCHAR(255) NOT NULL, -- Name should be unique for better identification,
        manga_title VARCHAR(255), -- Title of the manga the character belongs to
        bio TEXT, -- Optional bio or description of the character
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
    );`,
    
    `CREATE TABLE IF NOT EXISTS chats (
        chat_id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT NOT NULL,
        character_id INT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE,
        FOREIGN KEY (character_id) REFERENCES characters(id) ON DELETE CASCADE -- Corrected this foreign key
    );`,
    
    `CREATE TABLE IF NOT EXISTS messages (
        message_id INT AUTO_INCREMENT PRIMARY KEY,
        chat_id INT NOT NULL,
        sender ENUM('user', 'character') NOT NULL, -- Added ENUM to distinguish between user and character
        message_text TEXT NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (chat_id) REFERENCES chats(chat_id) ON DELETE CASCADE
    );`,
    
    `CREATE TABLE IF NOT EXISTS attachments (
        attachment_id INT AUTO_INCREMENT PRIMARY KEY,
        message_id INT NOT NULL,
        file_url VARCHAR(255) NOT NULL,
        file_type VARCHAR(50), -- Optional field for the type of file (e.g., image, video)
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (message_id) REFERENCES messages(message_id) ON DELETE CASCADE
    );`
];
