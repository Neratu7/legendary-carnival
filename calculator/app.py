from flask import Flask, render_template, request
from calculator import calculate

app = Flask(__name__)

@app.route("/", methods=["GET","POST"])
def index():
    result = None

    if request.method == "POST":
        first_number = float(request.form["first_number"])
        second_number = float(request.form["second_number"])
        operation = request.form["operation"]

        result = calculate(first_number,second_number,operation)

    return render_template("index.html",result=result)

if __name__ == "__main__":
    app.run(debug=True)
