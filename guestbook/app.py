from flask import Flask, render_template, request, redirect, url_for, session, flash

import os
import libsql
import time

app = Flask(__name__)
app.secret_key = os.environ["FLASK_SECRET_KEY"]



@app.route("/counter")
def counter():

    connection = libsql.connect(
        database=os.environ["TURSO_DATABASE_URL"],
        auth_token=os.environ["TURSO_AUTH_TOKEN"]
        )

    cursor = connection.cursor()

    cursor.execute("""
        UPDATE VisitorCounter
        SET Visit_count = Visit_Count+1
        WHERE Counter_ID = 1
    """)

    connection.commit()

    cursor.execute("""
        SELECT Visit_Count
        FROM VisitorCounter
        WHERE Counter_ID = 1
    """)

    count = cursor.fetchone()[0]

    connection.close()
    
    return str(count)


@app.route("/guestbook", methods=["GET", "POST"])
def guestbook():

    connection = libsql.connect(
        database=os.environ["TURSO_DATABASE_URL"],
        auth_token=os.environ["TURSO_AUTH_TOKEN"]
    )
    cursor = connection.cursor()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS GuestBook
        (
            Comment_ID INTEGER PRIMARY KEY AUTOINCREMENT,
            Name TEXT NOT NULL,
            Comment TEXT NOT NULL,
            Created_Date DATETIME DEFAULT CURRENT_TIMESTAMP
        )
    """)

    connection.commit()

    cursor.execute("""
        CREATE TABLE IF NOT EXISTS VisitorCounter
        (
            Counter_ID INTEGER PRIMARY KEY,
            Visit_Count INTEGER NOT NULL
        )
    """)

    connection.commit()

    cursor.execute("""
    INSERT OR IGNORE INTO VisitorCounter
    (
        Counter_ID,
        Visit_Count
    )
    VALUES
    (
        1,
            0
        )
    """)





    if request.method == "POST":
        name = request.form["name"].strip()
        comment = request.form["comment"].strip()

        if len(name) == 0 or len(comment) == 0:
            flash("Name and comment are both required.")
            return redirect(url_for("guestbook"))
        if len(name) > 50 or len(comment) > 500:
            flash("Name or Comment is too long.")
            return redirect(url_for("guestbook"))

        last_post = session.get("last_post_time", 0)
        current_time = time.time()

        if current_time - last_post < 10:
            flash("Please wait 10 seconds before posting again.")
            return redirect(url_for("guestbook"))

        cursor.execute("""
        INSERT INTO GuestBook
        (
            Name,
            Comment
        )
         VALUES
         (
            ?,
            ?
        )
         """,(name, comment))

        connection.commit()

        session["last_post_time"] = current_time

        connection.close()

        flash("Comment Posted.")

        return redirect(url_for("guestbook"))

    cursor.execute("""
        SELECT Name, Comment, Created_Date
        FROM GuestBook
        ORDER BY Created_Date DESC
    """)

    entries = cursor.fetchall()

    connection.close()

    return render_template(
        "guestbook.html",
        entries=entries
    )

if __name__ == "__main__":
    app.run()