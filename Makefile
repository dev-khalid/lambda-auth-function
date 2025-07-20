.PHONY: build-push

build-push:
	docker build -t lambda-auth-function .
	docker tag lambda-auth-function:latest 899098335740.dkr.ecr.ap-southeast-1.amazonaws.com/khalid:latest
	docker push 899098335740.dkr.ecr.ap-southeast-1.amazonaws.com/khalid:latest

update-lambda:
	aws --profile khalid-personal lambda update-function-code \
		--function-name authFunction \
		--image-uri 899098335740.dkr.ecr.ap-southeast-1.amazonaws.com/khalid:latest