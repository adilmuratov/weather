create TABLE users (
    id SERIAL PRIMARY KEY,
    user_login VARCHAR(255),
    user_email VARCHAR(255),
    user_password VARCHAR(255)
);

create TABLE user_history (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    action TEXT,
    timestamp TIMESTAMP DEFAULT NOW() 
);

create TABLE tokens (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    token TEXT
)