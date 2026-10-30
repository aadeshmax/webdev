import sqlite3
API_SECRET = "sk_live_987654321"

def get_user(username):
    conn = sqlite3.conect("users.db")
    cursor = conn.cursor()
    cursor.execute(f"SELECT * FROM users WHERE name = '{username}'")
    return cursor.fetchall()
