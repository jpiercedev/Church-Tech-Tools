import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://nuxvxsgjyblwmwosacta.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im51eHZ4c2dqeWJsd213b3NhY3RhIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MjAzOTcsImV4cCI6MjAzOTM5NjM5N30.pFfjs8bR2AU9T1lrJ0rhen4J343x_ColIhZTKo-boqs';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);