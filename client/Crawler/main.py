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

# Function to fetch and insert data into the database
def insert_data(url, table_name, columns):
    response = requests.get(url, headers={"Authorization": "Bearer qxdqyRuBKfeifCyAd7Ir"})

    if response.status_code == 200:
        data = response.json()["docs"]

        # Iterate over the retrieved data and insert them into the database
        for item in data:
            values = []
            for column in columns:
                values.append(item[column])

            # Create a cursor and execute an SQL INSERT statement
            cursor = connection.cursor()
            cursor.execute(
                f"INSERT INTO {table_name} ({', '.join(columns)}) VALUES ({', '.join(['%s'] * len(columns))})",
                values
            )

        # Commit the changes and close the cursor
        connection.commit()
        cursor.close()
    else:
        print(f"Error: Failed to fetch data from {url}")


# Insert movies data into the database
insert_data(
    "https://the-one-api.dev/v2/movie",
    "movies",
    ["_id", "name", "runtimeInMinutes", "budgetInMillions", "boxOfficeRevenueInMillions", "academyAwardNominations",
     "academyAwardWins", "rottenTomatoesScore"]
)

# Insert characters data into the database
insert_data(
    "https://the-one-api.dev/v2/character",
    "characters",
    ["_id", "name"]
)

# Insert quotes data into the database
insert_data(
    "https://the-one-api.dev/v2/quote",
    "quotes",
    ["_id", "dialog"]
)

# Fetch and display the movies data
cursor = connection.cursor()
table_name = "movies"
query = f"SELECT * FROM {table_name}"
cursor.execute(query)
rows = cursor.fetchall()

print(f"--- {table_name} ---")
for row in rows:
    print(row)

# Fetch and display the characters data
table_name = "characters"
query = f"SELECT * FROM {table_name}"
cursor.execute(query)
rows = cursor.fetchall()

print(f"\n--- {table_name} ---")
for row in rows:
    print(row)

# Fetch and display the quotes data
table_name = "quotes"
query = f"SELECT * FROM {table_name}"
cursor.execute(query)
rows = cursor.fetchall()

print(f"\n--- {table_name} ---")
for row in rows:
    print(row)

# Close the cursor and connection
cursor.close()
connection.close()
 