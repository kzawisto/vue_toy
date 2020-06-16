FROM python:3.5
ENV PYTHONUNBUFFERED 1
RUN apt-get install g++ make libssl-dev libffi-dev 
RUN apt-get install libpq-dev
RUN mkdir -p /tmp
RUN mkdir -p /var/www
ADD requirements.txt /tmp/
RUN pip install -r /tmp/requirements.txt
RUN mkdir /workdir;
WORKDIR /workdir
