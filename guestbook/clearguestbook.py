import sqlite3

connection = sqlite3.connect("guestbook.db")
cursor = connection.cursor()

cursor.execute("""
    DELETE FROM GuestBook
""")

connection.commit()
connection.close()

print("Guestbook cleared.")