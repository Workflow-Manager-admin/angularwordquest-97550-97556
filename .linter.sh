#!/bin/bash
cd /home/kavia/workspace/code-generation/angularwordquest-97550-97556/angular_word_quest
npm run build
EXIT_CODE=$?
if [ $EXIT_CODE -ne 0 ]; then
   exit 1
fi

