VERSION 0.8


docs.build:
  FROM registry.jetbrains.team/p/writerside/builder/writerside-builder:242.21870
  COPY docs docs
  ENV DISPLAY :99
  RUN Xvfb :99 & /opt/builder/bin/idea.sh helpbuilderinspect -source-dir=docs -product docs/typed-fastify -output-dir artifacts
  SAVE ARTIFACT artifacts AS LOCAL artifacts

docs.test:
  FROM openjdk:18-jdk-slim
  RUN apt-get update && apt-get install -y curl
  RUN curl -o wrs-doc-app.jar -L https://packages.jetbrains.team/maven/p/writerside/maven/com/jetbrains/writerside/writerside-ci-checker/1.0/writerside-ci-checker-1.0.jar

  COPY +docs.build/artifacts artifacts

  RUN java -jar wrs-doc-app.jar artifacts/report.json docs/typed-fastify
