from flask import Flask, render_template, request, redirect, url_for, session, flash
import sqlite3
import os
import time

app = Flask(__name__)
app.secret_key = "bork"

@app.route("/guestbook", methods=["GET", "POST"])



def guestbook():

    connection = sqlite3.connect("guestbook.db")
    cursor = connection.cursor()

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