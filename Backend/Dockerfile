FROM python:3.9.13
WORKDIR /var/jenkins_home/workspace/deploy/Backend
COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt 
COPY . .
CMD ["python", "manage.py", "runserver", "0.0.0.0:8080"]

EXPOSE 8080