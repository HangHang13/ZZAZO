FROM python:3.9.13
WORKDIR /var/jenkins_home/workspace/deploy/Backend
# WORKDIR /var/jenkins_home/workspace/deploy/Backend
COPY requirements.txt ./

RUN pip install --upgrade pip
RUN pip install -r requirements.txt 
COPY . .
CMD ["gunicorn", "ZZAZO.wsgi", "--bind", "0.0.0.0:8000"]

EXPOSE 8000