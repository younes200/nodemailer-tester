# Simple mailer service using nodemailer and distribute app in a container

## To run

With docker installed :

```bash

 docker container run --rm --name nodemailer-tester  \
    -e NODEMAILER_PORT=<port_number> \
    -e NODEMAILER_HOST=<mail_server_port>  \
    -e NODEMAILER_USER=<mail_server_user_name> \
    -e NODEMAILER_PASS=<mail_server_user_password> \
    -e PORT=3000
    ghcr.io/younes200/nodemailer-tester

```

If everything works well we should see

```bash
nodemailer-tester  | Service started on port 3000
```

## To test

Using `curl` perform `POST /sendmail` request with body

```bash
  curl --location --request POST 'http://localhost:3000/sendmail' \
  --header 'Content-Type: application/json' \
  --data-raw '{
    "fromName": "MAIL FOO",
    "fromEmail": "<sender>@<domain>.com",
    "to": "<receiver>@<domain>.com",
    "subject": "Hello to my friends from nodejs and expressjs",
    "text": "This is text body",
    "html": "<b>This is html body</b>"
  }'
```

should receive next 200 status response with body

```json
{
  "message": "Mail sent"
}
```

In console (where your container output is displayed) we should see

```bash
nodemailer-tester  | Message sent: <<ID>@<domain>>
```

Email should be received in the mail set in "to" field in POST request
