#!/bin/bash
cd /home/kavia/workspace/code-generation/proto-bot-web-interface-3695-3704/frontend_proto_bot
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

