import requests
import psycopg2

# Replace the placeholders with your actual database connection details
connection = psycopg2.connect(
    host="172.17.0.1",
    port=5432,
    database="tpdb",
    user="postgres",
    password="123"
)

# Make a GET request to retrieve movie data from the API
response = requests.get("https://the-one-api.dev/v2/movie", headers={"Authorization": "Bearer qxdqyRuBKfeifCyAd7Ir"})



if response.status_code == 200:
    data = response.json()["docs"]

    # Iterate over the retrieved movies and insert them into the database
    for movie in data:
        movieId = movie["_id"];
        title = movie["name"]
        runtimeMinutes = movie["runtimeInMinutes"]
        budgetM = movie["budgetInMillions"]
        boxOfficeM = movie["boxOfficeRevenueInMillions"]
        awardNominations = movie["academyAwardNominations"]
        awardWins = movie["academyAwardWins"]
        rtScore = movie["rottenTomatoesScore"]

        # Create a cursor and execute an SQL INSERT statement
        cursor = connection.cursor()
        cursor.execute(
            "INSERT INTO movies (movieId, title, runtimeMinutes, budgetM, boxOfficeM, awardNominations, awardWins, rtScore) "
            "VALUES (%s, %s, %s, %s, %s, %s, %s, %s)",
            (movieId, title, runtimeMinutes, budgetM, boxOfficeM, awardNominations, awardWins, rtScore)
        )

    # Commit the changes and close the cursor
    connection.commit()
    cursor.close()
else:
    print("Error: Failed to fetch data from the API.")

"""

# Create a cursor object to interact with the database
cursor = connection.cursor()

# Table name to fetch data from
table_name = "movies"

# Fetch data from the table
query = f"SELECT * FROM {table_name}"
cursor.execute(query)
rows = cursor.fetchall()

# Display the fetched data
for row in rows:
    print(row)

# Close the cursor and connection
cursor.close()
connection.close()"""