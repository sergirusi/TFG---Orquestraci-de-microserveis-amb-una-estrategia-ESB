FROM andreptb/oracle-java:7

RUN cd ~ && wget https://repository-master.mulesoft.org/nexus/content/repositories/releases/org/mule/distributions/mule-standalone/3.6.1/mule-standalone-3.6.1.tar.gz

RUN cd /opt && tar xvzf ~/mule-standalone-3.6.1.tar.gz && rm ~/mule-standalone-3.6.1.tar.gz && ln -s /opt/mule-standalone-3.6.1 /opt/mule

# Define environment variables.
ENV MULE_HOME /opt/mule

#Define proxy environment variables
ENV http_proxy http://10.110.8.42:8080
ENV https_proxy http://10.110.8.42:8080

# Define mount points.
VOLUME ["/opt/mule/logs", "/opt/mule/conf", "/opt/mule/apps", "/opt/mule/domains"]

# Define working directory.
WORKDIR /opt/mule

CMD [ "/opt/mule/bin/mule" ]

# Default http port
EXPOSE 8081