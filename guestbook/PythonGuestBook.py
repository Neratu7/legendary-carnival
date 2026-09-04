import sqlite3

connection = sqlite3.connect("guestbook.db")

cursor = connection.cursor()

cursor.execute("""
SELECT
    Comment_ID,
    Name,
    Comment,
    Created_Date
FROM GuestBook;
""",)

rows=cursor.fetchall()

for row in rows:
    print(row)


connection.close()

