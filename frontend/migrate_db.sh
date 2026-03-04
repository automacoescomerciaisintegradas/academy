#!/bin/bash
cd /root/academy/frontend
npm uninstall firebase
npm install @supabase/supabase-js
rm -rf src/lib/firebase
