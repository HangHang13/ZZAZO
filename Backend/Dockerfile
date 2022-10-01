FROM python:3.9.13
# 컨테이너 내에서 코드가 실행될 경로 설정
# ENV PYTHONUNBUFFERED 1

WORKDIR /Backend

# requirements.txt에 명시된 필요한 packages 설치
COPY requirements.txt ./
RUN pip install --upgrade pip
RUN pip install -r requirements.txt
# Project를 /usr/src/app으로 복사
COPY . .
# 포트 설정
EXPOSE 8000
# gunicorn 실행
<<<<<<< HEAD
CMD ["gunicorn", "--bind", "0.0.0.0:8000", "Backend.ZAZZO.wsgi"]
=======
# RUN python manage.py runserver
# CMD ["python","manage.py","runserver","0.0.0.0:8000"]
CMD ["gunicorn","ZAZZO.wsgi:application","--bind","0.0.0.0:8000"]
>>>>>>> dc5d78fff35bdcaef975d942b3f3af6c9c479159
# CMD ["gunicorn", "--bind", "0.0.0.0:8000", "project_name.wsgi:application"]