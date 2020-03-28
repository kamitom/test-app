# Initial a webapp scalfold

> initial a "webapp" draft is here.
> what I use: 
> * dockerfile
> * serve / http-server

# How to Use

## build image

run `docker build -t test-app:0.1 .`

## use image

run `docker run -d --name testapp1 -p 8087:8088 test-app:0.1`
