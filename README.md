# Simple mailer service using nodemailer and distribute app in a container

## To run

Docker with docker-compose installed

```bash

 docker container run --rm --name nodemailer-tester  \
    -e NODEMAILER_PORT=<port_number> \
    -e NODEMAILER_HOST=<mail_server_port>  \
    -e NODEMAILER_USER=<mail_server_user_name> \
    -e NODEMAILER_PASS=<mail_server_user_password> \
    ghcr.io/younes200/nodemailer-tester

```

NOTE if port_number is different than 3000 then should modify Dockerfile to match with the new value



if everything works well we should see

```bash
nodemailer-tester  | Service started on port 3000
```

## To test

Using REST CLIENT
perform POST request with body

```json
{
  "fromName": "MAIL FOO",
  "fromEmail": "<sender>@<domain>.com",
  "to": "<receiver>@<domain>.com",
  "subject": "Hello to my friends from nodejs and expressjs",
  "text": "This is text body",
  "html": "<b>This is html body</b>"
}
```

should receive next 200 status response with body

```json
{
  "message": "Mail sended"
}
```

In console (where your container output is displayed) we should see

```bash
nodemailer-tester  | Message sent: <<ID>@<domain>>
```

Email should be received in the mail set in "to" field in POST request
