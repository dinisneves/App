#Use the official Python base image for WIndows
FROM python:3.10.4

#Set the working directory inside the container
WORKDIR \home\ubuntu\Desktop

#Copy the requirements.txt file to the container
COPY dependencies.txt .

#Install the Python dependencies
RUN pip install --no-cache-dir -r dependencies.txt

#Copy the rest of the application code to the container
COPY . .

#Set the entry point command to run the web ceawler script
CMD [ "python","main.py" ]
